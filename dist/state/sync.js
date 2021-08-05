export const sync_reducer = (state, action) => {
  if (is_update_sync_status(action)) {
    state = {
      ...state,
      sync: {
        ready: action.status !== "LOADING",
        saving: action.status === "SAVING",
        status: action.status
      }
    };
  }
  return state;
};
const update_sync_status_type = "update_sync_status";
export const update_sync_status = (status) => {
  return {type: update_sync_status_type, status};
};
const is_update_sync_status = (action) => {
  return action.type === update_sync_status_type;
};
export const sync_actions = {
  update_sync_status
};
