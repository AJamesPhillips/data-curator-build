import {offset_by_half_node, position_to_point, round_canvas_point} from "../../../canvas/position_utils.js";
import {create_wcomponent} from "../wcomponents/create_wcomponent_type.js";
import {pub_sub} from "../../pub_sub/pub_sub.js";
import {selector_chosen_base_id} from "../../user_info/selector.js";
import {get_current_knowledge_view_from_state} from "../accessors.js";
export function create_wcomponent_on_double_tap(store) {
  pub_sub.canvas.sub("canvas_double_tap", (double_tap) => {
    const state = store.getState();
    const current_knowledge_view = get_current_knowledge_view_from_state(state);
    if (!current_knowledge_view) {
      console.error("No current_knowledge_view despite canvas double_tap");
      return;
    }
    const base_id = selector_chosen_base_id(state);
    if (base_id === void 0) {
      console.error("No base_id despite canvas double_tap");
      return;
    }
    if (state.display_options.consumption_formatting)
      return;
    const position = position_from_canvas_pointer_event(double_tap);
    const add_to_knowledge_view = {id: current_knowledge_view.id, position};
    create_wcomponent({
      wcomponent: {base_id, type: "statev2"},
      add_to_knowledge_view,
      store
    });
  });
}
export function position_from_canvas_pointer_event(canvas_pointer_event) {
  const point = offset_by_half_node(position_to_point(canvas_pointer_event));
  const position = round_canvas_point(point, "large");
  return position;
}
