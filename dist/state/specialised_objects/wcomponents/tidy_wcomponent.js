import {set_VAP_probabilities} from "../../../wcomponent/CRUD_helpers/prepare_new_VAP.js";
import {SortDirection, sort_list} from "../../../shared/utils/sort.js";
import {get_created_at_ms} from "../../../shared/utils_datetime/utils_datetime.js";
import {
  wcomponent_has_validity_predictions,
  wcomponent_has_VAP_sets
} from "../../../wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_VAPs_represent} from "../../../wcomponent/get_wcomponent_VAPs_represent.js";
export function tidy_wcomponent(wcomponent, wcomponents_by_id) {
  if (wcomponent_has_validity_predictions(wcomponent)) {
    const sorted_predictions = sort_list(wcomponent.validity, get_created_at_ms, SortDirection.ascending);
    wcomponent.validity = sorted_predictions;
  }
  if (wcomponent_has_VAP_sets(wcomponent)) {
    const sorted_VAP_sets = sort_list(wcomponent.values_and_prediction_sets || [], get_created_at_ms, SortDirection.ascending);
    const VAPs_represent = get_wcomponent_VAPs_represent(wcomponent, wcomponents_by_id);
    const corrected_VAPs_in_VAP_sets = sorted_VAP_sets.map((VAP_set) => ({
      ...VAP_set,
      entries: set_VAP_probabilities(VAP_set.entries, VAPs_represent)
    }));
    wcomponent.values_and_prediction_sets = corrected_VAPs_in_VAP_sets;
  }
  return wcomponent;
}
