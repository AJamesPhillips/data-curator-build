import {h} from "../../../_snowpack/pkg/preact.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {wcomponent_is_judgement_or_objective} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_counterfactuals} from "../../state/derived/accessor.js";
import {calculate_judgement_value} from "./calculate_judgement_value.js";
import {JudgementBadge} from "./JudgementBadge.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../../state/specialised_objects/accessors.js";
const map_state = (state, own_props) => {
  let judgement_wcomponent = get_wcomponent_from_state(state, own_props.judgement_or_objective_id);
  if (!wcomponent_is_judgement_or_objective(judgement_wcomponent))
    judgement_wcomponent = void 0;
  let target_wcomponent = void 0;
  let target_counterfactuals = void 0;
  if (judgement_wcomponent) {
    const target_id = judgement_wcomponent.judgement_target_wcomponent_id;
    target_wcomponent = get_wcomponent_from_state(state, target_id);
    target_counterfactuals = get_wcomponent_counterfactuals(state, target_id);
  }
  const kv = get_current_composed_knowledge_view_from_state(state);
  const position = kv ? kv.composed_wc_id_map[own_props.judgement_or_objective_id] : void 0;
  return {
    judgement_wcomponent,
    target_wcomponent,
    target_counterfactuals,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    position
  };
};
const connector = connect(map_state);
function _JudgementBadgeConnected(props) {
  const {judgement_or_objective_id: judgement_id, judgement_wcomponent, target_wcomponent, target_counterfactuals, created_at_ms, sim_ms, position} = props;
  if (!judgement_wcomponent || !target_wcomponent)
    return null;
  const judgement_value = calculate_judgement_value({judgement_wcomponent, target_wcomponent, target_counterfactuals, created_at_ms, sim_ms});
  return /* @__PURE__ */ h(JudgementBadge, {
    judgement: judgement_value,
    judgement_or_objective_id: judgement_id,
    position
  });
}
export const JudgementBadgeConnected = connector(_JudgementBadgeConnected);
