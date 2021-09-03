import {create_wcomponent} from "../../../knowledge/create_wcomponent_type.js";
import {ACTIONS} from "../../actions.js";
import {is_pointerup_on_connection_terminal} from "../meta_wcomponents/selecting/actions.js";
export function create_links_on_connection_terminal_mouse_events(store) {
  return () => {
    const state = store.getState();
    const {last_pointer_down_connection_terminal} = state.meta_wcomponents;
    if (!last_pointer_down_connection_terminal)
      return;
    if (state.global_keys.last_key === "Escape") {
      store.dispatch(ACTIONS.specialised_object.clear_pointerupdown_on_connection_terminal({}));
      return;
    }
    if (!state.last_action)
      return;
    if (!is_pointerup_on_connection_terminal(state.last_action))
      return;
    const {terminal_type: start_terminal_type, wcomponent_id: start_wcomponent_id} = last_pointer_down_connection_terminal;
    const {terminal_type: end_terminal_type, wcomponent_id: end_wcomponent_id} = state.last_action;
    store.dispatch(ACTIONS.specialised_object.clear_pointerupdown_on_connection_terminal({}));
    if (start_wcomponent_id === end_wcomponent_id && start_terminal_type === end_terminal_type)
      return;
    const {attribute: start_type, direction: start_direction} = start_terminal_type;
    let {attribute: end_type, direction: end_direction} = end_terminal_type;
    if (start_direction === end_direction) {
      end_direction = end_direction === "from" ? "to" : "from";
    }
    const start_is_effector = start_direction === "from";
    const from_id = start_is_effector ? start_wcomponent_id : end_wcomponent_id;
    const to_id = start_is_effector ? end_wcomponent_id : start_wcomponent_id;
    const from_type = start_is_effector ? start_type : end_type;
    const to_type = start_is_effector ? end_type : start_type;
    const either_meta = start_type === "meta" || end_type === "meta";
    const connection_type = either_meta ? "relation_link" : "causal_link";
    const wcomponent = {type: connection_type, from_id, to_id, from_type, to_type};
    create_wcomponent({wcomponent, creation_context: state.creation_context});
  };
}
