import {update_substate} from "../../../utils/update_state.js";
export const backup_reducer = (state, action) => {
  if (is_update_backup_status(action)) {
    state = update_substate(state, "backup", "status", action.status);
  }
  return state;
};
const update_backup_status_type = "update_backup_status";
export const update_backup_status = (args) => {
  return {type: update_backup_status_type, ...args};
};
const is_update_backup_status = (action) => {
  return action.type === update_backup_status_type;
};
export const backup_actions = {
  update_backup_status
};
