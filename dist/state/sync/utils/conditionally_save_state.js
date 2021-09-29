import {ACTIONS} from "../../actions.js";
import {needs_save} from "./needs_save.js";
import {save_state} from "./save_state.js";
export async function conditionally_save_state(load_state_from_storage, store) {
  const should_save = calc_should_save(load_state_from_storage, store, true);
  if (!should_save)
    return Promise.resolve();
  await save_state(store);
}
let allow_ctrl_s_to_flush_save = true;
export async function conditional_ctrl_s_save(load_state_from_storage, store) {
  const should_save = calc_should_save(load_state_from_storage, store, false);
  if (!should_save)
    return;
  const ctrl_s_flush_save = is_ctrl_s_flush_save(store.getState());
  if (ctrl_s_flush_save && allow_ctrl_s_to_flush_save) {
    allow_ctrl_s_to_flush_save = false;
    await save_state(store);
  }
  allow_ctrl_s_to_flush_save = !ctrl_s_flush_save;
}
function is_ctrl_s_flush_save(state) {
  return state.global_keys.keys_down.has("s") && state.global_keys.keys_down.has("Control");
}
function calc_should_save(load_state_from_storage, store, cautious_save) {
  if (!load_state_from_storage)
    return false;
  const state = store.getState();
  const {ready_for_writing, storage_type, specialised_objects} = state.sync;
  if (!ready_for_writing)
    return false;
  if (cautious_save && specialised_objects.status === "FAILED")
    return false;
  if (cautious_save && !needs_save(state))
    return false;
  if (!storage_type) {
    const error_message = "Can not save.  No storage_type set";
    store.dispatch(ACTIONS.sync.update_sync_status({
      status: "FAILED",
      data_type: "specialised_objects",
      error_message,
      attempt: 0
    }));
    return false;
  }
  return true;
}
