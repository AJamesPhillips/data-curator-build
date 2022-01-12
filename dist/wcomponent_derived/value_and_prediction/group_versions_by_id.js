import {SortDirection, sort_list} from "../../shared/utils/sort.js";
import {get_created_at_ms} from "../../shared/utils_datetime/utils_datetime.js";
export function group_versions_by_id(items) {
  const by_id = {};
  items.forEach((item) => {
    const sub_items = by_id[item.id] || [];
    sub_items.push(item);
    by_id[item.id] = sub_items;
  });
  const previous_versions_by_id = {};
  const latest = Object.values(by_id).map((sub_items) => {
    const sorted = sort_list(sub_items, get_created_at_ms, SortDirection.descending);
    const latest2 = sorted[0];
    previous_versions_by_id[latest2.id] = sorted.slice(1);
    return latest2;
  });
  return {latest, previous_versions_by_id};
}
