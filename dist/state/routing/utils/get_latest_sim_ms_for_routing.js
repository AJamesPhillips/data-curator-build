import {get_uncertain_datetime} from "../../../shared/uncertainty/datetime.js";
import {
  wcomponent_has_legitimate_non_empty_state_VAP_sets
} from "../../../wcomponent/interfaces/SpecialisedObjects.js";
const ONE_MINUTE = 60 * 1e3;
export function get_latest_sim_ms_for_routing(wcomponent, state) {
  let sim_ms = Number.NEGATIVE_INFINITY;
  if (wcomponent_has_legitimate_non_empty_state_VAP_sets(wcomponent) && wcomponent.type === "action") {
    wcomponent.values_and_prediction_sets.forEach((vap_set) => {
      const vap_set_sim_ms = get_uncertain_datetime(vap_set.datetime)?.getTime() || Number.NEGATIVE_INFINITY;
      sim_ms = Math.max(sim_ms, vap_set_sim_ms);
    });
  }
  sim_ms = Math.max(sim_ms + ONE_MINUTE, state.routing.args.sim_ms);
  return sim_ms;
}
