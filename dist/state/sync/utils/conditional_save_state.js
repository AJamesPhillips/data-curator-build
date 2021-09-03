import {ACTIONS} from "../../actions.js";
import {needs_save} from "./needs_save.js";
import {last_attempted_state_to_save, storage_dependent_save} from "./save_state.js";
export function conditionally_save_state(load_state_from_storage, dispatch, state) {
  if (!load_state_from_storage)
    return;
  const {ready_for_writing, storage_type, status} = state.sync;
  if (!ready_for_writing)
    return;
  if (status === "FAILED")
    return;
  if (!needs_save(state, last_attempted_state_to_save.state))
    return;
  if (!storage_type) {
    const error_message = "Can not save.  No storage_type set";
    dispatch(ACTIONS.sync.update_sync_status({status: "FAILED", error_message, attempt: 0}));
    return;
  }
  storage_dependent_save(dispatch, state);
}
let allow_ctrl_s_to_flush_save = true;
export async function conditional_ctrl_s_save(load_state_from_storage, dispatch, state) {
  if (!load_state_from_storage)
    return;
  const ctrl_s_flush_save = is_ctrl_s_flush_save(state);
  if (ctrl_s_flush_save && allow_ctrl_s_to_flush_save) {
    allow_ctrl_s_to_flush_save = false;
    await storage_dependent_save(dispatch, state).flush();
    dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: void 0}));
  }
  allow_ctrl_s_to_flush_save = !ctrl_s_flush_save;
}
function is_ctrl_s_flush_save(state) {
  return state.global_keys.keys_down.has("s") && state.global_keys.keys_down.has("Control");
}
