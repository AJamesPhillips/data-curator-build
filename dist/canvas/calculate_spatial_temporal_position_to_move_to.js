import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {screen_width, screen_height, lefttop_to_xy} from "../state/display_options/display.js";
import {NODE_WIDTH, NODE_HEIGHT_APPROX} from "./position_utils.js";
import {SCALE_BY, bound_zoom} from "./zoom_utils.js";
export function calculate_spatial_temporal_position_to_move_to(args) {
  const {
    current_composed_knowledge_view,
    wcomponents_by_id,
    initial_wcomponent_id,
    disable_if_not_present
  } = args;
  let {created_at_ms, selected_wcomponent_ids_set} = args;
  let wcomponent_created_at_ms = void 0;
  let position = void 0;
  const {composed_wc_id_map, wc_ids_by_type} = current_composed_knowledge_view || {};
  if (composed_wc_id_map) {
    const wcomponent = wcomponents_by_id[initial_wcomponent_id];
    wcomponent_created_at_ms = wcomponent && get_created_at_ms(wcomponent);
    let view_entry = composed_wc_id_map[initial_wcomponent_id];
    let zoom = SCALE_BY;
    if (!view_entry && !disable_if_not_present && wc_ids_by_type) {
      const {any_node} = wc_ids_by_type;
      selected_wcomponent_ids_set = new Set(selected_wcomponent_ids_set);
      selected_wcomponent_ids_set.delete(initial_wcomponent_id);
      const ids = selected_wcomponent_ids_set.size ? selected_wcomponent_ids_set : any_node;
      let min_left = Number.POSITIVE_INFINITY;
      let max_left = Number.NEGATIVE_INFINITY;
      let min_top = Number.POSITIVE_INFINITY;
      let max_top = Number.NEGATIVE_INFINITY;
      ids.forEach((wcomponent_id) => {
        const wcomponent2 = wcomponents_by_id[wcomponent_id];
        const an_entry = composed_wc_id_map[wcomponent_id];
        if (!wcomponent2 || !an_entry)
          return;
        min_left = Math.min(min_left, an_entry.left);
        max_left = Math.max(max_left, an_entry.left);
        min_top = Math.min(min_top, an_entry.top);
        max_top = Math.max(max_top, an_entry.top);
        wcomponent_created_at_ms = get_created_at_ms(wcomponent2);
      });
      min_left -= NODE_WIDTH;
      max_left += NODE_WIDTH;
      min_top -= NODE_HEIGHT_APPROX * 2;
      max_top += NODE_HEIGHT_APPROX;
      view_entry = {
        left: (min_left + max_left) / 2,
        top: (min_top + max_top) / 2
      };
      const total_width = max_left - min_left;
      const total_height = max_top - min_top;
      const zoom_width = screen_width(false) / total_width * SCALE_BY;
      const zoom_height = screen_height() / total_height * SCALE_BY;
      zoom = Math.min(zoom_width, zoom_height);
      zoom = bound_zoom(Math.min(SCALE_BY, zoom));
    }
    if (wcomponent_created_at_ms) {
      created_at_ms = Math.max(created_at_ms, wcomponent_created_at_ms);
    }
    if (view_entry) {
      position = lefttop_to_xy({...view_entry, zoom}, true);
    }
  }
  return {position, go_to_datetime_ms: created_at_ms};
}
