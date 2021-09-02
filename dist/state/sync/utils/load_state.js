import {getItem} from "../../../../snowpack/pkg/localforage.js";
import {LOCAL_STORAGE_STATE_KEY} from "../../../constants.js";
import {ACTIONS} from "../../actions.js";
import {parse_specialised_objects_from_server_data} from "../../specialised_objects/parse_server_data.js";
import {error_to_string} from "./errors.js";
import {load_solid_data} from "./solid_load_data.js";
import {ensure_any_knowledge_view_displayed} from "../../routing/utils/ensure_any_knowledge_view_displayed.js";
export function load_state(store) {
  let state = store.getState();
  const {dispatch} = store;
  const {storage_type} = state.sync;
  if (!storage_type) {
    console.log("Returning early from load_state.  No storage_type set");
    return;
  }
  dispatch(ACTIONS.sync.update_sync_status({status: "LOADING"}));
  const promise_data = get_state_data(storage_type, state);
  if (!promise_data) {
    dispatch(ACTIONS.sync.update_sync_status({status: "FAILED"}));
    return;
  }
  promise_data.then((specialised_objects) => {
    dispatch(ACTIONS.specialised_object.replace_all_specialised_objects({specialised_objects}));
    ensure_any_knowledge_view_displayed(store);
    dispatch(ACTIONS.sync.update_sync_status({status: "LOADED"}));
  }).catch((error) => {
    const error_message = error_to_string(error);
    console.error(error);
    dispatch(ACTIONS.sync.update_sync_status({status: "FAILED", error_message}));
  });
}
export function get_state_data(storage_type, state) {
  let promise_data;
  if (storage_type === "local_server") {
    promise_data = fetch("http://localhost:4000/api/v1/specialised_state/", {method: "get"}).then((resp) => resp.json());
  } else if (storage_type === "solid") {
    promise_data = load_solid_data(state);
  } else if (storage_type === "local_storage") {
    promise_data = getItem(LOCAL_STORAGE_STATE_KEY);
  } else {
    console.error(`Returning from load_state.  storage_type "${storage_type}" unsupported.`);
    return;
  }
  return promise_data.then((data) => parse_specialised_objects_from_server_data(data));
}
function parse_datetimes(items) {
  return items.map((i) => ({...i, datetime_created: new Date(i.datetime_created)}));
}
