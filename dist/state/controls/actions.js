const toggle_linked_datetime_sliders_type = "toggle_linked_datetime_sliders";
const toggle_linked_datetime_sliders = () => {
  return {type: toggle_linked_datetime_sliders_type};
};
export const is_toggle_linked_datetime_sliders = (action) => {
  return action.type === toggle_linked_datetime_sliders_type;
};
const set_display_created_at_time_slider_type = "set_display_created_at_time_slider";
const set_display_created_at_time_slider = (display_created_at_time_slider) => {
  return {type: set_display_created_at_time_slider_type, display_created_at_time_slider};
};
export const is_set_display_created_at_time_slider = (action) => {
  return action.type === set_display_created_at_time_slider_type;
};
export const controls_actions = {
  toggle_linked_datetime_sliders,
  set_display_created_at_time_slider
};
