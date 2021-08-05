import {h} from "../../../_snowpack/pkg/preact.js";
import "./ValueAndPredictions.css.proxy.js";
import {EditableNumber} from "../../form/EditableNumber.js";
import {EditablePercentage} from "../../form/EditablePercentage.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {get_items_descriptor} from "../../form/editable_list/ExpandableList.js";
import {ListHeader} from "../../form/editable_list/ListHeader.js";
import {ListHeaderAddButton} from "../../form/editable_list/ListHeaderAddButton.js";
import {factory_render_list_content} from "../../form/editable_list/render_list_content.js";
import {prepare_new_VAP} from "./utils.js";
import {PredictionBadge} from "../predictions/PredictionBadge.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {ACTIONS} from "../../state/actions.js";
import {is_counterfactual_active} from "../../shared/counterfactuals/active.js";
import {merge_counterfactual_into_VAP} from "../../shared/counterfactuals/merge.js";
import {get_new_wcomponent_object} from "../../shared/wcomponent/get_new_wcomponent_object.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
const map_state = (state) => {
  const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  return {
    knowledge_view_id: current_composed_knowledge_view && current_composed_knowledge_view.id,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting
  };
};
const map_dispatch = {
  upsert_counterfactual: (cf, knowledge_view_id) => {
    return ACTIONS.specialised_object.upsert_wcomponent({
      wcomponent: cf,
      add_to_knowledge_view: {id: knowledge_view_id, position: {left: 0, top: 0}}
    });
  }
};
const connector = connect(map_state, map_dispatch);
function _ValueAndPredictions(props) {
  const {creation_context, editing, VAPs_represent} = props;
  const VAPs = props.values_and_predictions;
  const class_name_only_one_VAP = VAPs_represent === VAPsType.boolean && VAPs.length >= 1 ? "only_one_VAP" : "";
  const item_top_props = {
    get_summary: get_summary({
      VAPs_represent,
      VAP_counterfactuals_map: props.VAP_counterfactuals_map,
      upsert_counterfactual: props.upsert_counterfactual,
      knowledge_view_id: props.knowledge_view_id,
      wcomponent_id: props.wcomponent_id,
      VAP_set_id: props.VAP_set_id,
      creation_context,
      editing
    }),
    get_details: get_details(VAPs_represent, editing),
    extra_class_names: "value_and_prediction"
  };
  const item_descriptor = "Value and prediction";
  return /* @__PURE__ */ h("div", {
    className: `value_and_predictions ${class_name_only_one_VAP}`
  }, /* @__PURE__ */ h(ListHeader, {
    items_descriptor: get_items_descriptor(item_descriptor, VAPs.length),
    other_content: () => !editing || VAPs_represent === VAPsType.boolean ? null : /* @__PURE__ */ h(ListHeaderAddButton, {
      new_item_descriptor: item_descriptor,
      on_pointer_down_new_list_entry: () => {
        const vanilla_entries = [...VAPs, prepare_new_VAP()];
        props.update_values_and_predictions(vanilla_entries);
      }
    })
  }), factory_render_list_content({
    items: VAPs,
    get_id,
    item_top_props,
    debug_item_descriptor: item_descriptor,
    update_items: props.update_values_and_predictions
  })({expanded_item_rows: true, expanded_items: true, disable_partial_collapsed: false}));
}
export const ValueAndPredictions = connector(_ValueAndPredictions);
const get_id = (item) => item.id;
const get_summary = (args) => (VAP, on_change) => {
  const {
    VAPs_represent,
    VAP_counterfactuals_map,
    knowledge_view_id,
    wcomponent_id,
    VAP_set_id,
    upsert_counterfactual,
    creation_context,
    editing
  } = args;
  const counterfactual = VAP_counterfactuals_map && VAP_counterfactuals_map[VAP.id];
  const counterfactual_active = is_counterfactual_active(counterfactual);
  const {probability, conviction} = merge_counterfactual_into_VAP(VAP, counterfactual);
  const is_boolean = VAPs_represent === VAPsType.boolean;
  const is_number = VAPs_represent === VAPsType.number;
  const has_rel_prob = VAP.relative_probability !== void 0;
  const disabled_prob = has_rel_prob && !is_boolean || counterfactual_active;
  const disabled_rel_prob = !has_rel_prob || is_boolean;
  const disabled_conviction = counterfactual_active;
  const disabled_setting_counterfactual = !editing || !knowledge_view_id || !wcomponent_id || !VAP_set_id;
  return /* @__PURE__ */ h("div", {
    className: "value_and_prediction_summary"
  }, /* @__PURE__ */ h("div", {
    className: "temporal_uncertainty"
  }, is_number && (editing || VAP.min) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "min"), "   ", /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "...",
    value: VAP.min || "",
    conditional_on_blur: (min) => on_change({...VAP, min})
  })), (editing || VAP.value) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "value"), "   ", /* @__PURE__ */ h(EditableTextSingleLine, {
    disabled: is_boolean,
    placeholder: "...",
    value: is_boolean ? "True" : VAP.value,
    conditional_on_blur: (value) => on_change({...VAP, value})
  })), is_number && (editing || VAP.max) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "max"), "   ", /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "...",
    value: VAP.max || "",
    conditional_on_blur: (max) => on_change({...VAP, max})
  }))), /* @__PURE__ */ h("div", {
    className: "probabilities"
  }, is_boolean && /* @__PURE__ */ h("div", {
    className: disabled_prob ? "disabled" : ""
  }, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "Prob"), "   ", /* @__PURE__ */ h(EditablePercentage, {
    disabled: disabled_prob,
    placeholder: "...",
    value: probability,
    conditional_on_blur: (probability2) => on_change({...VAP, probability: probability2})
  })), !is_boolean && VAP.relative_probability !== void 0 && /* @__PURE__ */ h("div", {
    className: disabled_rel_prob ? "disabled" : ""
  }, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "Rel prob"), "   ", /* @__PURE__ */ h(EditableNumber, {
    disabled: disabled_rel_prob,
    placeholder: "...",
    value: is_boolean ? void 0 : VAP.relative_probability,
    allow_undefined: true,
    conditional_on_blur: (relative_probability) => on_change({...VAP, relative_probability})
  })), is_boolean && /* @__PURE__ */ h("div", {
    className: disabled_conviction ? "disabled" : ""
  }, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "Cn"), "   ", /* @__PURE__ */ h(EditablePercentage, {
    disabled: disabled_conviction,
    placeholder: "...",
    value: conviction,
    conditional_on_blur: (conviction2) => on_change({...VAP, conviction: conviction2})
  })), /* @__PURE__ */ h(PredictionBadge, {
    disabled: disabled_setting_counterfactual,
    size: 20,
    probability: VAP.probability,
    conviction: VAP.conviction,
    counterfactual_probability: counterfactual && counterfactual.probability,
    counterfactual_conviction: counterfactual && counterfactual.conviction,
    set_counterfactual: (args2) => {
      if (!knowledge_view_id || !wcomponent_id || !VAP_set_id)
        return;
      let cf = counterfactual || get_new_wcomponent_object({
        type: "counterfactual",
        target_wcomponent_id: wcomponent_id,
        target_VAP_set_id: VAP_set_id,
        target_VAP_id: VAP.id
      }, creation_context);
      cf = {...cf, ...args2};
      upsert_counterfactual(cf, knowledge_view_id);
    }
  })));
};
const get_details = (VAPs_represent, editing) => (item, on_change) => {
  if (VAPs_represent === VAPsType.boolean)
    return /* @__PURE__ */ h("div", null);
  if (!editing && !item.description)
    return /* @__PURE__ */ h("div", null);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "Description:"), /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: item.description,
    conditional_on_blur: (description) => on_change({...item, description})
  }));
};
