import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function sync_persist(state) {
  const to_persist = pick([
    "storage_type",
    "copy_from_storage_type"
  ], state.sync);
  persist_state_object("sync", to_persist);
}
export function sync_starting_state() {
  const obj = get_persisted_state_object("sync");
  const state = {
    status: void 0,
    ready_for_reading: false,
    ready_for_writing: false,
    saving: false,
    error_message: "",
    storage_type: "local_storage",
    copy_from_storage_type: false,
    retry_attempt: void 0,
    next_save_ms: void 0,
    ...obj
  };
  return state;
}
export function is_using_solid_for_storage() {
  return sync_starting_state().storage_type === "solid";
}
