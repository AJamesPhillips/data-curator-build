const toggle_linked_datetime_sliders_type = "toggle_linked_datetime_sliders";
const toggle_linked_datetime_sliders = () => {
  return {type: toggle_linked_datetime_sliders_type};
};
export const is_toggle_linked_datetime_sliders = (action) => {
  return action.type === toggle_linked_datetime_sliders_type;
};
const set_display_time_sliders_type = "set_display_time_sliders";
const set_display_time_sliders = (display_time_sliders) => {
  return {type: set_display_time_sliders_type, display_time_sliders};
};
export const is_set_display_time_sliders = (action) => {
  return action.type === set_display_time_sliders_type;
};
const toggle_display_time_sliders_type = "toggle_display_time_sliders";
const toggle_display_time_sliders = () => {
  return {type: toggle_display_time_sliders_type};
};
export const is_toggle_display_time_sliders = (action) => {
  return action.type === toggle_display_time_sliders_type;
};
const set_or_toggle_display_side_panel_type = "set_or_toggle_display_side_panel";
const set_or_toggle_display_side_panel = (display_side_panel) => {
  if (typeof display_side_panel !== "boolean")
    display_side_panel = void 0;
  return {type: set_or_toggle_display_side_panel_type, display_side_panel};
};
export const is_set_or_toggle_display_side_panel = (action) => {
  return action.type === set_or_toggle_display_side_panel_type;
};
const set_or_toggle_display_select_storage_type = "set_or_toggle_display_select_storage";
const set_or_toggle_display_select_storage = (display_select_storage) => {
  if (typeof display_select_storage !== "boolean")
    display_select_storage = void 0;
  return {type: set_or_toggle_display_select_storage_type, display_select_storage};
};
export const is_set_or_toggle_display_select_storage = (action) => {
  return action.type === set_or_toggle_display_select_storage_type;
};
export const controls_actions = {
  toggle_linked_datetime_sliders,
  set_display_time_sliders,
  toggle_display_time_sliders,
  set_or_toggle_display_side_panel,
  set_or_toggle_display_select_storage
};
