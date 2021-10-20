import {wcomponent_has_validity_predictions} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {calc_prediction_certainty} from "./prediction_uncertainty.js";
import {
  partition_and_prune_items_by_datetimes_and_versions
} from "./value_and_prediction/partition_and_prune_items_by_datetimes_and_versions.js";
const default_value = () => ({
  is_defined: false,
  is_valid: true,
  certainty: 1
});
export function get_wcomponent_validity_value(args) {
  const {wcomponent, created_at_ms, sim_ms} = args;
  if (!wcomponent_has_validity_predictions(wcomponent))
    return default_value();
  const active_validity = partition_and_prune_items_by_datetimes_and_versions({items: wcomponent.validity, created_at_ms, sim_ms}).present_item;
  if (!active_validity)
    return default_value();
  const valid = active_validity.probability > 0.5;
  const certainty = calc_prediction_certainty(active_validity);
  return {
    is_defined: true,
    is_valid: valid,
    certainty
  };
}
