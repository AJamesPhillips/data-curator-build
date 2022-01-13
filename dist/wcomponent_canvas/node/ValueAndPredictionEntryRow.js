import {h} from "../../../snowpack/pkg/preact.js";
import "./ValueAndPredictionSetSummary.css.proxy.js";
import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {WComponentJudgements} from "./WComponentJudgements.js";
import {ExploreButtonHandle} from "./ExploreButtonHandle.js";
import {Link} from "../../sharedf/Link.js";
import {AltRouteIcon} from "../../sharedf/icons/AltRouteIcon.js";
export function ValueAndPredictionEntryRow(props) {
  const {VAP_visual, show_judgements, counterfactual_VAP_set, VAP_id_to_counterfactuals_info_map} = props;
  const VAPs_represent = get_wcomponent_VAPs_represent(props.wcomponent);
  const certainty_percent_num = VAP_visual.certainty * 100;
  const certainty_percent_str = `${certainty_percent_num}%`;
  const rounded_certainty_percent = Math.round(certainty_percent_num);
  const rounded_certainty_percent_str = `${rounded_certainty_percent}%`;
  let font_size = 100;
  if (rounded_certainty_percent < 100) {
    font_size = rounded_certainty_percent * 1.25;
  }
  const cf_entries = VAP_id_to_counterfactuals_info_map[VAP_visual.VAP_id] || [];
  const warning_color = counterfactual_VAP_set.has_any_counterfactual_applied ? "warning_color" : "";
  return /* @__PURE__ */ h("div", {
    className: `value_and_prediction prob-${rounded_certainty_percent} ${warning_color}`,
    style: {
      fontSize: `${font_size}%`,
      maxHeight: certainty_percent_str,
      minHeight: certainty_percent_str
    }
  }, VAP_visual.value_text, show_judgements && /* @__PURE__ */ h(WComponentJudgements, {
    wcomponent: props.wcomponent,
    target_VAPs_represent: VAPs_represent,
    value: VAP_visual.parsed_value,
    hide_judgement_trend: true
  }), cf_entries.map((entry) => /* @__PURE__ */ h(CounterfactualLink, {
    any_active: counterfactual_VAP_set.has_any_counterfactual_applied,
    counterfactual: entry,
    active_counterfactual_v2_id: counterfactual_VAP_set.active_counterfactual_v2_id
  })));
}
function CounterfactualLink(props) {
  const this_counterfactual_active = props.counterfactual.counterfactual_v2_id === props.active_counterfactual_v2_id;
  const color = this_counterfactual_active ? "darkorange" : props.any_active ? "white" : "#ffc965";
  const style = {
    fontSize: "25px",
    color,
    verticalAlign: "middle",
    fontWeight: "bold"
  };
  return /* @__PURE__ */ h("span", {
    onPointerDown: (e) => e.stopImmediatePropagation(),
    onClick: (e) => e.stopImmediatePropagation()
  }, " ", /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: props.counterfactual.counterfactual_v2_id,
    args: void 0,
    extra_css_style: style
  }, /* @__PURE__ */ h(AltRouteIcon, {
    fontSize: "small"
  })), props.counterfactual.counterfactual_has_knowledge_view && /* @__PURE__ */ h("span", {
    style: {fontSize: 14}
  }, /* @__PURE__ */ h(ExploreButtonHandle, {
    wcomponent_id: props.counterfactual.counterfactual_v2_id || "",
    is_highlighted: true
  })), " ");
}
