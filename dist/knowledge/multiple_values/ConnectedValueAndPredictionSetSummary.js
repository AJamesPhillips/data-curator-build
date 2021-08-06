import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ValueAndPredictionSetSummary} from "./ValueAndPredictionSetSummary.js";
import {get_counterfactual_v2_VAP_set} from "../../shared/wcomponent/value_and_prediction/get_value_v2.js";
import {
  get_props_for_get_counterfactual_v2_VAP_set
} from "../../state/specialised_objects/counterfactuals/get_props_for_state_v2.js";
const map_state = (state, own_props) => {
  return get_props_for_get_counterfactual_v2_VAP_set(own_props.wcomponent, state);
};
const connector = connect(map_state);
function _ConnectedValueAndPredictionSetSummary(props) {
  const counterfactual_VAP_set = get_counterfactual_v2_VAP_set(props);
  return /* @__PURE__ */ h(ValueAndPredictionSetSummary, {
    wcomponent: props.wcomponent,
    counterfactual_VAP_set
  });
}
export const ConnectedValueAndPredictionSetSummary = connector(_ConnectedValueAndPredictionSetSummary);
