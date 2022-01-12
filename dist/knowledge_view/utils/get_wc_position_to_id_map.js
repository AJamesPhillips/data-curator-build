import {round_canvas_point} from "../../canvas/position_utils.js";
import {wcomponent_is_plain_connection} from "../../wcomponent/interfaces/SpecialisedObjects.js";
export function wc_map_entry_to_coord_key(entry) {
  return `${entry.left},${entry.top}`;
}
export function get_wc_position_to_id_map(wc_id_map, wcomponents_by_id) {
  const entries = {};
  Object.entries(wc_id_map).forEach(([wcomponent_id, entry]) => {
    if (wcomponent_is_plain_connection(wcomponents_by_id[wcomponent_id]))
      return;
    const rounded_entry = round_canvas_point(entry, "large");
    const coord_key = wc_map_entry_to_coord_key(rounded_entry);
    const ids = entries[coord_key] || [];
    ids.push(wcomponent_id);
    entries[coord_key] = ids;
  });
  return entries;
}
