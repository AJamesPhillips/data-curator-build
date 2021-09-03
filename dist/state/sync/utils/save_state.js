import {getDefaultSession} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {setItem} from "../../../../snowpack/pkg/localforage.js";
import {LOCAL_STORAGE_STATE_KEY} from "../../../constants.js";
import {min_throttle} from "../../../utils/throttle.js";
import {ACTIONS} from "../../actions.js";
import {error_to_string} from "./errors.js";
import {get_specialised_state_to_save} from "./needs_save.js";
import {save_solid_data} from "./solid_save_data.js";
export function storage_dependent_save(dispatch, state) {
  const {storage_type} = state.sync;
  if (storage_type !== "solid") {
    throttled_save_state.throttled({dispatch, state});
    throttled_save_state.flush();
  } else {
    const solid_session = getDefaultSession();
    if (!solid_session.info.isLoggedIn) {
      throttled_save_state.cancel();
      const error_message = "Can not save.  Not logged in";
      dispatch(ACTIONS.sync.update_sync_status({status: "FAILED", error_message, attempt: 0}));
      if (state.sync.next_save_ms !== void 0) {
        dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: void 0}));
      }
    } else {
      const next_call_at_ms = throttled_save_state.throttled({dispatch, state});
      if (state.sync.next_save_ms !== next_call_at_ms) {
        dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: next_call_at_ms}));
      }
    }
  }
  return throttled_save_state;
}
const SAVE_THROTTLE_MS = 6e4;
export const throttled_save_state = min_throttle(save_state, SAVE_THROTTLE_MS);
export const last_attempted_state_to_save = {state: void 0};
function save_state({dispatch, state}) {
  last_attempted_state_to_save.state = state;
  if (!state.sync.ready_for_writing) {
    console.error(`State machine violation.  Save state called whilst state.sync.status: "${state.sync.status}", ready_for_writing: ${state.sync.ready_for_writing}`);
    return Promise.reject();
  }
  dispatch(ACTIONS.sync.update_sync_status({status: "SAVING"}));
  dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: void 0}));
  const storage_type = state.sync.storage_type;
  const data = get_specialised_state_to_save(state);
  return retryable_save({storage_type, data, user_info: state.user_info, dispatch}).then(() => {
    dispatch(ACTIONS.sync.update_sync_status({status: "SAVED"}));
    return state;
  }).catch(() => last_attempted_state_to_save.state = void 0);
}
const MAX_ATTEMPTS = 5;
export function retryable_save(args) {
  const {
    storage_type,
    data,
    user_info,
    dispatch,
    max_attempts = MAX_ATTEMPTS,
    is_backup
  } = args;
  let {attempt = 0} = args;
  attempt += 1;
  const is_backup_str = is_backup ? " (backup)" : "";
  console.log(`retryable_save${is_backup_str} to "${storage_type}" with data.knowledge_views: ${data.knowledge_views.length}, data.wcomponents: ${data.wcomponents.length}, attempt: ${attempt}`);
  let promise_save_data;
  if (storage_type === "local_server") {
    const specialised_state_str = JSON.stringify(data);
    promise_save_data = fetch("http://localhost:4000/api/v1/specialised_state/", {
      method: "post",
      body: specialised_state_str
    });
  } else if (storage_type === "solid") {
    promise_save_data = save_solid_data(user_info, data);
  } else if (storage_type === "local_storage") {
    promise_save_data = setItem(LOCAL_STORAGE_STATE_KEY, data);
  } else {
    console.error(`Returning from save_state${is_backup_str}.  storage_type "${storage_type}" unsupported.`);
    return Promise.reject();
  }
  return promise_save_data.catch((error) => {
    let error_message = error_to_string(error);
    if (attempt >= max_attempts) {
      error_message = `Stopping after ${attempt} attempts at resaving${is_backup_str}: ${error_message}`;
      console.error(error_message);
      const action = is_backup ? ACTIONS.backup.update_backup_status({status: "FAILED"}) : ACTIONS.sync.update_sync_status({status: "FAILED", error_message, attempt: 0});
      dispatch(action);
      return Promise.reject();
    } else {
      error_message = `Retrying${is_backup_str} attempt ${attempt}; ${error_message}`;
      console.error(error_message);
      const action = is_backup ? ACTIONS.backup.update_backup_status({status: "FAILED"}) : ACTIONS.sync.update_sync_status({
        status: "FAILED",
        error_message,
        attempt
      });
      dispatch(action);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`retrying save${is_backup_str} to ${storage_type}, attempt ${attempt}`);
          retryable_save({storage_type, data, user_info, dispatch, max_attempts, attempt, is_backup}).then(resolve).catch(reject);
        }, 1e3);
      });
    }
  });
}
