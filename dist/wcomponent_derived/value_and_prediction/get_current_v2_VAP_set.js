import {
  partition_and_prune_items_by_datetimes_and_versions
} from "./partition_and_prune_items_by_datetimes_and_versions.js";
export function get_current_VAP_set(args) {
  const {
    values_and_prediction_sets = [],
    created_at_ms,
    sim_ms
  } = args;
  const {present_item} = partition_and_prune_items_by_datetimes_and_versions({
    items: values_and_prediction_sets,
    created_at_ms,
    sim_ms
  });
  return present_item;
}
