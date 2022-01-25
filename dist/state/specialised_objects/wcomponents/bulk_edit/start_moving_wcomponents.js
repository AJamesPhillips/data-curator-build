import {round_canvas_point} from "../../../../canvas/position_utils.js";
import {ACTIONS} from "../../../actions.js";
import {pub_sub} from "../../../pub_sub/pub_sub.js";
import {get_store} from "../../../store.js";
export function start_moving_wcomponents(wcomponent_ids_to_move, start_position) {
  const store = get_store();
  const set_wcomponent_ids_to_move_action = ACTIONS.meta_wcomponents.set_wcomponent_ids_to_move({wcomponent_ids_to_move});
  store.dispatch(set_wcomponent_ids_to_move_action);
  let new_relative_position;
  const unsubscribe_canvas_move = pub_sub.canvas.sub("canvas_move", (current_position) => {
    new_relative_position = round_canvas_point({
      left: current_position.x - start_position.x,
      top: start_position.y - current_position.y
    });
    pub_sub.canvas.pub("canvas_node_drag_relative_position", new_relative_position);
  });
  const unsubscribe_canvas_pointer_up = pub_sub.canvas.sub("canvas_pointer_up", () => {
    if (new_relative_position) {
      const bulk_edit_knowledge_view_entries_action = ACTIONS.specialised_object.bulk_edit_knowledge_view_entries({
        wcomponent_ids: Array.from(wcomponent_ids_to_move),
        change_left: new_relative_position.left,
        change_top: new_relative_position.top
      });
      store.dispatch(bulk_edit_knowledge_view_entries_action);
    }
    const set_wcomponent_ids_to_move_action2 = ACTIONS.meta_wcomponents.set_wcomponent_ids_to_move({
      wcomponent_ids_to_move: new Set()
    });
    store.dispatch(set_wcomponent_ids_to_move_action2);
    unsubscribe_canvas_move();
    unsubscribe_canvas_pointer_up();
  });
}
