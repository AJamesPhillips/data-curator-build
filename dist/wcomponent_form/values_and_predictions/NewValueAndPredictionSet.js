import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {Button} from "../../sharedf/Button.js";
import {
  get_details2_for_single_VAP_set,
  get_details_for_single_VAP_set,
  get_summary_for_single_VAP_set
} from "./common.js";
import {SimplifiedUncertainDatetimeForm} from "../uncertain_datetime/SimplifiedUncertainDatetimeForm.js";
import {sentence_case} from "../../shared/utils/sentence_case.js";
import {update_VAP_set_VAP_probabilities} from "./update_VAP_set_VAP_probabilities.js";
export const new_value_and_prediction_set = (VAPs_represent, possible_value_possibilities) => {
  const any_value_possibilities = Object.keys(possible_value_possibilities || {}).length > 0;
  const hide_advanced_for_type_other = VAPs_represent === VAPsType.other && any_value_possibilities;
  const initial_hide_advanced = VAPs_represent === VAPsType.boolean || VAPs_represent === VAPsType.action || hide_advanced_for_type_other;
  const [show_advanced, set_show_advanced] = useState(!initial_hide_advanced);
  return (VAP_set, crud) => {
    const {update_item} = crud;
    return /* @__PURE__ */ h("div", null, VAPs_represent === VAPsType.boolean && /* @__PURE__ */ h(SimplifiedBooleanForm, {
      VAP_set,
      on_change: update_item
    }), VAPs_represent === VAPsType.action && /* @__PURE__ */ h(SimplifiedActionForm, {
      possible_value_possibilities,
      VAP_set,
      on_change: update_item
    }), hide_advanced_for_type_other && /* @__PURE__ */ h(SimplifiedOtherForm, {
      possible_value_possibilities,
      VAP_set,
      on_change: update_item
    }), /* @__PURE__ */ h(SimplifiedUncertainDatetimeForm, {
      VAP_set,
      on_change: update_item
    }), /* @__PURE__ */ h(Button, {
      value: (show_advanced ? "Hide" : "Show") + " advanced options",
      onClick: () => set_show_advanced(!show_advanced)
    }), show_advanced && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), get_summary_for_single_VAP_set(VAPs_represent, false)(VAP_set, crud), get_details_for_single_VAP_set(possible_value_possibilities, VAPs_represent)(VAP_set, crud), get_details2_for_single_VAP_set(VAPs_represent, true)(VAP_set, crud)));
  };
};
function SimplifiedBooleanForm(props) {
  const {VAP_set, on_change} = props;
  const entry = VAP_set.entries[0];
  if (!entry)
    return null;
  const is_true = !!entry && entry.probability === 1 && entry.conviction === 1;
  const is_false = !!entry && entry.probability === 0 && entry.conviction === 1;
  return /* @__PURE__ */ h("div", null, is_true && "True", is_false && "False", /* @__PURE__ */ h("br", null), !is_true && /* @__PURE__ */ h(Button, {
    value: "Set to True",
    onClick: () => {
      on_change({...VAP_set, entries: [{...entry, probability: 1, conviction: 1}]});
    }
  }), !is_false && /* @__PURE__ */ h(Button, {
    value: "Set to False",
    onClick: () => {
      on_change({...VAP_set, entries: [{...entry, probability: 0, conviction: 1}]});
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
function SimplifiedActionForm(props) {
  return /* @__PURE__ */ h(SimplifiedFormHeader, {
    ...props,
    title: "Set action status to:"
  });
}
function SimplifiedOtherForm(props) {
  return /* @__PURE__ */ h(SimplifiedFormHeader, {
    ...props,
    title: "Set value to:"
  });
}
function SimplifiedFormHeader(props) {
  const {title, possible_value_possibilities, VAP_set, on_change} = props;
  const selected_option_id = get_VAP_set_certain_selected_value_id(VAP_set);
  const options = value_possibility_options(possible_value_possibilities);
  return /* @__PURE__ */ h("div", null, title, /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id,
    options,
    allow_none: true,
    on_change: (new_status_id) => {
      if (!new_status_id)
        return;
      const entries = update_VAP_set_VAP_probabilities(VAP_set, new_status_id);
      on_change({...VAP_set, entries});
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
function value_possibility_options(value_possibilities) {
  return value_possibilities === void 0 ? [] : Object.values(value_possibilities).map(({id, value}) => ({id, title: sentence_case(value)}));
}
function get_VAP_set_certain_selected_value_id(VAP_set) {
  let value_id = void 0;
  const conviction = VAP_set.shared_entry_values?.conviction || 0;
  const probability = VAP_set.shared_entry_values?.probability || 0;
  VAP_set.entries.forEach((VAP) => {
    if (Math.max(conviction, VAP.conviction) !== 1)
      return;
    if (Math.max(probability, VAP.probability) !== 1)
      return;
    value_id = VAP.value_id;
  });
  return value_id;
}
