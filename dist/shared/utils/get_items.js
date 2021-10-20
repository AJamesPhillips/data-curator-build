import {wcomponent_types} from "../../wcomponent/interfaces/wcomponent_base.js";
export function get_items_by_id(items, description) {
  const map = {};
  items.forEach((item) => {
    if (map[item.id]) {
      throw new Error(`Duplicate ${description}.id: "${map[item.id]}".  "${map[item.id].title}" and "${item.title}"`);
    }
    map[item.id] = item;
  });
  return map;
}
export function get_multiple_items_by_id(items) {
  const map = {};
  items.forEach((item) => {
    map[item.id] = map[item.id] || [];
    map[item.id].push(item);
  });
  return map;
}
export function get_item_ids_by_type(items) {
  const map = {};
  wcomponent_types.forEach((t) => map[t] = new Set());
  items.forEach((item) => map[item.type].add(item.id));
  return map;
}
