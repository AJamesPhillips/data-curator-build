import {make_graph, find_leaf_groups} from "../../utils/graph.js";
import {sort_list} from "../../utils/sort.js";
import {VAPsType} from "../interfaces/generic_value.js";
import {wcomponent_is_action, wcomponent_is_statev2} from "../interfaces/SpecialisedObjects.js";
import {get_created_at_ms, get_sim_datetime} from "../utils_datetime.js";
const get_id = (VAP_set) => `${VAP_set.id}.${VAP_set.version}`;
const get_head_ids = (VAP_set) => [];
const get_tail_ids = (VAP_set) => {
  return VAP_set.version > 1 ? [get_id({...VAP_set, version: VAP_set.version - 1})] : [];
};
export function group_VAP_sets_by_version(VAP_sets) {
  const graph = make_graph({items: VAP_sets, get_id, get_head_ids, get_tail_ids});
  const groups = find_leaf_groups({graph});
  const versioned = groups.map((group) => {
    return {
      latest: group[0],
      older: group.slice(1)
    };
  });
  return versioned;
}
export function sort_grouped_VAP_sets(grouped_VAP_sets) {
  const get_sort_key = (grouped_VAP_set) => {
    return get_VAP_datetime_sort_key(grouped_VAP_set.latest);
  };
  return sort_list(grouped_VAP_sets, get_sort_key, "descending");
}
export function ungroup_VAP_sets_by_version(grouped_VAP_sets) {
  const VAP_sets = [];
  grouped_VAP_sets.forEach((grouped_VAP_set) => {
    VAP_sets.push(grouped_VAP_set.latest, ...grouped_VAP_set.older);
  });
  return VAP_sets;
}
export function get_latest_versions_of_VAP_sets(VAP_sets) {
  const graph = make_graph({items: VAP_sets, get_id, get_head_ids, get_tail_ids});
  const groups = find_leaf_groups({graph});
  const versioned = groups.map((group) => {
    return {
      latest: group[0],
      older: group.slice(1)
    };
  });
  return versioned;
}
function get_VAP_datetime_sort_key(VAP) {
  const dt = get_sim_datetime(VAP);
  if (dt !== void 0)
    return dt.getTime();
  return get_created_at_ms(VAP);
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
