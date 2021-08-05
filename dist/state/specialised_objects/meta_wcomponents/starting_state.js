export function get_meta_wcomponents_starting_state() {
  return {
    selected_wcomponent_ids_list: [],
    selected_wcomponent_ids_set: new Set(),
    selected_wcomponent_ids_map: {},
    highlighted_wcomponent_ids: new Set(),
    last_clicked_wcomponent_id: void 0,
    last_pointer_down_connection_terminal: void 0
  };
}
