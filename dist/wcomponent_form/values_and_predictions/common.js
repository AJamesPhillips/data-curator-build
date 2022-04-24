import {h} from "../../../snowpack/pkg/preact.js";
import {EditablePercentage} from "../../form/EditablePercentage.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {
  get_probable_VAP_set_values_for_display,
  get_VAP_set_probable_percentages_for_display,
  get_VAP_set_conviction
} from "../../wcomponent_derived/value_and_prediction/get_UI_value_of_VAP_set_attributes.js";
import {PredictionSummary} from "./to_deprecate/PredictionSummary.js";
import {UncertainDateTimeForm} from "../uncertain_datetime/UncertainDateTimeForm.js";
import {ValueAndPredictions} from "./ValueAndPredictions.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {set_VAP_probabilities} from "../../wcomponent/CRUD_helpers/prepare_new_VAP.js";
import {EditableTextOnBlurType} from "../../form/editable_text/editable_text_common.js";
export const get_summary_for_single_VAP_set = (VAPs_represent, show_created_at) => (VAP_set, crud) => {
  let VAPs = get_VAPs_from_set(VAP_set, VAPs_represent);
  VAP_set = {...VAP_set, entries: VAPs};
  const values = get_probable_VAP_set_values_for_display(VAP_set, VAPs_represent);
  const prob = get_VAP_set_probable_percentages_for_display(VAP_set, VAPs_represent) + "%";
  const conv = get_VAP_set_conviction(VAP_set, VAPs_represent) + "%";
  return /* @__PURE__ */ h(PredictionSummary, {
    created_at: show_created_at ? VAP_set.custom_created_at || VAP_set.created_at : void 0,
    value: values,
    datetime: VAP_set.datetime,
    probability: prob,
    conviction: conv
  });
};
export const get_details_for_single_VAP_set = (value_possibilities, VAPs_represent) => (VAP_set, crud) => {
  const VAPs = get_VAPs_from_set(VAP_set, VAPs_represent);
  return /* @__PURE__ */ h("div", {
    className: "VAP_set_details"
  }, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(UncertainDateTimeForm, {
    datetime: VAP_set.datetime,
    on_change: (datetime) => crud.update_item({...VAP_set, datetime})
  }), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(ValueAndPredictions, {
    value_possibilities,
    VAPs_represent,
    values_and_predictions: VAPs,
    update_values_and_predictions: (VAPs2) => {
      const vanilla_entries = merge_entries(VAPs2, VAP_set, VAPs_represent);
      const entries_with_probabilities = set_VAP_probabilities(vanilla_entries, VAPs_represent);
      const new_VAP_set = {...VAP_set, entries: entries_with_probabilities};
      crud.update_item(new_VAP_set);
    }
  }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h("br", null));
};
export const get_details2_for_single_VAP_set = (VAPs_represent, editing) => (VAP_set, crud) => {
  const shared_entry_values = VAP_set.shared_entry_values || {};
  const VAP_explanations = VAP_set.entries.map(({explanation: explanation2}) => explanation2.trim()).filter((explanation2) => explanation2).join("\n\n");
  const explanation = shared_entry_values.explanation || VAP_explanations || "";
  const conviction = shared_entry_values.conviction || 1;
  const VAPs_not_boolean = VAPs_represent !== VAPsType.boolean;
  const display_explanation = !!(editing || explanation);
  return /* @__PURE__ */ h("div", {
    className: "shared_VAP_set_details"
  }, VAPs_not_boolean && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditablePercentage, {
    disabled: false,
    placeholder: "Confidence",
    value: conviction,
    on_blur: (conviction2) => {
      const shared_entry_values2 = {...VAP_set.shared_entry_values, conviction: conviction2};
      const entries = VAP_set.entries.map((e) => ({...e, conviction: conviction2}));
      crud.update_item({...VAP_set, entries, shared_entry_values: shared_entry_values2});
    },
    on_blur_type: EditableTextOnBlurType.conditional
  })), display_explanation && /* @__PURE__ */ h(EditableText, {
    placeholder: "Explanation",
    value: explanation,
    on_blur: (explanation2) => {
      const shared_entry_values2 = {...VAP_set.shared_entry_values, explanation: explanation2};
      crud.update_item({...VAP_set, shared_entry_values: shared_entry_values2});
    },
    on_blur_type: EditableTextOnBlurType.conditional
  }), /* @__PURE__ */ h("br", null));
};
const get_created_at = (item) => item.created_at;
const get_custom_created_at = (item) => item.custom_created_at;
function get_VAPs_from_set(VAP_set, VAPs_represent) {
  let VAPs = VAP_set.entries;
  if (VAPs_represent === VAPsType.boolean && VAPs.length !== 1) {
    VAPs = VAPs.slice(0, 1);
  }
  return VAPs;
}
function merge_entries(VAPs, VAP_set, VAPs_represent) {
  if (VAPs_represent === VAPsType.boolean) {
    VAPs = VAPs.concat(VAP_set.entries.slice(1));
  }
  return VAPs;
}
