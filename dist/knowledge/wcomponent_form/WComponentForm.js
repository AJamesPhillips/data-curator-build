import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {EditableCustomDateTime} from "../../form/EditableCustomDateTime.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {get_title} from "../../shared/wcomponent/rich_text/get_rich_text.js";
import {get_updated_wcomponent} from "../../shared/wcomponent/get_updated_wcomponent.js";
import {get_wcomponent_state_UI_value} from "../../shared/wcomponent/get_wcomponent_state_UI_value.js";
import {
  wcomponent_is_plain_connection,
  wcomponent_is_statev1,
  wcomponent_is_judgement_or_objective,
  wcomponent_is_statev2,
  wcomponent_has_existence_predictions,
  wcomponent_is_event,
  wcomponent_is_causal_link,
  wcomponent_should_have_state_VAP_sets,
  wcomponent_is_goal,
  wcomponent_can_have_validity_predictions,
  wcomponent_is_prioritisation,
  wcomponent_is_counterfactual_v2
} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {wcomponent_statev2_subtypes} from "../../shared/wcomponent/interfaces/state.js";
import {wcomponent_types} from "../../shared/wcomponent/interfaces/wcomponent_base.js";
import {ACTIONS} from "../../state/actions.js";
import {get_wc_id_counterfactuals_map} from "../../state/derived/accessor.js";
import {get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {DisplayValue} from "../multiple_values/DisplayValue.js";
import {ValueAndPredictionSets} from "../multiple_values/ValueAndPredictionSets.js";
import {PredictionList} from "../predictions/PredictionList.js";
import {ValueList} from "../values/ValueList.js";
import {WComponentFromTo} from "../WComponentFromTo.js";
import {WComponentKnowledgeViewForm} from "./WComponentKnowledgeViewForm.js";
import {WComponentLatestPrediction} from "../WComponentLatestPrediction.js";
import {JudgementFormFields} from "./JudgementFormFields.js";
import {useEffect, useRef} from "../../../snowpack/pkg/preact/hooks.js";
import {WComponentEventAtFormField} from "./WComponentEventAtFormField.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {wcomponent_VAPs_represent} from "../../shared/wcomponent/value_and_prediction/utils.js";
import {GoalFormFields} from "./GoalFormFields.js";
import {WComponentDateTimeFormField} from "./WComponentDateTimeFormField.js";
import {get_contextless_new_wcomponent_object} from "../../shared/wcomponent/get_new_wcomponent_object.js";
import {LabelsEditor} from "../../labels/LabelsEditor.js";
import {ColorPicker} from "../../sharedf/ColorPicker.js";
import {EditableCheckbox} from "../../form/EditableCheckbox.js";
import {WComponentCounterfactualForm} from "./WComponentCounterfactualForm.js";
import {WComponentCausalLinkForm} from "./WComponentCausalLinkForm.js";
import {Box, FormControl, FormLabel} from "../../../snowpack/pkg/@material-ui/core.js";
const map_state = (state, {wcomponent}) => {
  let from_wcomponent = void 0;
  let to_wcomponent = void 0;
  if (wcomponent_is_plain_connection(wcomponent)) {
    from_wcomponent = get_wcomponent_from_state(state, wcomponent.from_id);
    to_wcomponent = get_wcomponent_from_state(state, wcomponent.to_id);
  }
  const wc_id_counterfactuals_map = get_wc_id_counterfactuals_map(state);
  return {
    ready: state.sync.ready_for_reading,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    wc_id_counterfactuals_map,
    from_wcomponent,
    to_wcomponent,
    editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    creation_context: state.creation_context
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent,
  delete_wcomponent: ACTIONS.specialised_object.delete_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _WComponentForm(props) {
  const previous_id = useRef(void 0);
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  const {
    wcomponent,
    wcomponents_by_id,
    wc_id_counterfactuals_map,
    from_wcomponent,
    to_wcomponent,
    editing,
    created_at_ms,
    sim_ms,
    creation_context
  } = props;
  const wcomponent_id = wcomponent.id;
  const wc_counterfactuals = wc_id_counterfactuals_map && wc_id_counterfactuals_map[wcomponent_id];
  useEffect(() => {
    previous_id.current = wcomponent_id;
  }, [wcomponent_id]);
  const upsert_wcomponent = (partial_wcomponent) => {
    const updated = get_updated_wcomponent(wcomponent, partial_wcomponent).wcomponent;
    props.upsert_wcomponent({wcomponent: updated});
  };
  const orig_validity_predictions = wcomponent_can_have_validity_predictions(wcomponent) ? wcomponent.validity || [] : void 0;
  const VAPs_represent = wcomponent_VAPs_represent(wcomponent);
  let UI_value = void 0;
  let orig_values_and_prediction_sets = void 0;
  if (wcomponent_should_have_state_VAP_sets(wcomponent)) {
    UI_value = get_wcomponent_state_UI_value({wcomponent, wc_counterfactuals, created_at_ms, sim_ms});
    orig_values_and_prediction_sets = wcomponent.values_and_prediction_sets || [];
  }
  return /* @__PURE__ */ h(Box, {
    className: `editable-${wcomponent_id}`
  }, /* @__PURE__ */ h(FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(EditableText, {
    placeholder: wcomponent.type === "action" ? "Passive imperative title..." : wcomponent.type === "relation_link" ? "Verb..." : "Title...",
    value: get_title({rich_text: !editing, wcomponent, wcomponents_by_id, wc_id_counterfactuals_map, created_at_ms, sim_ms}),
    conditional_on_blur: (title) => upsert_wcomponent({title}),
    force_focus: previous_id.current !== wcomponent_id
  })), /* @__PURE__ */ h(WComponentLatestPrediction, {
    wcomponent
  }), UI_value && (editing || UI_value.is_defined) && /* @__PURE__ */ h("div", {
    style: {cursor: "not-allowed"}
  }, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Value"), /* @__PURE__ */ h(DisplayValue, {
    UI_value
  })), /* @__PURE__ */ h(FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Type...",
    selected_option_id: wcomponent.type,
    options: wcomponent_type_options,
    on_change: (type) => {
      if (!type)
        return;
      const vanilla = get_contextless_new_wcomponent_object({type});
      const new_wcomponent = {...vanilla, ...wcomponent};
      new_wcomponent.type = type;
      upsert_wcomponent(new_wcomponent);
    }
  })), wcomponent_is_statev2(wcomponent) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Sub type"), " ", /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Sub type...",
    selected_option_id: wcomponent.subtype,
    options: wcomponent_statev2_subtype_options,
    on_change: (option_id) => upsert_wcomponent({subtype: option_id})
  }))), (editing || wcomponent.description) && /* @__PURE__ */ h(FormControl, {
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(EditableText, {
    placeholder: "Description...",
    value: wcomponent.description,
    conditional_on_blur: (description) => upsert_wcomponent({description})
  })), wcomponent_is_statev2(wcomponent) && wcomponent.subtype === "boolean" && (editing || wcomponent.boolean_true_str || wcomponent.boolean_false_str) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Boolean representation"), " ", /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "True...",
    value: wcomponent.boolean_true_str || "",
    conditional_on_blur: (boolean_true_str) => upsert_wcomponent({boolean_true_str})
  }), !editing && /* @__PURE__ */ h("div", null, "  |  "), /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "False...",
    value: wcomponent.boolean_false_str || "",
    conditional_on_blur: (boolean_false_str) => upsert_wcomponent({boolean_false_str})
  }))), wcomponent_is_counterfactual_v2(wcomponent) && /* @__PURE__ */ h(WComponentCounterfactualForm, {
    wcomponent,
    upsert_wcomponent
  }), wcomponent_is_plain_connection(wcomponent) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentFromTo, {
    connection_terminal_description: "From",
    wcomponent_id: from_wcomponent && from_wcomponent.id,
    connection_terminal_type: wcomponent.from_type,
    on_update_id: (from_id) => upsert_wcomponent({from_id}),
    on_update_type: (from_type) => upsert_wcomponent({from_type})
  })), wcomponent_is_plain_connection(wcomponent) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentFromTo, {
    connection_terminal_description: "To",
    wcomponent_id: to_wcomponent && to_wcomponent.id,
    connection_terminal_type: wcomponent.to_type,
    on_update_id: (to_id) => upsert_wcomponent({to_id}),
    on_update_type: (to_type) => upsert_wcomponent({to_type})
  })), wcomponent_is_causal_link(wcomponent) && /* @__PURE__ */ h(WComponentCausalLinkForm, {
    wcomponent,
    from_wcomponent,
    editing,
    upsert_wcomponent
  }), wcomponent_is_judgement_or_objective(wcomponent) && /* @__PURE__ */ h(JudgementFormFields, {
    ...{wcomponent, upsert_wcomponent}
  }), (editing || wcomponent.label_ids && wcomponent.label_ids.length > 0) && /* @__PURE__ */ h(FormControl, {
    component: "fieldset",
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(FormLabel, {
    component: "legend"
  }, "Labels"), /* @__PURE__ */ h(LabelsEditor, {
    label_ids: wcomponent.label_ids,
    on_change: (label_ids) => upsert_wcomponent({label_ids})
  })), wcomponent_is_event(wcomponent) && /* @__PURE__ */ h(WComponentEventAtFormField, {
    wcomponent,
    upsert_wcomponent
  }), wcomponent_is_prioritisation(wcomponent) && /* @__PURE__ */ h(WComponentDateTimeFormField, {
    wcomponent,
    upsert_wcomponent
  }), orig_validity_predictions && (editing || orig_validity_predictions.length > 0) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(PredictionList, {
    item_descriptor: (wcomponent_is_plain_connection(wcomponent) ? "Existence " : "Validity ") + " prediction",
    predictions: orig_validity_predictions,
    update_predictions: (new_predictions) => upsert_wcomponent({validity: new_predictions})
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null)), wcomponent_has_existence_predictions(wcomponent) && wcomponent.existence.length && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", {
    style: {color: "red"}
  }, /* @__PURE__ */ h(PredictionList, {
    item_descriptor: "(Deprecated, please delete) Existence prediction",
    predictions: wcomponent_has_existence_predictions(wcomponent) ? wcomponent.existence : [],
    update_predictions: (new_predictions) => upsert_wcomponent({
      existence: new_predictions.length ? new_predictions : void 0
    })
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null)), orig_values_and_prediction_sets !== void 0 && (editing || orig_values_and_prediction_sets.length > 0) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, VAPs_represent === VAPsType.undefined && /* @__PURE__ */ h("div", null, "Values: Set subtype to view"), VAPs_represent !== VAPsType.undefined && /* @__PURE__ */ h(ValueAndPredictionSets, {
    wcomponent_id: wcomponent.id,
    VAPs_represent,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    update_values_and_predictions: (values_and_prediction_sets) => {
      upsert_wcomponent({values_and_prediction_sets});
    }
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null)), wcomponent_is_statev1(wcomponent) && (editing || (wcomponent.values || []).length > 0) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(ValueList, {
    values: wcomponent.values || [],
    update_values: (new_values) => upsert_wcomponent({values: new_values}),
    creation_context
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null)), wcomponent_is_goal(wcomponent) && /* @__PURE__ */ h(GoalFormFields, {
    ...{wcomponent, upsert_wcomponent}
  }), /* @__PURE__ */ h(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Created at",
    invariant_value: wcomponent.created_at,
    value: wcomponent.custom_created_at,
    on_change: (new_custom_created_at) => upsert_wcomponent({custom_created_at: new_custom_created_at})
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Label color"), /* @__PURE__ */ h(ColorPicker, {
    color: wcomponent.label_color,
    conditional_on_blur: (color) => upsert_wcomponent({label_color: color})
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Hide (node) title"), /* @__PURE__ */ h(EditableCheckbox, {
    value: wcomponent.hide_title,
    on_change: (hide_title) => upsert_wcomponent({hide_title})
  }), /* @__PURE__ */ h("hr", null)), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentKnowledgeViewForm, {
    wcomponent_id
  })), /* @__PURE__ */ h("br", null));
}
export const WComponentForm = connector(_WComponentForm);
const wcomponent_type_options = wcomponent_types.map((type) => ({id: type, title: type}));
const wcomponent_statev2_subtype_options = wcomponent_statev2_subtypes.map((type) => ({id: type, title: type}));
