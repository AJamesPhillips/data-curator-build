const toggle_consumption_formatting_type = "toggle_consumption_formatting";
const toggle_consumption_formatting = (args) => {
  return {type: toggle_consumption_formatting_type, ...args};
};
export const is_toggle_consumption_formatting = (action) => {
  return action.type === toggle_consumption_formatting_type;
};
const toggle_focused_mode_type = "toggle_focused_mode";
const toggle_focused_mode = (args) => {
  return {type: toggle_focused_mode_type, ...args};
};
export const is_toggle_focused_mode = (action) => {
  return action.type === toggle_focused_mode_type;
};
const set_time_resolution_type = "set_time_resolution";
const set_time_resolution = (args) => {
  return {type: set_time_resolution_type, ...args};
};
export const is_set_time_resolution = (action) => {
  return action.type === set_time_resolution_type;
};
const set_validity_filter_type = "set_validity_filter";
const set_validity_filter = (args) => {
  return {type: set_validity_filter_type, ...args};
};
export const is_set_validity_filter = (action) => {
  return action.type === set_validity_filter_type;
};
const set_certainty_formatting_type = "set_certainty_formatting";
const set_certainty_formatting = (args) => {
  return {type: set_certainty_formatting_type, ...args};
};
export const is_set_certainty_formatting = (action) => {
  return action.type === set_certainty_formatting_type;
};
const set_display_by_simulated_time_type = "set_display_by_simulated_time";
const set_display_by_simulated_time = (display_by_simulated_time) => {
  return {type: set_display_by_simulated_time_type, display_by_simulated_time};
};
export const is_set_display_by_simulated_time = (action) => {
  return action.type === set_display_by_simulated_time_type;
};
const set_display_time_marks_type = "set_display_time_marks";
const set_display_time_marks = (display_time_marks) => {
  return {type: set_display_time_marks_type, display_time_marks};
};
export const is_set_display_time_marks = (action) => {
  return action.type === set_display_time_marks_type;
};
const set_or_toggle_animate_causal_links_type = "set_or_toggle_animate_causal_links";
const set_or_toggle_animate_causal_links = (animate_causal_links) => {
  return {type: set_or_toggle_animate_causal_links_type, animate_causal_links};
};
export const is_set_or_toggle_animate_causal_links = (action) => {
  return action.type === set_or_toggle_animate_causal_links_type;
};
const set_show_help_menu_type = "set_show_help_menu";
const set_show_help_menu = (args) => {
  return {type: set_show_help_menu_type, ...args};
};
export const is_set_show_help_menu = (action) => {
  return action.type === set_show_help_menu_type;
};
export const display_actions = {
  toggle_consumption_formatting,
  toggle_focused_mode,
  set_time_resolution,
  set_validity_filter,
  set_certainty_formatting,
  set_display_by_simulated_time,
  set_display_time_marks,
  set_or_toggle_animate_causal_links,
  set_show_help_menu
};
