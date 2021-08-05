import {h} from "../../../_snowpack/pkg/preact.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {EditableTextSingleLine} from "../../form/editable_text/EditableTextSingleLine.js";
import {sentence_case} from "../../shared/utils/sentence_case.js";
import {get_boolean_representation} from "../../shared/wcomponent/get_wcomponent_state_UI_value.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {
  judgement_operators
} from "../../shared/wcomponent/interfaces/judgement.js";
import {wcomponent_VAPs_represent} from "../../shared/wcomponent/value_and_prediction/utils.js";
import {get_wcomponent_counterfactuals} from "../../state/derived/accessor.js";
import {get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {calculate_judgement_value} from "../judgements/calculate_judgement_value.js";
import {JudgementBadge} from "../judgements/JudgementBadge.js";
import {WComponentFromTo} from "../WComponentFromTo.js";
const map_state = (state, {wcomponent}) => {
  const target_id = wcomponent.judgement_target_wcomponent_id;
  const target_wcomponent = get_wcomponent_from_state(state, target_id);
  const target_counterfactuals = get_wcomponent_counterfactuals(state, target_id);
  return {
    target_wcomponent,
    target_counterfactuals,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const connector = connect(map_state);
function _JudgementFormFields(props) {
  const {wcomponent, upsert_wcomponent, target_wcomponent, target_counterfactuals, created_at_ms, sim_ms} = props;
  const {judgement_manual} = wcomponent;
  const selected_option_id_for_manual = judgement_manual === void 0 ? void 0 : judgement_manual.toString();
  const judgement = calculate_judgement_value({judgement_wcomponent: wcomponent, target_wcomponent, target_counterfactuals, created_at_ms, sim_ms});
  const target_VAPs_represent = wcomponent_VAPs_represent(target_wcomponent);
  let boolean_options = [];
  if (target_VAPs_represent === VAPsType.boolean) {
    const result = get_boolean_representation({wcomponent: target_wcomponent, append_boolean: true});
    boolean_options = [
      {id: "True", title: result.true},
      {id: "False", title: result.false}
    ];
  }
  return /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentFromTo, {
    connection_terminal_description: "Target",
    wcomponent_id: target_wcomponent && target_wcomponent.id,
    connection_terminal_type: "meta",
    on_update_id: (judgement_target_wcomponent_id) => {
      const update = {judgement_target_wcomponent_id};
      if (!wcomponent.title && judgement_target_wcomponent_id) {
        update.title = sentence_case(wcomponent.type) + `: @@${judgement_target_wcomponent_id}`;
      }
      upsert_wcomponent(update);
    }
  }), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Comparator:   ", /* @__PURE__ */ h(AutocompleteText, {
    extra_styles: {width: 30},
    placeholder: "Operator...",
    selected_option_id: wcomponent.judgement_operator,
    options: judgement_operator_options,
    on_change: (option_id) => upsert_wcomponent({judgement_operator: option_id})
  }), " ", target_VAPs_represent !== VAPsType.boolean && /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Value...",
    value: wcomponent.judgement_comparator_value || "",
    conditional_on_change: (new_value) => {
      const judgement_comparator_value = new_value.trim();
      if (judgement_comparator_value === wcomponent.judgement_comparator_value)
        return;
      upsert_wcomponent({judgement_comparator_value});
    }
  }), target_VAPs_represent === VAPsType.boolean && /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Value...",
    selected_option_id: wcomponent.judgement_comparator_value,
    options: boolean_options,
    on_change: (judgement_comparator_value) => {
      if (!judgement_comparator_value)
        return;
      if (judgement_comparator_value === wcomponent.judgement_comparator_value)
        return;
      upsert_wcomponent({judgement_comparator_value});
    }
  }))), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Manual:   ", /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Manual override...",
    allow_none: true,
    selected_option_id: selected_option_id_for_manual,
    options: manual_options,
    on_change: (option_id) => {
      const judgement_manual2 = option_id === void 0 ? void 0 : option_id === "true" ? true : false;
      upsert_wcomponent({judgement_manual: judgement_manual2});
    }
  }))), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Current value:   ", /* @__PURE__ */ h(JudgementBadge, {
    judgement
  }))));
}
export const JudgementFormFields = connector(_JudgementFormFields);
const judgement_operator_options = judgement_operators.map((op) => ({id: op, title: op}));
const manual_options = [{id: "true", title: "Good"}, {id: "false", title: "Bad"}];
