import {
  clean_base_object_of_sync_meta_fields
} from "../../state/sync/supabase/clean_base_object_for_supabase.js";
import {get_new_VAP_id} from "../../shared/utils/ids.js";
import {
  wcomponent_has_validity_predictions,
  wcomponent_has_VAP_sets,
  wcomponent_has_event_at,
  wcomponent_is_plain_connection,
  wcomponent_is_process,
  wcomponent_has_existence_predictions,
  wcomponent_is_action,
  wcomponent_is_goal
} from "../interfaces/SpecialisedObjects.js";
import {parse_base_dates} from "./parse_dates.js";
export function parse_wcomponent(wcomponent) {
  wcomponent = clean_base_object_of_sync_meta_fields(wcomponent);
  wcomponent = upgrade_2021_05_19_process_actions(wcomponent);
  wcomponent = upgrade_2021_05_19_existence_predictions(wcomponent);
  wcomponent = upgrade_2021_05_24_action(wcomponent);
  wcomponent = upgrade_2021_06_12_goal(wcomponent);
  wcomponent = {
    ...parse_base_dates(wcomponent)
  };
  if (wcomponent_has_validity_predictions(wcomponent)) {
    wcomponent.validity = wcomponent.validity.map(parse_prediction);
  }
  if (wcomponent_has_VAP_sets(wcomponent)) {
    const VAP_sets = wcomponent.values_and_prediction_sets;
    wcomponent.values_and_prediction_sets = VAP_sets && VAP_sets.map(parse_values_and_predictions_set);
  }
  if (wcomponent_has_event_at(wcomponent)) {
    wcomponent.event_at = wcomponent.event_at.map(parse_base_dates);
  }
  if (wcomponent_is_plain_connection(wcomponent)) {
    wcomponent.from_type = upgrade_2021_05_19_connection_fromto_types(wcomponent.from_type);
    wcomponent.to_type = upgrade_2021_05_19_connection_fromto_types(wcomponent.to_type);
    wcomponent.from_type = upgrade_2021_05_31_connection_fromto_types(wcomponent.from_type);
    wcomponent.to_type = upgrade_2021_05_31_connection_fromto_types(wcomponent.to_type);
  }
  return wcomponent;
}
function upgrade_2021_05_19_connection_fromto_types(type) {
  if (type === "meta-effector")
    return "meta";
  if (type === "meta-effected")
    return "meta";
  if (type === "effector")
    return "state";
  if (type === "effected")
    return "state";
  return type || "state";
}
function upgrade_2021_05_31_connection_fromto_types(type) {
  if (type === "value")
    return "state";
  return type || "state";
}
function upgrade_2021_05_19_process_actions(wcomponent) {
  if (!wcomponent_is_process(wcomponent) || !wcomponent.is_action)
    return wcomponent;
  const wcomponent_action = {
    ...wcomponent,
    is_action: void 0,
    type: "action"
  };
  return wcomponent_action;
}
function upgrade_2021_05_19_existence_predictions(wcomponent) {
  if (!wcomponent_has_existence_predictions(wcomponent))
    return wcomponent;
  wcomponent.existence = wcomponent.existence.map(parse_prediction);
  if (wcomponent_has_VAP_sets(wcomponent))
    return wcomponent;
  const values_and_prediction_sets = wcomponent.existence.map((e) => {
    const vap_set = {
      id: e.id.replace("pr", "vps"),
      created_at: e.created_at,
      base_id: e.base_id,
      custom_created_at: e.custom_created_at,
      datetime: e.datetime || {},
      entries: [
        {
          id: get_new_VAP_id(),
          value: "",
          description: "",
          explanation: e.explanation,
          probability: e.probability,
          conviction: e.conviction
        }
      ]
    };
    return vap_set;
  });
  const upgraded_wcomponent = {
    ...wcomponent,
    existence: void 0,
    values_and_prediction_sets
  };
  return upgraded_wcomponent;
}
function upgrade_2021_05_24_action(wcomponent) {
  if (wcomponent_is_action(wcomponent)) {
    const depends_on_action_ids = wcomponent.depends_on_action_ids || [];
    wcomponent = {...wcomponent, depends_on_action_ids};
  }
  return wcomponent;
}
function upgrade_2021_06_12_goal(wcomponent) {
  if (wcomponent_is_goal(wcomponent)) {
    const objective_ids = wcomponent.objective_ids || [];
    wcomponent = {...wcomponent, objective_ids};
  }
  return wcomponent;
}
const parse_prediction = (prediction) => parse_base_dates(prediction);
const parse_values_and_predictions_set = (VAP_set) => parse_base_dates(VAP_set);
