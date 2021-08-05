import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {uncertain_datetime_is_eternal} from "../../form/datetime_utils.js";
import {get_today_date} from "../../shared/utils/date_helpers.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {ACTION_OPTIONS, get_action_status_of_VAP_set} from "../../shared/wcomponent/value_and_prediction/actions_value.js";
import {Button} from "../../sharedf/Button.js";
import {get_details2_for_single_VAP_set, get_details_for_single_VAP_set, get_summary_for_single_VAP_set} from "./common.js";
import {prepare_new_VAP_set_entries} from "./utils.js";
export const new_value_and_prediction_set = (VAPs_represent) => {
  const [show_advanced, set_show_advanced] = useState(false);
  return (VAP_set, on_change) => {
    return /* @__PURE__ */ h("div", null, VAPs_represent === VAPsType.boolean && /* @__PURE__ */ h(SimplifiedBooleanForm, {
      VAP_set,
      on_change
    }), VAPs_represent === VAPsType.action && /* @__PURE__ */ h(SimplifiedActionForm, {
      VAP_set,
      on_change
    }), /* @__PURE__ */ h(SimplifiedDatetimeForm, {
      VAP_set,
      on_change
    }), /* @__PURE__ */ h(Button, {
      value: (show_advanced ? "Hide" : "Show") + " advanced options",
      onClick: () => set_show_advanced(!show_advanced)
    }), show_advanced && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), get_summary_for_single_VAP_set(VAPs_represent, false, void 0)(VAP_set, on_change), get_details_for_single_VAP_set(VAPs_represent)(VAP_set, on_change), get_details2_for_single_VAP_set(VAPs_represent, true)(VAP_set, on_change)));
  };
};
function SimplifiedBooleanForm(props) {
  const {VAP_set, on_change} = props;
  const entry = VAP_set.entries[0];
  if (!entry)
    return null;
  const is_true = !!entry && entry.probability === 1 && entry.conviction === 1;
  const is_false = !!entry && entry.probability === 0 && entry.conviction === 1;
  return /* @__PURE__ */ h("div", null, !is_true && /* @__PURE__ */ h(Button, {
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
  const {VAP_set, on_change} = props;
  const selected_option_id = get_action_status_of_VAP_set(VAP_set);
  return /* @__PURE__ */ h("div", null, "Set action status to:", /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id,
    options: ACTION_OPTIONS,
    allow_none: true,
    on_change: (new_status) => {
      if (!new_status)
        return;
      const entries = prepare_new_VAP_set_entries(VAPsType.action, []);
      entries.forEach((VAP) => {
        const probability = VAP.value === new_status ? 1 : 0;
        VAP.relative_probability = probability;
        VAP.probability = probability;
        VAP.conviction = 1;
      });
      on_change({...VAP_set, entries});
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
function SimplifiedDatetimeForm(props) {
  const {VAP_set, on_change} = props;
  const entry = VAP_set.entries[0];
  if (!entry)
    return null;
  const is_eternal = uncertain_datetime_is_eternal(VAP_set.datetime);
  return /* @__PURE__ */ h("div", null, is_eternal && /* @__PURE__ */ h(Button, {
    value: "Set to 'From today'",
    onClick: () => on_change({...VAP_set, datetime: {min: get_today_date()}})
  }), !is_eternal && /* @__PURE__ */ h(Button, {
    value: "Set to Eternal",
    onClick: () => on_change({...VAP_set, datetime: {}})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
