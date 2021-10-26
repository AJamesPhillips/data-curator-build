import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_created_at_ms} from "../../shared/utils_datetime/utils_datetime.js";
import {
  partition_and_prune_items_by_datetimes_and_versions
} from "../../wcomponent_derived/value_and_prediction/partition_and_prune_items_by_datetimes_and_versions.js";
import {ACTIONS} from "../../state/actions.js";
import {selector_chosen_base_id} from "../../state/user_info/selector.js";
import {ValueAndPredictionSetsComponent} from "./ValueAndPredictionSetsComponent.js";
import {update_value_possibilities_with_VAPSets} from "../../wcomponent/CRUD_helpers/update_possibilities_with_VAPSets.js";
import {get_uncertain_datetime} from "../../shared/uncertainty/datetime.js";
const map_state = (state) => {
  return {
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting,
    base_id: selector_chosen_base_id(state),
    current_created_at_ms: state.routing.args.created_at_ms
  };
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ValueAndPredictionSets(props) {
  const {
    wcomponent_id,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    VAPs_represent,
    base_id = -1,
    current_created_at_ms,
    change_route
  } = props;
  const {invalid_future_items, past_items, present_item, future_items, previous_versions_by_id} = partition_and_prune_items_by_datetimes_and_versions({
    items: orig_values_and_prediction_sets,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h(ValueAndPredictionSetsComponent, {
    wcomponent_id,
    item_descriptor: "Value Prediction",
    VAPs_represent,
    update_values_and_predictions: (new_values_and_prediction_sets) => {
      const value_possibilities = update_value_possibilities_with_VAPSets(props.existing_value_possibilities, new_values_and_prediction_sets);
      props.update_values_and_predictions({
        value_possibilities,
        values_and_prediction_sets: new_values_and_prediction_sets
      });
      const orig_latest_datetimes_ms = get_latest_VAP_set_datetimes_ms(orig_values_and_prediction_sets, current_created_at_ms);
      const new_latest_datetimes_ms = get_latest_VAP_set_datetimes_ms(new_values_and_prediction_sets, current_created_at_ms);
      const _1_minute = 1 * 60 * 1e3;
      const _10_minutes = 10 * _1_minute;
      if (new_latest_datetimes_ms.latest_created_at_ms > orig_latest_datetimes_ms.latest_created_at_ms) {
        const created_at_ms = new_latest_datetimes_ms.latest_created_at_ms + _1_minute;
        change_route({args: {created_at_ms}});
      }
      const current_ms = new Date().getTime();
      const sim_ms = new_latest_datetimes_ms.latest_sim_ms;
      const sim_ms_is_current = sim_ms < current_ms + _1_minute && sim_ms > current_ms - _10_minutes;
      if (props.sim_ms < sim_ms && sim_ms_is_current) {
        change_route({args: {sim_ms}});
      }
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
function get_latest_VAP_set_datetimes_ms(values_and_prediction_sets, latest_created_at_ms = 0) {
  let latest_sim_ms = Number.NEGATIVE_INFINITY;
  values_and_prediction_sets.forEach((VAP_set) => {
    latest_created_at_ms = Math.max(get_created_at_ms(VAP_set), latest_created_at_ms);
    const sim_datetime = get_uncertain_datetime(VAP_set.datetime);
    if (sim_datetime)
      latest_sim_ms = Math.max(sim_datetime.getTime(), latest_sim_ms);
  });
  return {latest_created_at_ms, latest_sim_ms};
}
