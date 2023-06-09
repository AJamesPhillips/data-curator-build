import {update_substate} from "../../../utils/update_state.js";
import {get_current_composed_knowledge_view_from_state} from "../accessors.js";
export const highlighting_reducer = (state, action) => {
  if (is_set_highlighted_wcomponent(action)) {
    const {id, highlighted} = action;
    let highlighted_wcomponent_ids = new Set(state.meta_wcomponents.highlighted_wcomponent_ids);
    if (id === void 0)
      highlighted_wcomponent_ids = new Set();
    else {
      if (highlighted)
        highlighted_wcomponent_ids.add(id);
      else
        highlighted_wcomponent_ids.delete(id);
    }
    state = update_substate(state, "meta_wcomponents", "highlighted_wcomponent_ids", highlighted_wcomponent_ids);
    let {neighbour_ids_of_highlighted_wcomponent} = state.meta_wcomponents;
    const focused_mode = state.display_options.focused_mode;
    if (focused_mode) {
      const current_kv = get_current_composed_knowledge_view_from_state(state);
      if (current_kv) {
        neighbour_ids_of_highlighted_wcomponent = new Set();
        if (id !== void 0 && action.highlighted) {
          const connected_ids = current_kv.wc_id_connections_map[id];
          if (connected_ids) {
            neighbour_ids_of_highlighted_wcomponent = new Set(connected_ids);
            if (state.derived.wcomponent_ids_by_type.any_node.has(id)) {
              connected_ids.forEach((connection_id) => {
                const node_ids = current_kv.wc_id_connections_map[connection_id];
                if (node_ids) {
                  node_ids.forEach((node_id) => neighbour_ids_of_highlighted_wcomponent.add(node_id));
                }
              });
            }
          }
        }
      }
    } else if (neighbour_ids_of_highlighted_wcomponent.size) {
      neighbour_ids_of_highlighted_wcomponent = new Set();
    }
    state = update_substate(state, "meta_wcomponents", "neighbour_ids_of_highlighted_wcomponent", neighbour_ids_of_highlighted_wcomponent);
  }
  return state;
};
const set_highlighted_wcomponent_type = "set_highlighted_wcomponent";
const set_highlighted_wcomponent = (args) => {
  return {
    type: set_highlighted_wcomponent_type,
    id: args.id,
    highlighted: args.highlighted
  };
};
const is_set_highlighted_wcomponent = (action) => {
  return action.type === set_highlighted_wcomponent_type;
};
export const highlighting_actions = {
  set_highlighted_wcomponent
};
