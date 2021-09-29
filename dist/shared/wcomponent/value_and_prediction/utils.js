import {sort_list} from "../../utils/sort.js";
import {VAPsType} from "../interfaces/generic_value.js";
import {wcomponent_is_action, wcomponent_is_statev2} from "../interfaces/SpecialisedObjects.js";
import {get_created_at_ms, partition_items_by_created_at_datetime} from "../../utils_datetime/utils_datetime.js";
import {
  partition_and_sort_by_uncertain_event_datetimes
} from "../../utils_datetime/partition_by_uncertain_datetime.js";
export function partition_and_prune_items_by_datetimes_and_versions(args) {
  const result = partition_items_by_created_at_datetime(args);
  const {latest, previous_versions_by_id} = group_versions_by_id(result.current_items);
  const partition_by_temporal = partition_and_sort_by_uncertain_event_datetimes({items: latest, sim_ms: args.sim_ms});
  return {
    invalid_future_items: result.invalid_future_items,
    ...partition_by_temporal,
    previous_versions_by_id
  };
}
function group_versions_by_id(items) {
  const by_id = {};
  items.forEach((item) => {
    const sub_items = by_id[item.id] || [];
    sub_items.push(item);
    by_id[item.id] = sub_items;
  });
  const previous_versions_by_id = {};
  const latest = Object.values(by_id).map((sub_items) => {
    const sorted = sort_list(sub_items, get_created_at_ms, "descending");
    const latest2 = sorted[0];
    previous_versions_by_id[latest2.id] = sorted.slice(1);
    return latest2;
  });
  return {latest, previous_versions_by_id};
}
export function get_VAPs_ordered_by_prob(VAPs, VAPs_represent) {
  const first_VAP = VAPs[0];
  if (VAPs_represent === VAPsType.boolean && first_VAP)
    return [first_VAP];
  return VAPs.sort((a, b) => a.probability > b.probability ? -1 : a.probability < b.probability ? 1 : 0);
}
export function subtype_to_VAPsType(subtype) {
  return subtype === "boolean" ? VAPsType.boolean : subtype === "number" ? VAPsType.number : subtype === "other" ? VAPsType.other : VAPsType.undefined;
}
export function wcomponent_VAPs_represent(wcomponent) {
  let VAPs_represent = VAPsType.undefined;
  if (wcomponent) {
    VAPs_represent = VAPsType.boolean;
    if (wcomponent_is_statev2(wcomponent))
      VAPs_represent = subtype_to_VAPsType(wcomponent.subtype);
    else if (wcomponent_is_action(wcomponent))
      VAPs_represent = VAPsType.action;
  }
  return VAPs_represent;
}
