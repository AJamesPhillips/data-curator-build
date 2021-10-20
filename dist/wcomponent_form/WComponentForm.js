import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {useEffect, useMemo, useState} from "../../snowpack/pkg/preact/hooks.js";
import {Box, FormControl, FormLabel} from "../../snowpack/pkg/@material-ui/core.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {ConfirmatoryDeleteButton} from "../form/ConfirmatoryDeleteButton.js";
import {EditableCheckbox} from "../form/EditableCheckbox.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import {LabelsEditor} from "../labels/LabelsEditor.js";
import {prepare_new_contextless_wcomponent_object} from "../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {get_updated_wcomponent} from "../wcomponent/CRUD_helpers/get_updated_wcomponent.js";
import {get_wcomponent_state_UI_value} from "../wcomponent_derived/get_wcomponent_state_UI_value.js";
import {VAPsType} from "../wcomponent/interfaces/VAPsType.js";
import {
  wcomponent_is_plain_connection,
  wcomponent_can_have_validity_predictions,
  wcomponent_should_have_state_VAP_sets,
  wcomponent_is_statev2,
  wcomponent_is_counterfactual_v2,
  wcomponent_is_causal_link,
  wcomponent_is_judgement_or_objective,
  wcomponent_is_event,
  wcomponent_is_prioritisation,
  wcomponent_has_existence_predictions,
  wcomponent_is_goal,
  wcomponent_is_sub_state
} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {wcomponent_statev2_subtypes} from "../wcomponent/interfaces/state.js";
import {wcomponent_types} from "../wcomponent/interfaces/wcomponent_base.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {get_wcomponent_VAPs_represent} from "../wcomponent/get_wcomponent_VAPs_represent.js";
import {wcomponent_type_to_text} from "../wcomponent_derived/wcomponent_type_to_text.js";
import {ColorPicker} from "../sharedf/ColorPicker.js";
import {ACTIONS} from "../state/actions.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {get_wcomponent_from_state} from "../state/specialised_objects/accessors.js";
import {DisplayValue} from "../wcomponent_derived/shared_components/DisplayValue.js";
import {ValueAndPredictionSets} from "./values_and_predictions/ValueAndPredictionSets.js";
import {PredictionList} from "./values_and_predictions/to_deprecate/PredictionList.js";
import {WComponentFromTo} from "./WComponentFromTo.js";
import {WComponentLatestPrediction} from "./WComponentLatestPrediction.js";
import {GoalFormFields} from "./GoalFormFields.js";
import {JudgementFormFields} from "./JudgementFormFields.js";
import {WComponentCausalLinkForm} from "./WComponentCausalLinkForm.js";
import {WComponentCounterfactualForm} from "./WComponentCounterfactualForm.js";
import {WComponentDateTimeFormField} from "./WComponentDateTimeFormField.js";
import {WComponentEventAtFormField} from "./WComponentEventAtFormField.js";
import {WComponentKnowledgeViewForm} from "./WComponentKnowledgeViewForm.js";
import {WComponentImageForm} from "./WComponentImageForm.js";
import {Button} from "../sharedf/Button.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {ValuePossibilitiesComponent} from "./value_possibilities/ValuePossibilitiesComponent.js";
import {update_VAPSets_with_possibilities} from "../wcomponent/CRUD_helpers/update_VAPSets_with_possibilities.js";
import {WComponentSubStateForm} from "./WComponentSubStateForm.js";
import {WComponentConnectionForm} from "./WComponentConnectionForm.js";
import {get_default_wcomponent_title} from "../wcomponent_derived/rich_text/get_default_wcomponent_title.js";
const map_state = (state, {wcomponent}) => {
  let from_wcomponent = void 0;
  let to_wcomponent = void 0;
  if (wcomponent_is_plain_connection(wcomponent)) {
    from_wcomponent = get_wcomponent_from_state(state, wcomponent.from_id);
    to_wcomponent = get_wcomponent_from_state(state, wcomponent.to_id);
  }
  const wc_id_to_counterfactuals_map = get_wc_id_to_counterfactuals_v2_map(state);
  return {
    ready: state.sync.ready_for_reading,
    base_id: selector_chosen_base_id(state),
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    wc_id_to_counterfactuals_map,
    from_wcomponent,
    to_wcomponent,
    editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent,
  delete_wcomponent: ACTIONS.specialised_object.delete_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _WComponentForm(props) {
  const [previous_id, set_previous_id] = useState(void 0);
  const [focus_title, set_focus_title] = useState(true);
  const wcomponent_id = props.wcomponent.id;
  useEffect(() => {
    set_previous_id(wcomponent_id);
    set_focus_title(true);
  }, [wcomponent_id]);
  const {
    wcomponent,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map,
    from_wcomponent,
    to_wcomponent,
    editing,
    created_at_ms,
    sim_ms
  } = props;
  const default_title = useMemo(() => {
    return get_default_wcomponent_title({
      wcomponent,
      rich_text: false,
      wcomponents_by_id,
      wc_id_to_counterfactuals_map,
      created_at_ms,
      sim_ms
    });
  }, [wcomponent_id]);
  const {ready, base_id} = props;
  if (!ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  if (base_id === void 0)
    return /* @__PURE__ */ h("div", null, "Choose a base first.");
  const VAP_set_id_to_counterfactual_v2_map = wc_id_to_counterfactuals_map && wc_id_to_counterfactuals_map[wcomponent_id]?.VAP_sets;
  if (previous_id !== wcomponent_id && previous_id !== void 0) {
    return null;
  }
  if (focus_title)
    set_focus_title(false);
  const upsert_wcomponent = (partial_wcomponent) => {
    const updated = get_updated_wcomponent(wcomponent, partial_wcomponent).wcomponent;
    props.upsert_wcomponent({wcomponent: updated});
  };
  const orig_validity_predictions = wcomponent_can_have_validity_predictions(wcomponent) ? wcomponent.validity || [] : void 0;
  const VAPs_represent = get_wcomponent_VAPs_represent(wcomponent);
  let UI_value = void 0;
  let orig_values_and_prediction_sets = void 0;
  let orig_value_possibilities = void 0;
  if (wcomponent_should_have_state_VAP_sets(wcomponent)) {
    UI_value = get_wcomponent_state_UI_value({wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms});
    orig_values_and_prediction_sets = wcomponent.values_and_prediction_sets || [];
    orig_value_possibilities = wcomponent.value_possibilities;
  }
  return /* @__PURE__ */ h(Box, {
    className: `editable-${wcomponent_id}`
  }, /* @__PURE__ */ h(FormControl, {
    fullWidth: true,
    margin: "normal",
    style: {fontWeight: 600, fontSize: 22}
  }, /* @__PURE__ */ h(EditableText, {
    placeholder: wcomponent.type === "action" ? "Passive imperative title..." : wcomponent.type === "relation_link" ? "Verb..." : "Title...",
    value: get_title({rich_text: !editing, wcomponent, wcomponents_by_id, wc_id_to_counterfactuals_map, created_at_ms, sim_ms}) || default_title,
    conditional_on_blur: (title) => upsert_wcomponent({title}),
    force_focus: focus_title,
    hide_label: true
  })), /* @__PURE__ */ h(WComponentLatestPrediction, {
    wcomponent
  }), UI_value && (editing || UI_value.is_defined) && /* @__PURE__ */ h("a", {
    style: {color: "#bbb", textDecoration: "none"},
    title: "This is broken for counterfactuals at the moment.  See issue 81",
    href: "https://github.com/centerofci/data-curator2/issues/81",
    target: "_blank"
  }, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Value"), /* @__PURE__ */ h(DisplayValue, {
    UI_value
  })), /* @__PURE__ */ h(FormControl, {
    component: "fieldset",
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Type: ",
    selected_option_id: wcomponent.type,
    options: wcomponent_type_options,
    on_change: (type) => {
      if (!type)
        return;
      const vanilla = prepare_new_contextless_wcomponent_object({base_id, type});
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
    conditional_on_blur: (description) => upsert_wcomponent({description}),
    hide_label: true
  })), wcomponent_is_sub_state(wcomponent) && /* @__PURE__ */ h(WComponentSubStateForm, {
    wcomponent,
    upsert_wcomponent
  }), wcomponent_is_counterfactual_v2(wcomponent) && /* @__PURE__ */ h(WComponentCounterfactualForm, {
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
  }), wcomponent_is_plain_connection(wcomponent) && /* @__PURE__ */ h(WComponentConnectionForm, {
    wcomponent,
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
    value_possibilities: orig_value_possibilities,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    update_values_and_predictions: ({value_possibilities, values_and_prediction_sets}) => {
      upsert_wcomponent({value_possibilities, values_and_prediction_sets});
    }
  })), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null), VAPs_represent !== VAPsType.undefined && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ValuePossibilitiesComponent, {
    editing,
    VAPs_represent,
    value_possibilities: orig_value_possibilities,
    values_and_prediction_sets: orig_values_and_prediction_sets,
    update_value_possibilities: (value_possibilities) => {
      const values_and_prediction_sets = update_VAPSets_with_possibilities(orig_values_and_prediction_sets, value_possibilities);
      upsert_wcomponent({value_possibilities, values_and_prediction_sets});
    }
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null))), wcomponent_is_goal(wcomponent) && /* @__PURE__ */ h(GoalFormFields, {
    ...{wcomponent, upsert_wcomponent}
  }), /* @__PURE__ */ h(FormControl, {
    fullWidth: true
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Created at",
    invariant_value: wcomponent.created_at,
    value: wcomponent.custom_created_at,
    on_change: (new_custom_created_at) => {
      upsert_wcomponent({custom_created_at: new_custom_created_at});
    }
  }), /* @__PURE__ */ h("br", null)), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Label color"), /* @__PURE__ */ h(ColorPicker, {
    color: wcomponent.label_color,
    conditional_on_blur: (color) => upsert_wcomponent({label_color: color})
  })), editing && /* @__PURE__ */ h(WComponentImageForm, {
    wcomponent,
    upsert_wcomponent
  }), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Hide node title"), /* @__PURE__ */ h(EditableCheckbox, {
    value: wcomponent.hide_title,
    on_change: (hide_title) => upsert_wcomponent({hide_title})
  }), /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Hide node state"), /* @__PURE__ */ h(EditableCheckbox, {
    value: wcomponent.hide_state,
    on_change: (hide_state) => upsert_wcomponent({hide_state})
  }), /* @__PURE__ */ h("hr", null)), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentKnowledgeViewForm, {
    wcomponent_id
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), editing && !wcomponent.deleted_at && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete",
    tooltip_text: "Remove from all knowledge views",
    on_delete: () => props.delete_wcomponent({wcomponent_id})
  })), editing && wcomponent.deleted_at && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
    title: "Undo delete",
    onClick: () => props.upsert_wcomponent({wcomponent: {...wcomponent, deleted_at: void 0}})
  }, "Restore")), /* @__PURE__ */ h("br", null));
}
export const WComponentForm = connector(_WComponentForm);
const wcomponent_type_options = wcomponent_types.map((type) => ({id: type, title: wcomponent_type_to_text(type)}));
const wcomponent_statev2_subtype_options = wcomponent_statev2_subtypes.map((type) => ({id: type, title: type}));