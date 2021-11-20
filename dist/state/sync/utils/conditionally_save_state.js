import {ACTIONS} from "../../actions.js";
import {needs_save} from "./needs_save.js";
import {save_state} from "./save_state.js";
export async function conditionally_save_state(store) {
  const should_save = calc_should_save(store, true);
  if (!should_save)
    return Promise.resolve();
  await save_state(store);
}
function calc_should_save(store, cautious_save) {
  if (!store.load_state_from_storage)
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
