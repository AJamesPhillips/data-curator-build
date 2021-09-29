import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ValueAndPredictionSetsComponent} from "./ValueAndPredictionSetsComponent.js";
import {get_wcomponent_VAP_set_counterfactuals} from "../../state/derived/accessor.js";
import {partition_and_prune_items_by_datetimes_and_versions} from "../../shared/wcomponent/value_and_prediction/utils.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
const map_state = (state, own_props) => {
  const VAP_set_counterfactuals_map = get_wcomponent_VAP_set_counterfactuals(state, own_props.wcomponent_id);
  return {
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    VAP_set_counterfactuals_map,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting,
    base_id: selector_chosen_base_id(state)
  };
};
const connector = connect(map_state);
function _ValueAndPredictionSets(props) {
  const {
    wcomponent_id,
    VAP_set_counterfactuals_map,
    values_and_prediction_sets,
    VAPs_represent,
    base_id = -1
  } = props;
  const {invalid_future_items, past_items, present_items, future_items, previous_versions_by_id} = partition_and_prune_items_by_datetimes_and_versions({
    items: values_and_prediction_sets,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h(ValueAndPredictionSetsComponent, {
    wcomponent_id,
    VAP_set_counterfactuals_map,
    item_descriptor: "Value",
    VAPs_represent,
    update_items: props.update_values_and_predictions,
    values_and_prediction_sets,
    invalid_future_items,
    past_items,
    present_items,
    future_items,
    previous_versions_by_id,
    base_id,
    creation_context: props.creation_context,
    editing: props.editing
  });
}
export const ValueAndPredictionSets = connector(_ValueAndPredictionSets);
