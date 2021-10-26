import {screen_width, screen_height, TOP_HEADER_FUDGE, bottom_controls_fudge} from "../state/display_options/display.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {SCALE_BY} from "./zoom_utils.js";
export function calculate_if_components_on_screen(state) {
  let components_on_screen = void 0;
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (composed_kv) {
    const {composed_visible_wc_id_map, wc_ids_by_type} = composed_kv;
    const {x: min_x, y, zoom} = state.routing.args;
    const scale_pixel_to_canvas = SCALE_BY / zoom;
    const max_x = min_x + screen_width(state.controls.display_side_panel) * scale_pixel_to_canvas;
    const min_y = y - TOP_HEADER_FUDGE * scale_pixel_to_canvas;
    const max_y = min_y - (screen_height() - TOP_HEADER_FUDGE - bottom_controls_fudge(state)) * scale_pixel_to_canvas;
    components_on_screen = !!Array.from(wc_ids_by_type.any_node).find((id) => {
      const position = composed_visible_wc_id_map[id];
      if (!position)
        return false;
      const {left, top} = position;
      return left >= min_x && left <= max_x && -top <= min_y && -top >= max_y;
    });
  }
  return components_on_screen;
}
