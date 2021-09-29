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
export const controls_actions = {
  toggle_linked_datetime_sliders,
  set_display_time_sliders
};
