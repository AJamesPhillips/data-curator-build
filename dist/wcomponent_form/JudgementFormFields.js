import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {EditableTextSingleLine} from "../form/editable_text/EditableTextSingleLine.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
import {VAPsType} from "../wcomponent/interfaces/VAPsType.js";
import {
  judgement_operators,
  judgement_trends
} from "../wcomponent/interfaces/judgement.js";
import {get_wcomponent_VAPs_represent} from "../wcomponent/get_wcomponent_VAPs_represent.js";
import {get_VAP_set_id_to_counterfactual_v2_map} from "../state/derived/accessor.js";
import {get_wcomponent_from_state} from "../state/specialised_objects/accessors.js";
import {calculate_judgement_value} from "../sharedf/judgement_badge/calculate_judgement_value.js";
import {JudgementBadge} from "../sharedf/judgement_badge/JudgementBadge.js";
import {WComponentFromTo} from "./WComponentFromTo.js";
import {get_boolean_representation} from "../wcomponent_derived/value/parsed_value_presentation.js";
const map_state = (state, {wcomponent}) => {
  const target_id = wcomponent.judgement_target_wcomponent_id;
  const target_wcomponent = get_wcomponent_from_state(state, target_id);
  const VAP_set_id_to_counterfactual_v2_map = get_VAP_set_id_to_counterfactual_v2_map(state, target_id);
  return {
    target_wcomponent,
    VAP_set_id_to_counterfactual_v2_map,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    is_editing: !state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _JudgementFormFields(props) {
  const {wcomponent, upsert_wcomponent, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms} = props;
  const {judgement_manual, judgement_trend_manual} = wcomponent;
  const selected_option_id_for_manual = judgement_manual === void 0 ? void 0 : judgement_manual.toString();
  const judgement = calculate_judgement_value({judgement_wcomponent: wcomponent, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms});
  const wcomponents_by_id = {};
  const target_VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent, wcomponents_by_id);
  let boolean_options = [];
  if (target_VAPs_represent === VAPsType.boolean) {
    const result = get_boolean_representation(target_wcomponent, true);
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
  }), (props.is_editing || selected_option_id_for_manual !== void 0) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
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
  }))), selected_option_id_for_manual === void 0 && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
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
  }))), (props.is_editing || judgement_trend_manual !== void 0 && judgement_trend_manual !== "not_assessed") && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Manual trend:   ", /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Manual trend...",
    allow_none: true,
    selected_option_id: judgement_trend_manual || "Not assessed",
    options: manual_trend_options,
    on_change: (option_id) => {
      const judgement_trend_manual2 = option_id === "not_assessed" ? void 0 : option_id;
      upsert_wcomponent({judgement_trend_manual: judgement_trend_manual2});
    }
  }))), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Current value:   ", /* @__PURE__ */ h(JudgementBadge, {
    judgement,
    judgement_trend_manual,
    size: "medium"
  }))));
}
export const JudgementFormFields = connector(_JudgementFormFields);
const judgement_operator_options = judgement_operators.map((op) => ({id: op, title: op}));
const manual_options = [{id: "true", title: "Good"}, {id: "false", title: "Bad"}];
const manual_trend_options = judgement_trends.map((t) => ({id: t, title: sentence_case(t).replaceAll("_", " ")}));
