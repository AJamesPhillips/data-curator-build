import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {
  partition_and_prune_items_by_datetimes_and_versions
} from "../../wcomponent_derived/value_and_prediction/partition_and_prune_items_by_datetimes_and_versions.js";
import {ACTIONS} from "../../state/actions.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
import {ValueAndPredictionSetsComponent} from "./ValueAndPredictionSetsComponent.js";
import {handle_update_VAP_sets} from "./handle_update_VAP_sets.js";
const map_state = (state) => {
  return {
    current_created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting,
    base_id: selector_chosen_base_id(state) || -1
  };
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ValueAndPredictionSets(props) {
  const {
    wcomponent_id,
    existing_value_possibilities,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    VAPs_represent,
    base_id,
    current_created_at_ms,
    sim_ms,
    update_VAPSets_and_value_possibilities,
    change_route
  } = props;
  const {invalid_future_items, past_items, present_item, future_items, previous_versions_by_id} = partition_and_prune_items_by_datetimes_and_versions({
    items: orig_values_and_prediction_sets,
    created_at_ms: props.current_created_at_ms,
    sim_ms
  });
  return /* @__PURE__ */ h(ValueAndPredictionSetsComponent, {
    wcomponent_id,
    item_descriptor: "Value Prediction",
    VAPs_represent,
    update_values_and_predictions: (new_values_and_prediction_sets) => {
      handle_update_VAP_sets({
        existing_value_possibilities,
        new_values_and_prediction_sets,
        orig_values_and_prediction_sets,
        current_created_at_ms,
        sim_ms,
        update_VAPSets_and_value_possibilities,
        change_route
      });
    },
    existing_value_possibilities: props.existing_value_possibilities,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    invalid_future_items,
    past_items,
    present_item,
    future_items,
    previous_versions_by_id,
    base_id,
    creation_context: props.creation_context,
    editing: props.editing
  });
}
export const ValueAndPredictionSets = connector(_ValueAndPredictionSets);
