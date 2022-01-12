import {v_step} from "../../canvas/position_utils.js";
import {get_wc_position_to_id_map, wc_map_entry_to_coord_key} from "./get_wc_position_to_id_map.js";
export function get_next_available_wc_map_position(wc_id_map, wcomponent_id, wcomponents_by_id, direction_y = v_step) {
  if (!wc_id_map || !wcomponent_id)
    return void 0;
  const entry = wc_id_map[wcomponent_id];
  if (!entry)
    return void 0;
  const coord_to_id_map = get_wc_position_to_id_map(wc_id_map, wcomponents_by_id);
  let conflict = entry;
  const next_available = {left: entry.left, top: entry.top};
  while (conflict) {
    next_available.top += direction_y;
    const coord_key = wc_map_entry_to_coord_key(next_available);
    const conflicting_ids = coord_to_id_map[coord_key] || [];
    const conflicting_id = conflicting_ids[0];
    conflict = conflicting_id ? wc_id_map[conflicting_id] : void 0;
  }
  return next_available;
}
