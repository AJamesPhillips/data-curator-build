export function get_actually_display_time_sliders(state) {
  const editing = !state.display_options.consumption_formatting;
  return editing || state.controls.display_time_sliders;
}
