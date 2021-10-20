import {set_difference, set_union} from "../../utils/set.js";
import {wcomponent_is_statev2} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {wcomponent_has_single_statev2_datetime} from "../specialised_objects/accessors.js";
export const get_empty_wcomponent_ids_by_type = () => ({
  event: new Set(),
  statev2: new Set(),
  sub_state: new Set(),
  process: new Set(),
  action: new Set(),
  actor: new Set(),
  causal_link: new Set(),
  relation_link: new Set(),
  judgement: new Set(),
  objective: new Set(),
  counterfactualv2: new Set(),
  goal: new Set(),
  prioritisation: new Set(),
  judgement_or_objective: new Set(),
  any_link: new Set(),
  any_node: new Set(),
  any_state_VAPs: new Set(),
  has_single_datetime: new Set()
});
export function get_wcomponent_ids_by_type(state, ids) {
  const wc_ids_by_type = get_empty_wcomponent_ids_by_type();
  const wc_statev2_ids_with_single_datetime = new Set();
  ids.forEach((id) => {
    const wc = state.specialised_objects.wcomponents_by_id[id];
    if (!wc) {
      console.error(`Could not find wcomponent by id: ${id}`);
      return;
    }
    wc_ids_by_type[wc.type].add(id);
    if (wcomponent_is_statev2(wc) && wcomponent_has_single_statev2_datetime(wc)) {
      wc_statev2_ids_with_single_datetime.add(wc.id);
    }
  });
  wc_ids_by_type.judgement_or_objective = set_union(wc_ids_by_type.judgement, wc_ids_by_type.objective);
  wc_ids_by_type.any_link = set_union(wc_ids_by_type.causal_link, wc_ids_by_type.relation_link);
  wc_ids_by_type.any_node = set_difference(new Set(ids), wc_ids_by_type.any_link);
  wc_ids_by_type.any_state_VAPs = set_union(wc_ids_by_type.statev2, wc_ids_by_type.causal_link, wc_ids_by_type.action);
  wc_ids_by_type.has_single_datetime = set_union(wc_ids_by_type.event, wc_ids_by_type.sub_state, wc_statev2_ids_with_single_datetime);
  return wc_ids_by_type;
}
