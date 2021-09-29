import {rescale} from "../shared/utils/bounded.js";
import {
  get_wcomponent_validity_value
} from "../shared/wcomponent/get_wcomponent_validity_value.js";
import {Tense} from "../shared/wcomponent/interfaces/datetime.js";
import {
  wcomponent_has_event_at,
  wcomponent_is_judgement_or_objective
} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {get_tense_of_uncertain_datetime} from "../shared/utils_datetime/get_tense_of_uncertain_datetime.js";
export function calc_wcomponent_should_display(args) {
  const {is_editing, force_displaying, is_selected, wcomponent, sim_ms, wc_ids_excluded_by_filters} = args;
  if (force_displaying || is_selected)
    return {display_certainty: 1};
  if (wc_ids_excluded_by_filters.has(wcomponent.id))
    return false;
  const is_not_created = wcomponent_is_not_yet_created(wcomponent, args.created_at_ms);
  if (is_not_created)
    return false;
  if (!is_editing && !is_selected && wcomponent_is_judgement_or_objective(wcomponent))
    return false;
  const validity_value = get_wcomponent_validity_value(args);
  const is_invalid_for_display = get_wcomponent_is_invalid_for_display({
    validity_value,
    validity_filter: args.validity_filter
  });
  if (is_invalid_for_display)
    return false;
  let certainty = validity_value.certainty;
  if (wcomponent_has_event_at(wcomponent)) {
    const event_certainty = get_certainty_for_wcomponent_event_at({event_at: wcomponent.event_at, sim_ms});
    if (event_certainty !== void 0)
      certainty = Math.min(certainty, event_certainty);
  }
  return {display_certainty: certainty};
}
function wcomponent_is_not_yet_created(wcomponent, display_at_datetime_ms) {
  return get_created_at_ms(wcomponent) > display_at_datetime_ms;
}
function get_wcomponent_is_invalid_for_display(args) {
  let should_display = false;
  const {validity_filter: filter} = args;
  const {certainty} = args.validity_value;
  if (filter.show_invalid)
    should_display = true;
  else if (filter.maybe_invalid)
    should_display = certainty > 0;
  else if (filter.only_maybe_valid)
    should_display = certainty > 0.5;
  else if (filter.only_certain_valid)
    should_display = certainty === 1;
  else
    console.error("Unsupported validity_filter: " + JSON.stringify(filter));
  return !should_display;
}
function get_certainty_for_wcomponent_event_at(args) {
  const {event_at, sim_ms} = args;
  const event_prediction = event_at[0];
  if (!event_prediction)
    return void 0;
  const tense = get_tense_of_uncertain_datetime(event_prediction, sim_ms);
  return tense === Tense.future ? 0 : 1;
}
export function calc_connection_wcomponent_should_display(args) {
  const {from_wc, to_wc} = args;
  if (!from_wc || !to_wc)
    return false;
  const connection_validity_value = calc_wcomponent_should_display(args);
  if (!connection_validity_value)
    return false;
  const from_node_validity_value = calc_wcomponent_should_display({...args, wcomponent: from_wc});
  if (!from_node_validity_value)
    return false;
  const to_node_validity_value = calc_wcomponent_should_display({...args, wcomponent: to_wc});
  if (!to_node_validity_value)
    return false;
  const connection_certainty = Math.min(connection_validity_value.display_certainty, from_node_validity_value.display_certainty, to_node_validity_value.display_certainty);
  return {
    display_certainty: connection_certainty
  };
}
export function calc_judgement_connection_wcomponent_should_display(args) {
  const {target_wc} = args;
  if (!target_wc)
    return false;
  const judgement_connection_validity_value = calc_wcomponent_should_display(args);
  if (!judgement_connection_validity_value)
    return false;
  const target_node_validity_value = calc_wcomponent_should_display({...args, wcomponent: target_wc});
  if (!target_node_validity_value)
    return false;
  const judgement_connection_certainty = Math.min(judgement_connection_validity_value.display_certainty, target_node_validity_value.display_certainty);
  return {
    display_certainty: judgement_connection_certainty
  };
}
export function calc_display_opacity(args) {
  if (args.is_editing || args.is_highlighted || args.is_selected || args.is_current_item)
    return 1;
  if (args.certainty_formatting.render_100_opacity && !args.focused_mode)
    return 1;
  if (args.focused_mode)
    return 0.2;
  const min50 = args.certainty_formatting.render_certainty_as_easier_opacity;
  return args.certainty === 1 ? 1 : min50 ? rescale(args.certainty, 0.4, 0.7) : rescale(args.certainty, 0.1, 0.5);
}
