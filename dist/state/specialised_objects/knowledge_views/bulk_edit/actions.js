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
const move_current_knowledge_view_entries_to_top_type = "move_current_knowledge_view_entries_to_top";
const move_current_knowledge_view_entries_to_top = (args) => {
  return {type: move_current_knowledge_view_entries_to_top_type, ...args};
};
export const is_move_current_knowledge_view_entries_to_top = (action) => {
  return action.type === move_current_knowledge_view_entries_to_top_type;
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
  move_current_knowledge_view_entries_to_top
};
