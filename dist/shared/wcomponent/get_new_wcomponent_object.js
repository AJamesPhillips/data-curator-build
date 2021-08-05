import {get_new_created_ats} from "../utils/datetime.js";
import {date2str_auto} from "../utils/date_helpers.js";
import {get_new_wcomponent_id} from "../utils/ids.js";
export function get_contextless_new_wcomponent_object(partial_wcomponent) {
  const base = {
    id: get_new_wcomponent_id(),
    created_at: new Date(),
    title: "",
    description: "",
    type: "process"
  };
  const when = partial_wcomponent.custom_created_at || partial_wcomponent.created_at || base.custom_created_at || base.created_at;
  let wcomponent;
  if (partial_wcomponent.type === "causal_link" || partial_wcomponent.type === "relation_link") {
    const causal_link = {
      from_id: "",
      to_id: "",
      from_type: "state",
      to_type: "state",
      ...base,
      ...partial_wcomponent,
      type: partial_wcomponent.type
    };
    wcomponent = causal_link;
  } else if (partial_wcomponent.type === "judgement" || partial_wcomponent.type === "objective") {
    const judgement = {
      judgement_target_wcomponent_id: "",
      judgement_operator: "!=",
      judgement_comparator_value: "",
      judgement_manual: void 0,
      ...base,
      ...partial_wcomponent,
      type: partial_wcomponent.type
    };
    wcomponent = judgement;
  } else if (partial_wcomponent.type === "statev2") {
    const statev2 = {
      ...base,
      subtype: "boolean",
      values_and_prediction_sets: [],
      ...partial_wcomponent,
      type: partial_wcomponent.type
    };
    wcomponent = statev2;
  } else if (partial_wcomponent.type === "prioritisation") {
    const prioritisation = {
      ...base,
      title: date2str_auto({date: when, time_resolution: "day"}),
      goals: {},
      datetime: {min: when},
      ...partial_wcomponent,
      type: partial_wcomponent.type
    };
    wcomponent = prioritisation;
  } else if (partial_wcomponent.type === "goal") {
    const goal = {
      ...base,
      ...partial_wcomponent,
      objective_ids: [],
      type: partial_wcomponent.type
    };
    wcomponent = goal;
  } else {
    const node = {
      ...base,
      ...partial_wcomponent,
      type: partial_wcomponent.type || "process"
    };
    wcomponent = node;
  }
  return wcomponent;
}
export function get_new_wcomponent_object(partial_wcomponent, creation_context) {
  let wcomponent = {
    ...get_contextless_new_wcomponent_object(partial_wcomponent),
    ...get_new_created_ats(creation_context)
  };
  wcomponent = set_creation_context_label_ids(wcomponent, creation_context);
  return wcomponent;
}
function set_creation_context_label_ids(wcomponent, creation_context) {
  const cc = creation_context.creation_context;
  const additional_labels = creation_context.use_creation_context && cc && cc.label_ids || [];
  const existing_label_ids_list = wcomponent.label_ids || [];
  const existing_label_ids = new Set(existing_label_ids_list);
  additional_labels.forEach((id) => existing_label_ids.has(id) ? "" : existing_label_ids_list.push(id));
  return {...wcomponent, label_ids: existing_label_ids_list};
}
