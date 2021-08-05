import {h} from "../../../_snowpack/pkg/preact.js";
import "./common.css.proxy.js";
import {EditablePercentage} from "../../form/EditablePercentage.js";
import {EditableText} from "../../form/editable_text/EditableText.js";
import {get_probable_VAP_set_values, get_VAP_set_prob, get_VAP_set_conviction} from "../../sharedf/wcomponent_state.js";
import {merge_counterfactuals_into_VAPs} from "../../shared/counterfactuals/merge.js";
import {SummaryForPrediction} from "../predictions/common.js";
import {UncertainDateTime} from "../uncertainty/datetime.js";
import {ValueAndPredictions} from "./ValueAndPredictions.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {set_VAP_probabilities} from "./utils.js";
export const get_summary_for_single_VAP_set = (VAPs_represent, show_created_at, VAP_counterfactuals_map) => (VAP_set, on_change) => {
  let VAPs = get_VAPs_from_set(VAP_set, VAPs_represent);
  VAPs = merge_counterfactuals_into_VAPs(VAPs, VAP_counterfactuals_map);
  VAP_set = {...VAP_set, entries: VAPs};
  const values = get_probable_VAP_set_values(VAP_set, VAPs_represent);
  const prob = get_VAP_set_prob(VAP_set, VAPs_represent) + " %";
  const conv = get_VAP_set_conviction(VAP_set, VAPs_represent) + " %";
  return /* @__PURE__ */ h(SummaryForPrediction, {
    created_at: show_created_at ? VAP_set.custom_created_at || VAP_set.created_at : void 0,
    value: VAPs_represent === VAPsType.boolean || VAPs_represent === VAPsType.number ? values : "",
    datetime: VAP_set.datetime,
    probability: prob,
    conviction: conv
  });
};
export const get_details_for_single_VAP_set = (VAPs_represent, wcomponent_id, VAP_set_counterfactuals_map) => (VAP_set, on_change) => {
  const VAPs = get_VAPs_from_set(VAP_set, VAPs_represent);
  const VAP_counterfactuals_map = VAP_set_counterfactuals_map && VAP_set_counterfactuals_map[VAP_set.id];
  return /* @__PURE__ */ h("div", {
    className: "VAP_set_details"
  }, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(UncertainDateTime, {
    datetime: VAP_set.datetime,
    on_change: (datetime) => on_change({...VAP_set, datetime})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ValueAndPredictions, {
    wcomponent_id,
    VAP_set_id: VAP_set.id,
    created_at: get_custom_created_at(VAP_set) || get_created_at(VAP_set),
    VAPs_represent,
    values_and_predictions: VAPs,
    VAP_counterfactuals_map,
    update_values_and_predictions: (VAPs2) => {
      const vanilla_entries = merge_entries(VAPs2, VAP_set, VAPs_represent);
      const entries_with_probabilities = set_VAP_probabilities(vanilla_entries, VAPs_represent);
      const new_VAP_set = {...VAP_set, entries: entries_with_probabilities};
      on_change(new_VAP_set);
    }
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
};
export const get_details2_for_single_VAP_set = (VAPs_represent, editing) => (VAP_set, on_change) => {
  const shared_entry_values = VAP_set.shared_entry_values || {};
  const VAP_explanations = VAP_set.entries.map(({explanation: explanation2}) => explanation2.trim()).filter((explanation2) => explanation2).join("\n\n");
  const explanation = shared_entry_values.explanation || VAP_explanations || "";
  const conviction = shared_entry_values.conviction || 1;
  const display_explanation = !!(editing || explanation);
  return /* @__PURE__ */ h("div", {
    className: "shared_VAP_set_details"
  }, /* @__PURE__ */ h("div", {
    className: "row_one"
  }, /* @__PURE__ */ h("div", {
    className: "description_label"
  }, display_explanation && "Explanation:"), VAPs_represent !== VAPsType.boolean && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    className: "description_label",
    style: {display: "inline"}
  }, "Cn:"), "  ", /* @__PURE__ */ h(EditablePercentage, {
    disabled: false,
    placeholder: "...",
    value: conviction,
    conditional_on_blur: (conviction2) => {
      const shared_entry_values2 = {...VAP_set.shared_entry_values, conviction: conviction2};
      const entries = VAP_set.entries.map((e) => ({...e, conviction: conviction2}));
      on_change({...VAP_set, entries, shared_entry_values: shared_entry_values2});
    }
  }))), display_explanation && /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: explanation,
    conditional_on_blur: (explanation2) => {
      const shared_entry_values2 = {...VAP_set.shared_entry_values, explanation: explanation2};
      on_change({...VAP_set, shared_entry_values: shared_entry_values2});
    }
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
