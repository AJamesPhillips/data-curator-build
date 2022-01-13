import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {wcomponent_is_judgement_or_objective} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {core_calculate_judgement_value} from "./calculate_judgement_value.js";
import {JudgementBadge} from "./JudgementBadge.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../../state/specialised_objects/accessors.js";
const map_state = (state, own_props) => {
  let judgement_wcomponent = get_wcomponent_from_state(state, own_props.judgement_or_objective_id);
  if (!wcomponent_is_judgement_or_objective(judgement_wcomponent))
    judgement_wcomponent = void 0;
  const kv = get_current_composed_knowledge_view_from_state(state);
  const position = kv ? kv.composed_wc_id_map[own_props.judgement_or_objective_id] : void 0;
  return {
    judgement_wcomponent,
    position
  };
};
const connector = connect(map_state);
function _JudgementBadgeSimple(props) {
  const {judgement_or_objective_id, judgement_wcomponent, position, target_VAPs_represent, value} = props;
  if (!judgement_wcomponent)
    return null;
  const judgement_value = core_calculate_judgement_value({judgement_wcomponent, target_VAPs_represent, value});
  return /* @__PURE__ */ h(JudgementBadge, {
    judgement: judgement_value,
    judgement_trend_manual: props.hide_judgement_trend ? void 0 : judgement_wcomponent.judgement_trend_manual,
    judgement_or_objective_id,
    position,
    size: props.hide_judgement_trend ? "small" : "medium"
  });
}
export const JudgementBadgeSimple = connector(_JudgementBadgeSimple);
