import {toggle_item_in_list} from "../../../../utils/list.js";
import {update_substate} from "../../../../utils/update_state.js";
import {
  is_clicked_wcomponent,
  is_clear_selected_wcomponents,
  is_pointerdown_on_connection_terminal,
  is_clear_pointerupdown_on_connection_terminal,
  is_set_selected_wcomponents,
  is_set_wcomponent_ids_to_move,
  is_pointerdown_on_component
} from "./actions.js";
export const selecting_reducer = (state, action) => {
  const initial_selected_wcomponent_ids_list = state.meta_wcomponents.selected_wcomponent_ids_list;
  if (is_clicked_wcomponent(action)) {
    const {id} = action;
    let selected_wcomponent_ids_list = [...state.meta_wcomponents.selected_wcomponent_ids_list];
    const {shift_or_control_down} = state.global_keys.derived;
    if (shift_or_control_down) {
      selected_wcomponent_ids_list = toggle_item_in_list(selected_wcomponent_ids_list, id);
    } else {
      selected_wcomponent_ids_list = [id];
    }
    const meta_wcomponents = {
      ...state.meta_wcomponents,
      selected_wcomponent_ids_list,
      last_clicked_wcomponent_id: id
    };
    state = {...state, meta_wcomponents};
  }
  if (is_clear_selected_wcomponents(action)) {
    state = handle_clear_selected_wcomponents(state);
  }
  if (is_set_selected_wcomponents(action)) {
    state = handle_set_selected_wcomponents(state, action);
  }
  if (is_pointerdown_on_component(action)) {
    const value = {wcomponent_id: action.wcomponent_id, terminal_type: void 0};
    state = update_substate(state, "meta_wcomponents", "last_pointer_down_connection_terminal", value);
  }
  if (is_pointerdown_on_connection_terminal(action)) {
    const {wcomponent_id, terminal_type} = action;
    const value = {wcomponent_id, terminal_type};
    state = update_substate(state, "meta_wcomponents", "last_pointer_down_connection_terminal", value);
  }
  if (is_clear_pointerupdown_on_connection_terminal(action)) {
    state = update_substate(state, "meta_wcomponents", "last_pointer_down_connection_terminal", void 0);
  }
  if (is_set_wcomponent_ids_to_move(action)) {
    state = update_substate(state, "meta_wcomponents", "wcomponent_ids_to_move_list", Array.from(action.wcomponent_ids_to_move));
    state = update_substate(state, "meta_wcomponents", "wcomponent_ids_to_move_set", action.wcomponent_ids_to_move);
  }
  if (initial_selected_wcomponent_ids_list !== state.meta_wcomponents.selected_wcomponent_ids_list) {
    state = update_derived_selected_wcomponent_ids(state);
  }
  return state;
};
function handle_clear_selected_wcomponents(state) {
  state = update_substate(state, "meta_wcomponents", "selected_wcomponent_ids_list", []);
  return state;
}
function handle_set_selected_wcomponents(state, action) {
  state = update_substate(state, "meta_wcomponents", "selected_wcomponent_ids_list", [...action.ids]);
  return state;
}
export function update_derived_selected_wcomponent_ids(state) {
  const selected_wcomponent_ids_set = new Set(state.meta_wcomponents.selected_wcomponent_ids_list);
  const map = {};
  state.meta_wcomponents.selected_wcomponent_ids_list.forEach((id, index) => map[id] = index);
  const meta_wcomponents = {
    ...state.meta_wcomponents,
    selected_wcomponent_ids_set,
    selected_wcomponent_ids_map: map
  };
  return {...state, meta_wcomponents};
}
