import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {get_wcomponent_state_UI_value} from "../shared/wcomponent/get_wcomponent_state_UI_value.js";
import {
  wcomponent_is_judgement_or_objective,
  wcomponent_should_have_state
} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_counterfactuals} from "../state/derived/accessor.js";
import {calculate_judgement_value} from "./judgements/calculate_judgement_value.js";
import {JudgementBadge} from "./judgements/JudgementBadge.js";
import {DisplayValue} from "./multiple_values/DisplayValue.js";
import {get_wcomponent_from_state} from "../state/specialised_objects/accessors.js";
const map_state = (state, own_props) => {
  const {created_at_ms, sim_ms} = state.routing.args;
  const {wcomponent} = own_props;
  let wc_counterfactuals;
  let target_wcomponent = void 0;
  if (wcomponent_is_judgement_or_objective(wcomponent)) {
    const target_id = wcomponent.judgement_target_wcomponent_id;
    target_wcomponent = get_wcomponent_from_state(state, target_id);
    wc_counterfactuals = get_wcomponent_counterfactuals(state, target_id);
  } else {
    wc_counterfactuals = get_wcomponent_counterfactuals(state, wcomponent.id);
  }
  return {wc_counterfactuals, created_at_ms, sim_ms, target_wcomponent};
};
const connector = connect(map_state);
function _WComponentStatefulValue(props) {
  const {ui_value, judgement_value, is_judgement, is_empty} = process_props(props);
  const value_to_render = is_judgement ? /* @__PURE__ */ h(JudgementBadge, {
    judgement: judgement_value
  }) : ui_value && /* @__PURE__ */ h(DisplayValue, {
    UI_value: ui_value
  });
  return /* @__PURE__ */ h("div", {
    className: "node_state_value",
    style: {display: is_empty ? "none" : ""}
  }, value_to_render);
}
export const WComponentStatefulValue = connector(_WComponentStatefulValue);
function process_props(props) {
  let ui_value = void 0;
  let judgement_value = void 0;
  let is_judgement = false;
  let is_empty = false;
  const {wcomponent, wc_counterfactuals, created_at_ms, sim_ms, target_wcomponent} = props;
  if (wcomponent_should_have_state(wcomponent)) {
    ui_value = get_wcomponent_state_UI_value({wcomponent, wc_counterfactuals, created_at_ms, sim_ms});
  } else if (wcomponent_is_judgement_or_objective(wcomponent)) {
    is_judgement = true;
    judgement_value = calculate_judgement_value({judgement_wcomponent: wcomponent, target_wcomponent, target_counterfactuals: wc_counterfactuals, created_at_ms, sim_ms});
  } else {
    is_empty = true;
  }
  return {ui_value, judgement_value, is_judgement, is_empty};
}
