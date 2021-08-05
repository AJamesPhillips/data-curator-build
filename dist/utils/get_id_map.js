import {is_id_attribute} from "../state/State.js";
import {is_object_id, is_statement_id, is_pattern_id} from "../shared/utils/ids.js";
export function get_id_map(ids, state, depth = 1) {
  let id_map = {};
  if (depth <= 0)
    return id_map;
  const objects = [];
  ids.forEach((id_to_find) => {
    let item;
    if (is_object_id(id_to_find)) {
      item = state.objects.find(({id}) => id === id_to_find);
      if (item)
        objects.push(item);
    } else if (is_statement_id(id_to_find)) {
      item = state.statements.find(({id}) => id === id_to_find);
    } else if (is_pattern_id(id_to_find)) {
      item = state.patterns.find(({id}) => id === id_to_find);
    }
    if (item)
      id_map[id_to_find] = item;
  });
  const next_ids = get_ids_from_objects_attributes(objects);
  const deeper_id_map = get_id_map(next_ids, state, depth - 1);
  return {
    ...id_map,
    ...deeper_id_map
  };
}
function get_ids_from_objects_attributes(objects) {
  let all_ids = [];
  objects.map(get_ids_from_object_attributes).forEach((ids) => all_ids = [...all_ids, ...ids]);
  return all_ids;
}
export function get_ids_from_object_attributes(object) {
  const id_attributes = object.attributes.filter(is_id_attribute);
  const ids = id_attributes.map(({id}) => id);
  return ids;
}
