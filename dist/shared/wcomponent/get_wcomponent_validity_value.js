import {wcomponent_has_validity_predictions} from "./interfaces/SpecialisedObjects.js";
import {calc_is_uncertain} from "./uncertainty_utils.js";
import {partition_and_prune_items_by_datetimes_and_versions} from "./value_and_prediction/utils.js";
const default_value = () => ({
  probabilities: [],
  is_defined: false,
  value: true,
  probability: 1,
  conviction: 1,
  certainty: 1,
  uncertain: false,
  assumed: false
});
export function get_wcomponent_validity_value(args) {
  const {wcomponent, created_at_ms, sim_ms} = args;
  if (!wcomponent_has_validity_predictions(wcomponent))
    return default_value();
  const active_validity = partition_and_prune_items_by_datetimes_and_versions({items: wcomponent.validity, created_at_ms, sim_ms}).present_items.last();
  if (!active_validity)
    return default_value();
  const {probability, conviction} = active_validity;
  const valid = probability > 0.5;
  const uncertain = calc_is_uncertain({probability, conviction});
  const certainty = Math.min(probability, conviction);
  return {
    probabilities: [],
    is_defined: true,
    value: valid,
    uncertain,
    probability,
    conviction,
    certainty,
    assumed: false
  };
}
