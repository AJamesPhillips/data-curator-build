import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {
  wcomponent_is_judgement_or_objective
} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {get_VAP_set_id_to_counterfactual_v2_map} from "../../state/derived/accessor.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../../state/specialised_objects/accessors.js";
import {calculate_judgement_value} from "./calculate_judgement_value.js";
import {JudgementBadge} from "./JudgementBadge.js";
const map_state = (state, own_props) => {
  let judgement_wcomponent = get_wcomponent_from_state(state, own_props.judgement_or_objective_id);
  if (!wcomponent_is_judgement_or_objective(judgement_wcomponent))
    judgement_wcomponent = void 0;
  let target_wcomponent = void 0;
  let VAP_set_id_to_counterfactual_v2_map = void 0;
  if (judgement_wcomponent) {
    const target_id = judgement_wcomponent.judgement_target_wcomponent_id;
    target_wcomponent = get_wcomponent_from_state(state, target_id);
    VAP_set_id_to_counterfactual_v2_map = get_VAP_set_id_to_counterfactual_v2_map(state, target_id);
  }
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  const position = composed_kv?.composed_wc_id_map[own_props.judgement_or_objective_id];
  return {
    judgement_wcomponent,
    target_wcomponent,
    VAP_set_id_to_counterfactual_v2_map,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    position
  };
};
const connector = connect(map_state);
function _JudgementBadgeConnected(props) {
  const {judgement_or_objective_id: judgement_id, judgement_wcomponent, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms, position} = props;
  if (!judgement_wcomponent || !target_wcomponent)
    return null;
  const judgement_value = calculate_judgement_value({judgement_wcomponent, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms});
  return /* @__PURE__ */ h(JudgementBadge, {
    judgement: judgement_value,
    judgement_or_objective_id: judgement_id,
    position
  });
}
export const JudgementBadgeConnected = connector(_JudgementBadgeConnected);
