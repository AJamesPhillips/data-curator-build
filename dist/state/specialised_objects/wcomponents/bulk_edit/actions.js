const bulk_edit_wcomponents_type = "bulk_edit_wcomponents";
const bulk_edit_wcomponents = (args) => {
  return {type: bulk_edit_wcomponents_type, ...args};
};
export const is_bulk_edit_wcomponents = (action) => {
  return action.type === bulk_edit_wcomponents_type;
};
export const bulk_editing_wcomponents_actions = {
  bulk_edit_wcomponents
};
