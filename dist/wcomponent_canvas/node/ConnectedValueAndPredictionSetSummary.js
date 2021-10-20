import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_VAP_set_id_to_counterfactual_v2_map} from "../../state/derived/accessor.js";
import {
  get_VAP_id_to_counterfactuals_info_map
} from "../../wcomponent_derived/counterfactuals/get_VAP_id_to_counterfactuals_info_map.js";
import {
  apply_counterfactuals_v2_to_VAP_set
} from "../../wcomponent_derived/value_and_prediction/apply_counterfactuals_v2_to_VAP_set.js";
import {ValueAndPredictionSetSummary} from "./ValueAndPredictionSetSummary.js";
const map_state = (state, own_props) => {
  const VAP_set_id_to_counterfactual_v2_map = get_VAP_set_id_to_counterfactual_v2_map(state, own_props.wcomponent.id);
  return {
    VAP_set_id_to_counterfactual_v2_map,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
  };
};
const connector = connect(map_state);
function _ConnectedValueAndPredictionSetSummary(props) {
  const {wcomponent, VAP_set, VAP_set_id_to_counterfactual_v2_map, knowledge_views_by_id} = props;
  const counterfactual_VAP_set = apply_counterfactuals_v2_to_VAP_set({
    VAP_set,
    VAP_set_id_to_counterfactual_v2_map
  });
  const VAP_id_to_counterfactuals_info_map = get_VAP_id_to_counterfactuals_info_map({
    VAP_set,
    VAP_set_id_to_counterfactual_v2_map,
    knowledge_views_by_id
  });
  return /* @__PURE__ */ h(ValueAndPredictionSetSummary, {
    wcomponent,
    counterfactual_VAP_set,
    VAP_id_to_counterfactuals_info_map
  });
}
export const ConnectedValueAndPredictionSetSummary = connector(_ConnectedValueAndPredictionSetSummary);
