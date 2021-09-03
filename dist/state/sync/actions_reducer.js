import {update_state, update_substate} from "../../utils/update_state.js";
export const sync_reducer = (state, action) => {
  if (is_update_sync_status(action)) {
    const {status, error_message = "", attempt: retry_attempt} = action;
    const saving = status === "SAVING";
    const saved = status === "SAVED";
    const loaded_successfully = status === "LOADED";
    const failed = status === "FAILED";
    const ready_for_reading = status !== void 0 && status !== "LOADING";
    const ready_for_writing = saved || loaded_successfully || failed;
    const sync = {
      ...state.sync,
      status,
      ready_for_reading,
      ready_for_writing,
      saving,
      error_message,
      retry_attempt
    };
    state = update_state(state, "sync", sync);
  }
  if (is_set_next_sync_ms(action)) {
    state = update_substate(state, "sync", "next_save_ms", action.next_save_ms);
  }
  if (is_update_storage_type(action)) {
    state = update_substate(state, "sync", "storage_type", action.storage_type);
    state = update_substate(state, "sync", "copy_from_storage_type", action.copy_from);
  }
  if (is_clear_storage_type_copy_from(action)) {
    state = update_substate(state, "sync", "copy_from_storage_type", false);
  }
  return state;
};
const update_sync_status_type = "update_sync_status";
export const update_sync_status = (args) => {
  return {type: update_sync_status_type, ...args};
};
const is_update_sync_status = (action) => {
  return action.type === update_sync_status_type;
};
const set_next_sync_ms_type = "set_next_sync_ms";
export const set_next_sync_ms = (args) => {
  return {type: set_next_sync_ms_type, ...args};
};
const is_set_next_sync_ms = (action) => {
  return action.type === set_next_sync_ms_type;
};
const update_storage_type_type = "update_storage_type";
export const update_storage_type = (args) => {
  return {type: update_storage_type_type, ...args};
};
const is_update_storage_type = (action) => {
  return action.type === update_storage_type_type;
};
const clear_storage_type_copy_from_type = "clear_storage_type_copy_from";
export const clear_storage_type_copy_from = (args) => {
  return {type: clear_storage_type_copy_from_type};
};
const is_clear_storage_type_copy_from = (action) => {
  return action.type === clear_storage_type_copy_from_type;
};
export const sync_actions = {
  update_sync_status,
  set_next_sync_ms,
  update_storage_type,
  clear_storage_type_copy_from
};
