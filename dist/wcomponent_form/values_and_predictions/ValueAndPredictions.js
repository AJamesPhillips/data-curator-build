import {h} from "../../../snowpack/pkg/preact.js";
import "./ValueAndPredictions.css.proxy.js";
import {EditableNumber} from "../../form/EditableNumber.js";
import {EditablePercentage} from "../../form/EditablePercentage.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {get_items_descriptor} from "../../form/editable_list/ExpandableList.js";
import {ListHeader} from "../../form/editable_list/ListHeader.js";
import {ListHeaderAddButton} from "../../form/editable_list/ListHeaderAddButton.js";
import {factory_render_list_content} from "../../form/editable_list/render_list_content.js";
import {prepare_new_VAP} from "../../wcomponent/CRUD_helpers/prepare_new_VAP.js";
import {PredictionBadge} from "../../sharedf/prediction_badge/PredictionBadge.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {remove_element, replace_element} from "../../utils/list.js";
import {ValuePossibilityLink} from "../value_possibilities/ValuePossibilityLink.js";
const map_state = (state) => {
  return {
    editing: !state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _ValueAndPredictions(props) {
  const {editing, value_possibilities, VAPs_represent} = props;
  const VAPs = props.values_and_predictions;
  const class_name_only_one_VAP = VAPs_represent === VAPsType.boolean && VAPs.length >= 1 ? "only_one_VAP" : "";
  const item_props = {
    get_summary: get_summary({value_possibilities, VAPs_represent, editing}),
    get_details: get_details(VAPs_represent, editing),
    extra_class_names: "value_and_prediction",
    crud: {
      update_item: (modified_VAP) => {
        const id = get_id(modified_VAP);
        const updated_VAPs = replace_element(VAPs, modified_VAP, (item) => get_id(item) === id);
        props.update_values_and_predictions(updated_VAPs);
      },
      delete_item: (VAP_to_delete) => {
        const id = get_id(VAP_to_delete);
        const updated_VAPs = remove_element(VAPs, (item) => get_id(item) === id);
        props.update_values_and_predictions(updated_VAPs);
      }
    },
    delete_button_text: "Delete Value & Prediction"
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
    item_props,
    debug_item_descriptor: item_descriptor
  })({expanded_item_rows: false, expanded_items: true, disable_partial_collapsed: false}));
}
export const ValueAndPredictions = connector(_ValueAndPredictions);
const get_id = (item) => item.id;
const get_summary = (args) => (VAP, crud) => {
  const {value_possibilities, VAPs_represent, editing} = args;
  const {
    probability: orig_probability,
    relative_probability: orig_relative_probability,
    conviction: orig_conviction,
    min: orig_min,
    value: orig_value,
    max: orig_max
  } = VAP;
  const is_boolean = VAPs_represent === VAPsType.boolean;
  const is_number = VAPs_represent === VAPsType.number;
  const has_rel_prob = orig_relative_probability !== void 0;
  const disabled_prob = has_rel_prob && !is_boolean;
  const disabled_rel_prob = !has_rel_prob || is_boolean;
  return /* @__PURE__ */ h("div", {
    className: "value_and_prediction_summary"
  }, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    className: "temporal_uncertainty"
  }, is_number && (editing || orig_min) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Min",
    value: orig_min || "",
    conditional_on_blur: (new_min) => crud.update_item({...VAP, min: new_min})
  }), /* @__PURE__ */ h("br", null)), (editing || orig_value) && /* @__PURE__ */ h("div", {
    style: {position: "relative"}
  }, /* @__PURE__ */ h(EditableTextSingleLine, {
    disabled: is_boolean,
    placeholder: "Value",
    value: is_boolean ? orig_probability > 0.5 ? "True" : "False" : orig_value,
    conditional_on_blur: (value) => crud.update_item({...VAP, value})
  }), !is_number && !is_boolean && /* @__PURE__ */ h("div", {
    style: {position: "absolute", right: "-25px", top: "15px"}
  }, /* @__PURE__ */ h(ValuePossibilityLink, {
    editing,
    VAP,
    value_possibilities,
    update_VAP: (modified_VAP) => crud.update_item(modified_VAP)
  })), /* @__PURE__ */ h("br", null)), is_number && (editing || orig_max) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Max",
    value: orig_max || "",
    conditional_on_blur: (max) => crud.update_item({...VAP, max})
  }), /* @__PURE__ */ h("br", null))), /* @__PURE__ */ h("div", {
    className: "predictions"
  }, is_boolean && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditablePercentage, {
    placeholder: "Confidence",
    value: orig_conviction,
    conditional_on_blur: (new_conviction) => crud.update_item({...VAP, conviction: new_conviction})
  })), is_boolean && /* @__PURE__ */ h("div", {
    className: disabled_prob ? "disabled" : ""
  }, /* @__PURE__ */ h(EditablePercentage, {
    disabled: disabled_prob,
    placeholder: "Probability",
    value: orig_probability,
    conditional_on_blur: (new_probability) => {
      crud.update_item({...VAP, probability: new_probability});
    }
  })), !is_boolean && orig_relative_probability !== void 0 && /* @__PURE__ */ h("div", {
    className: disabled_rel_prob ? "disabled" : ""
  }, /* @__PURE__ */ h(EditableNumber, {
    disabled: disabled_rel_prob,
    placeholder: "Relative probability",
    size: "medium",
    value: is_boolean ? void 0 : orig_relative_probability,
    allow_undefined: true,
    conditional_on_blur: (new_relative_probability) => {
      new_relative_probability = is_boolean ? void 0 : new_relative_probability || 0;
      crud.update_item({...VAP, relative_probability: new_relative_probability});
    }
  })), "  ", /* @__PURE__ */ h(PredictionBadge, {
    disabled: true,
    size: 20,
    probability: orig_probability,
    conviction: orig_conviction
  })));
};
const get_details = (VAPs_represent, editing) => (item, crud) => {
  if (VAPs_represent === VAPsType.boolean)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
      className: "description_label"
    }, "Description"), "Boolean value of this state, i.e. either true (100%), false (0%) or somewhere in between.");
  if (!editing && !item.description)
    return /* @__PURE__ */ h("div", null);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, "Description"), /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: item.description,
    conditional_on_blur: (description) => crud.update_item({...item, description})
  }));
};
