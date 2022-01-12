import {get_uncertain_datetime} from "../../shared/uncertainty/datetime.js";
import {get_created_at_ms} from "../../shared/utils_datetime/utils_datetime.js";
import {prepare_new_VAP_set} from "../../wcomponent/CRUD_helpers/prepare_new_VAP_set.js";
import {
  update_value_possibilities_with_VAPSets
} from "../../wcomponent/CRUD_helpers/update_possibilities_with_VAPSets.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {update_VAP_set_VAP_probabilities} from "./update_VAP_set_VAP_probabilities.js";
export function set_action_VAP_set_state(args) {
  const {
    existing_value_possibilities,
    orig_values_and_prediction_sets,
    base_id,
    creation_context,
    action_value_possibility_id
  } = args;
  const new_VAP_set = prepare_new_VAP_set(VAPsType.action, existing_value_possibilities, orig_values_and_prediction_sets, base_id, creation_context);
  const entries = update_VAP_set_VAP_probabilities(new_VAP_set, action_value_possibility_id);
  new_VAP_set.entries = entries;
  const new_values_and_prediction_sets = [...orig_values_and_prediction_sets, new_VAP_set];
  return new_values_and_prediction_sets;
}
export function handle_update_VAP_sets(args) {
  const value_possibilities = update_value_possibilities_with_VAPSets(args.existing_value_possibilities, args.new_values_and_prediction_sets);
  args.update_VAPSets_and_value_possibilities({
    value_possibilities,
    values_and_prediction_sets: args.new_values_and_prediction_sets
  });
  const orig_latest_datetimes_ms = get_latest_VAP_set_datetimes_ms(args.orig_values_and_prediction_sets, args.current_created_at_ms);
  const new_latest_datetimes_ms = get_latest_VAP_set_datetimes_ms(args.new_values_and_prediction_sets, args.current_created_at_ms);
  const _1_minute = 1 * 60 * 1e3;
  const _10_minutes = 10 * _1_minute;
  if (new_latest_datetimes_ms.latest_created_at_ms > orig_latest_datetimes_ms.latest_created_at_ms) {
    const created_at_ms = new_latest_datetimes_ms.latest_created_at_ms + _1_minute;
    args.change_route({args: {created_at_ms}});
  }
  const current_ms = new Date().getTime();
  const sim_ms = new_latest_datetimes_ms.latest_sim_ms;
  const sim_ms_is_current = sim_ms < current_ms + _1_minute && sim_ms > current_ms - _10_minutes;
  if (args.sim_ms < sim_ms && sim_ms_is_current) {
    args.change_route({args: {sim_ms}});
  }
}
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
