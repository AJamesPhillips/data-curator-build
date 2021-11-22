import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {wcomponent_should_have_state_VAP_sets} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {ConnectedValueAndPredictionSetSummary} from "./ConnectedValueAndPredictionSetSummary.js";
import {NodeValueAndPredictionSetSummary} from "./NodeValueAndPredictionSetSummary.js";
import {get_VAP_id_to_counterfactuals_info_map} from "../../wcomponent_derived/counterfactuals/get_VAP_id_to_counterfactuals_info_map.js";
import {apply_counterfactuals_v2_to_VAP_set} from "../../wcomponent_derived/value_and_prediction/apply_counterfactuals_v2_to_VAP_set.js";
import {get_VAP_set_id_to_counterfactual_v2_map} from "../../state/derived/accessor.js";
import {convert_VAP_set_to_VAP_visuals} from "../../wcomponent_derived/value_and_prediction/convert_VAP_set_to_VAP_visuals.js";
import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {predicate_target_value_possibility} from "../../wcomponent_derived/sub_state/convert_VAP_sets_to_visual_sub_state_value_possibilities.js";
import {ValueAndPredictionEntryRow} from "./ValueAndPredictionEntryRow.js";
import {ratio_to_percentage_string} from "../../sharedf/percentages.js";
import {prune_items_by_created_at_and_versions} from "../../wcomponent_derived/value_and_prediction/partition_and_prune_items_by_datetimes_and_versions.js";
const map_state = (state, own_props) => {
  const {target_wcomponent_id} = own_props.wcomponent;
  const maybe_target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wcomponent_id || ""];
  const target_wcomponent = wcomponent_should_have_state_VAP_sets(maybe_target_wcomponent) && maybe_target_wcomponent;
  const VAP_set_id_to_counterfactual_v2_map = get_VAP_set_id_to_counterfactual_v2_map(state, target_wcomponent_id);
  return {
    target_wcomponent,
    VAP_set_id_to_counterfactual_v2_map,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id
  };
};
const connector = connect(map_state);
function _NodeSubStateSummary(props) {
  const {target_wcomponent, VAP_set_id_to_counterfactual_v2_map, knowledge_views_by_id} = props;
  if (!target_wcomponent)
    return null;
  const {selector} = props.wcomponent;
  const {target_VAP_set_id, target_value_id_type, target_value} = selector || {};
  const have_target_value = target_value_id_type !== void 0 && target_value !== void 0;
  let target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
  const VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent);
  if (target_VAP_set_id === void 0) {
    if (!have_target_value) {
      return /* @__PURE__ */ h(NodeValueAndPredictionSetSummary, {
        wcomponent: target_wcomponent,
        created_at_ms: props.created_at_ms,
        sim_ms: props.sim_ms
      });
    } else if (target_value_id_type === void 0 || target_value === void 0)
      return null;
    else {
      return null;
    }
  }
  target_VAP_sets = target_VAP_sets.filter(({id}) => id === target_VAP_set_id);
  target_VAP_sets = prune_items_by_created_at_and_versions(target_VAP_sets, props.created_at_ms);
  const target_VAP_set = target_VAP_sets[0];
  if (!target_VAP_set)
    return /* @__PURE__ */ h("div", null, "Invalid configuration");
  if (!have_target_value) {
    return /* @__PURE__ */ h(ConnectedValueAndPredictionSetSummary, {
      wcomponent: target_wcomponent,
      VAP_set: target_VAP_set
    });
  }
  const counterfactual_VAP_set = apply_counterfactuals_v2_to_VAP_set({
    VAP_set: target_VAP_set,
    VAP_set_id_to_counterfactual_v2_map
  });
  const VAP_id_to_counterfactuals_info_map = get_VAP_id_to_counterfactuals_info_map({
    VAP_set: target_VAP_set,
    VAP_set_id_to_counterfactual_v2_map,
    knowledge_views_by_id
  });
  const VAP_visuals_data = convert_VAP_set_to_VAP_visuals({...props, VAP_set: counterfactual_VAP_set, VAPs_represent});
  let VAP_visual = VAP_visuals_data.find(({value_id, value_text: value_text2}) => predicate_target_value_possibility({
    target_value_id_type,
    target_value,
    value_id,
    value_text: value_text2
  }));
  if (!VAP_visual)
    return /* @__PURE__ */ h("div", null, "Invalid configuration");
  let {value_text} = VAP_visual;
  value_text = ` ${ratio_to_percentage_string(VAP_visual.certainty)}%`;
  VAP_visual = {...VAP_visual, value_text, certainty: 1};
  return /* @__PURE__ */ h(ValueAndPredictionEntryRow, {
    wcomponent: target_wcomponent,
    VAP_visual,
    show_judgements: true,
    counterfactual_VAP_set,
    VAP_id_to_counterfactuals_info_map
  });
}
export const NodeSubStateSummary = connector(_NodeSubStateSummary);
