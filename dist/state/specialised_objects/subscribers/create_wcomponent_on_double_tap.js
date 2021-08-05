import {round_canvas_point} from "../../../canvas/position_utils.js";
import {create_wcomponent} from "../../../knowledge/create_wcomponent_type.js";
import {pub_sub} from "../../pub_sub/pub_sub.js";
import {get_current_knowledge_view_from_state} from "../accessors.js";
export function create_wcomponent_on_double_tap(store) {
  pub_sub.canvas.sub("canvas_double_tap", (double_tap) => {
    const state = store.getState();
    const current_knowledge_view = get_current_knowledge_view_from_state(state);
    if (!current_knowledge_view) {
      console.error("No current_knowledge_view despite canvas double_tap");
      return;
    }
    if (state.display_options.consumption_formatting)
      return;
    const position = round_canvas_point({left: double_tap.x - 20, top: -double_tap.y - 20}, "large");
    const add_to_knowledge_view = {id: current_knowledge_view.id, position};
    create_wcomponent({
      wcomponent: {type: "state"},
      creation_context: state.creation_context,
      add_to_knowledge_view,
      store
    });
  });
}
