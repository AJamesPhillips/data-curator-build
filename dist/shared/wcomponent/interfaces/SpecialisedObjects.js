export const connection_terminal_attributes = ["meta", "validity", "state"];
export const connection_terminal_directions = ["from", "to"];
export function wcomponent_is_event(wcomponent) {
  return wcomponent.type === "event";
}
export function wcomponent_is_state(wcomponent) {
  if (!wcomponent)
    return false;
  return wcomponent.type === "state" || wcomponent.type === "statev2";
}
export function wcomponent_is_statev1(wcomponent) {
  return wcomponent.type === "state";
}
export function wcomponent_is_statev2(wcomponent) {
  if (!wcomponent)
    return false;
  return wcomponent.type === "statev2";
}
export function wcomponent_is_process(wcomponent) {
  return wcomponent.type === "process";
}
export function wcomponent_is_action(wcomponent) {
  return wcomponent.type === "action";
}
function wcomponent_is_a(type, wcomponent, log_error_id = "") {
  let yes = false;
  if (!wcomponent) {
    if (log_error_id) {
      console.error(`wcomponent with id "${log_error_id}" does not exist`);
    }
  } else if (wcomponent.type !== type) {
    if (log_error_id) {
      console.error(`wcomponent with id "${log_error_id}" is not a ${type}`);
    }
  } else
    yes = true;
  return yes;
}
export function wcomponent_is_goal(wcomponent) {
  return wcomponent_is_a("goal", wcomponent);
}
export function alert_wcomponent_is_goal(wcomponent, log_error_id) {
  return wcomponent_is_a("goal", wcomponent, log_error_id);
}
export function wcomponent_is_prioritisation(wcomponent) {
  return wcomponent_is_a("prioritisation", wcomponent);
}
export function alert_wcomponent_is_prioritisation(wcomponent, log_error_id) {
  return wcomponent_is_a("prioritisation", wcomponent, log_error_id);
}
export function wcomponent_is_causal_link(wcomponent) {
  return wcomponent.type === "causal_link";
}
function wcomponent_is_relation_link(wcomponent) {
  return wcomponent.type === "relation_link";
}
export function wcomponent_is_plain_connection(wcomponent) {
  return wcomponent_is_causal_link(wcomponent) || wcomponent_is_relation_link(wcomponent);
}
export function wcomponent_is_judgement_or_objective(wcomponent) {
  return wcomponent_is_a("judgement", wcomponent) || wcomponent_is_a("objective", wcomponent);
}
export function alert_wcomponent_is_judgement_or_objective(wcomponent, log_error_id) {
  const result = wcomponent_is_a("judgement", wcomponent) || wcomponent_is_a("objective", wcomponent);
  if (!result && log_error_id) {
    if (!wcomponent)
      console.error(`wcomponent with id "${log_error_id}" does not exist`);
    else
      console.error(`wcomponent with id "${log_error_id}" is not a judgement or objective`);
  }
  return result;
}
export function wcomponent_is_objective(wcomponent) {
  return wcomponent.type === "objective";
}
export function wcomponent_is_counterfactual(wcomponent, log_error_id = "") {
  return wcomponent_is_a("counterfactual", wcomponent, log_error_id);
}
export function wcomponent_is_counterfactual_v2(wcomponent, log_error_id = "") {
  return wcomponent_is_a("counterfactualv2", wcomponent, log_error_id);
}
export function wcomponent_can_render_connection(wcomponent) {
  return wcomponent_is_plain_connection(wcomponent);
}
export function wcomponent_has_event_at(wcomponent) {
  return wcomponent.event_at !== void 0;
}
export function wcomponent_has_validity_predictions(wcomponent) {
  const {validity} = wcomponent;
  return validity !== void 0 && validity.length > 0;
}
const types_without_validity = new Set([
  "prioritisation",
  "counterfactual"
]);
export function wcomponent_can_have_validity_predictions(wcomponent) {
  return !types_without_validity.has(wcomponent.type);
}
export function wcomponent_has_existence_predictions(wcomponent) {
  return wcomponent.existence !== void 0;
}
export function wcomponent_has_statev1_values(wcomponent) {
  return wcomponent.values !== void 0;
}
export function wcomponent_has_VAP_sets(wcomponent) {
  return wcomponent.values_and_prediction_sets !== void 0;
}
export function wcomponent_has_started_stopped_at(wcomponent) {
  return wcomponent.started_at !== void 0 || wcomponent.stopped_at !== void 0;
}
export function wcomponent_should_have_state(wcomponent) {
  return wcomponent_is_state(wcomponent) || wcomponent_should_have_state_VAP_sets(wcomponent);
}
export function wcomponent_should_have_state_VAP_sets(wcomponent) {
  return wcomponent_is_statev2(wcomponent) || wcomponent_is_causal_link(wcomponent) || wcomponent_is_action(wcomponent);
}
export function wcomponent_has_legitimate_non_empty_statev1(wcomponent) {
  return wcomponent_has_statev1_values(wcomponent) && wcomponent.values.length > 0 && wcomponent_is_statev1(wcomponent);
}
export function wcomponent_has_legitimate_non_empty_VAP_sets(wcomponent) {
  return wcomponent_has_VAP_sets(wcomponent) && wcomponent.values_and_prediction_sets.length > 0 && wcomponent_should_have_state_VAP_sets(wcomponent);
}
export function wcomponent_has_legitimate_non_empty_state(wcomponent) {
  return wcomponent_has_legitimate_non_empty_VAP_sets(wcomponent);
}
const _specialised_objects_from_to_server_expected_keys = {
  perceptions: true,
  wcomponents: true,
  knowledge_views: true
};
export const specialised_objects_from_to_server_expected_keys = Object.keys(_specialised_objects_from_to_server_expected_keys);
