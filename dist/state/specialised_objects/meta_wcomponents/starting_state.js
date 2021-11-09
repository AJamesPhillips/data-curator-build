export function get_meta_wcomponents_starting_state() {
  return {
    selected_wcomponent_ids_list: [],
    selected_wcomponent_ids_set: new Set(),
    selected_wcomponent_ids_to_ordinal_position_map: {},
    highlighted_wcomponent_ids: new Set(),
    neighbour_ids_of_highlighted_wcomponent: new Set(),
    last_clicked_wcomponent_id: void 0,
    last_pointer_down_connection_terminal: void 0,
    wcomponent_ids_to_move_list: [],
    wcomponent_ids_to_move_set: new Set()
  };
}
