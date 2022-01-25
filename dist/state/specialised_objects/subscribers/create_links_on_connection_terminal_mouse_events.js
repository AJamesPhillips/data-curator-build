import {create_wcomponent} from "../wcomponents/create_wcomponent_type.js";
import {ACTIONS} from "../../actions.js";
import {selector_chosen_base_id} from "../../user_info/selector.js";
import {is_pointerup_on_component, is_pointerup_on_connection_terminal} from "../meta_wcomponents/selecting/actions.js";
import {pub_sub} from "../../pub_sub/pub_sub.js";
export function create_links_on_connection_terminal_mouse_events__subscriber(store) {
  return () => {
    const state = store.getState();
    const {last_pointer_down_connection_terminal} = state.meta_wcomponents;
    if (!last_pointer_down_connection_terminal)
      return;
    const base_id = selector_chosen_base_id(state);
    if (base_id === void 0)
      return;
    if (state.global_keys.last_key === "Escape" || state.display_options.consumption_formatting) {
      store.dispatch(ACTIONS.meta_wcomponents.clear_pointerupdown_on_connection_terminal({}));
      return;
    }
    if (!state.last_action)
      return;
    let should_not_create_new_connection = false;
    const {
      terminal_type: start_terminal_type,
      wcomponent_id: start_wcomponent_id
    } = last_pointer_down_connection_terminal;
    const start_attribute = start_terminal_type?.attribute || "state";
    let start_direction = start_terminal_type?.direction;
    let end_wcomponent_id;
    let end_attribute = "state";
    let end_direction = (start_terminal_type?.direction || "from") === "from" ? "to" : "from";
    if (is_pointerup_on_component(state.last_action)) {
      end_wcomponent_id = state.last_action.wcomponent_id;
      should_not_create_new_connection = start_wcomponent_id === end_wcomponent_id && start_terminal_type?.direction === void 0;
    } else if (is_pointerup_on_connection_terminal(state.last_action)) {
      end_wcomponent_id = state.last_action.wcomponent_id;
      end_attribute = state.last_action.terminal_type.attribute;
      end_direction = state.last_action.terminal_type.direction;
    } else
      return;
    should_not_create_new_connection = should_not_create_new_connection || start_wcomponent_id === end_wcomponent_id && start_direction === end_direction;
    store.dispatch(ACTIONS.meta_wcomponents.clear_pointerupdown_on_connection_terminal({}));
    if (should_not_create_new_connection)
      return;
    start_direction = end_direction === "from" ? "to" : "from";
    const start_is_effector = start_direction === "from";
    const from_id = start_is_effector ? start_wcomponent_id : end_wcomponent_id;
    const to_id = start_is_effector ? end_wcomponent_id : start_wcomponent_id;
    const from_type = start_is_effector ? start_attribute : end_attribute;
    const to_type = start_is_effector ? end_attribute : start_attribute;
    const either_meta = start_attribute === "meta" || end_attribute === "meta";
    const connection_type = either_meta ? "relation_link" : "causal_link";
    const wcomponent = {base_id, type: connection_type, from_id, to_id, from_type, to_type};
    create_wcomponent({wcomponent});
  };
}
export function clear_last_pointer_down_connection_terminal(store) {
  function optionally_dispatch_action_to_clear_last_pointer_down_connection_terminal() {
    const state = store.getState();
    const {last_pointer_down_connection_terminal} = state.meta_wcomponents;
    if (!last_pointer_down_connection_terminal)
      return;
    store.dispatch(ACTIONS.meta_wcomponents.clear_pointerupdown_on_connection_terminal({}));
  }
  pub_sub.canvas.sub("canvas_right_click", () => {
    optionally_dispatch_action_to_clear_last_pointer_down_connection_terminal();
  });
  pub_sub.canvas.sub("canvas_pointer_down", () => {
    optionally_dispatch_action_to_clear_last_pointer_down_connection_terminal();
  });
  pub_sub.canvas.sub("canvas_pointer_up", () => {
    optionally_dispatch_action_to_clear_last_pointer_down_connection_terminal();
  });
}
