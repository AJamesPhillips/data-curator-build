const bulk_edit_knowledge_view_entries_type = "bulk_edit_knowledge_view_entries";
const bulk_edit_knowledge_view_entries = (args) => {
  return {type: bulk_edit_knowledge_view_entries_type, ...args};
};
export const is_bulk_edit_knowledge_view_entries = (action) => {
  return action.type === bulk_edit_knowledge_view_entries_type;
};
const snap_to_grid_knowledge_view_entries_type = "snap_to_grid_knowledge_view_entries";
const snap_to_grid_knowledge_view_entries = (args) => {
  return {type: snap_to_grid_knowledge_view_entries_type, ...args};
};
export const is_snap_to_grid_knowledge_view_entries = (action) => {
  return action.type === snap_to_grid_knowledge_view_entries_type;
};
const change_current_knowledge_view_entries_order_type = "change_current_knowledge_view_entries_order";
const change_current_knowledge_view_entries_order = (args) => {
  return {type: change_current_knowledge_view_entries_order_type, ...args};
};
export const is_change_current_knowledge_view_entries_order = (action) => {
  return action.type === change_current_knowledge_view_entries_order_type;
};
const bulk_add_to_knowledge_view_type = "bulk_add_to_knowledge_view";
const bulk_add_to_knowledge_view = (args) => {
  return {type: bulk_add_to_knowledge_view_type, ...args};
};
export const is_bulk_add_to_knowledge_view = (action) => {
  return action.type === bulk_add_to_knowledge_view_type;
};
const bulk_remove_from_knowledge_view_type = "bulk_remove_from_knowledge_view";
const bulk_remove_from_knowledge_view = (args) => {
  return {type: bulk_remove_from_knowledge_view_type, ...args};
};
export const is_bulk_remove_from_knowledge_view = (action) => {
  return action.type === bulk_remove_from_knowledge_view_type;
};
export const bulk_editing_knowledge_view_entries_actions = {
  bulk_edit_knowledge_view_entries,
  bulk_add_to_knowledge_view,
  bulk_remove_from_knowledge_view,
  snap_to_grid_knowledge_view_entries,
  change_current_knowledge_view_entries_order
};
