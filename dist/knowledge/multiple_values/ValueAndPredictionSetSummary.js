import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import "./ValueAndPredictionSetSummary.css.proxy.js";
import {wcomponent_VAPs_represent} from "../../shared/wcomponent/value_and_prediction/utils.js";
import {WComponentJudgements} from "../judgements/WComponentJudgements.js";
import {get_VAP_visuals_data} from "../../shared/counterfactuals/convert_VAP_sets_to_visual_VAP_sets.js";
import {ExploreButtonHandle} from "../canvas_node/ExploreButtonHandle.js";
import {Link} from "../../sharedf/Link.js";
export function ValueAndPredictionSetSummary(props) {
  const [show_all_judgements, set_show_all_judgements] = useState(false);
  const {counterfactual_VAP_set: VAP_set} = props;
  const VAPs_represent = wcomponent_VAPs_represent(props.wcomponent);
  const raw_data = get_VAP_visuals_data({...props, VAP_set, VAPs_represent});
  const put_most_probable_last = false;
  const data = put_most_probable_last ? raw_data.reverse() : raw_data;
  const data_with_non_zero_certainty = data.filter((d) => d.certainty > 0);
  return /* @__PURE__ */ h(Box, {
    height: "100%",
    maxWidth: "100%",
    minWidth: 100,
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    alignContent: "stretch",
    className: `value_and_prediction_set_summary items-${data.length} visible-${data_with_non_zero_certainty.length}`,
    onPointerOver: () => set_show_all_judgements(true),
    onPointerLeave: () => set_show_all_judgements(false)
  }, data.map((vap_visual, index) => {
    const certainty_percent_num = vap_visual.certainty * 100;
    const certainty_percent_str = `${certainty_percent_num}%`;
    const rounded_certainty_percent = Math.round(certainty_percent_num);
    const rounded_certainty_percent_str = `${rounded_certainty_percent}%`;
    let font_size = 100;
    if (rounded_certainty_percent < 100) {
      font_size = rounded_certainty_percent * 1.25;
    }
    const show_judgements = show_all_judgements || index === (put_most_probable_last ? data.length - 1 : 0);
    const cf_entries = VAP_set.target_VAP_id_counterfactual_map[vap_visual.id] || [];
    return /* @__PURE__ */ h(Box, {
      className: `value_and_prediction prob-${rounded_certainty_percent}`,
      p: 2,
      boxSizing: "border-box",
      position: "relative",
      bgcolor: VAP_set.has_counterfactual_applied ? "warning.main" : "primary.main",
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      fontSize: `${font_size}%`,
      lineHeight: "1em",
      maxHeight: certainty_percent_str,
      minHeight: certainty_percent_str,
      maxWidth: "100%"
    }, /* @__PURE__ */ h(Box, {
      fontSize: "inherit",
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      overflowX: "hidden",
      overflowY: "visible",
      textOverflow: "ellipsis",
      position: "relative",
      zIndex: 10
    }, vap_visual.value_text, show_judgements && /* @__PURE__ */ h(WComponentJudgements, {
      wcomponent: props.wcomponent,
      target_VAPs_represent: VAPs_represent,
      value: vap_visual.value
    }), cf_entries.map((entry) => /* @__PURE__ */ h(CounterfactualLink, {
      any_active: VAP_set.has_counterfactual_applied,
      counterfactual: entry,
      active_counterfactual_v2_id: VAP_set.active_counterfactual_v2_id
    }))));
  }));
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
  }, "⑂"), props.counterfactual.counterfactual_has_knowledge_view && /* @__PURE__ */ h("span", {
    style: {fontSize: 14}
  }, /* @__PURE__ */ h(ExploreButtonHandle, {
    wcomponent_id: props.counterfactual.counterfactual_v2_id || "",
    is_highlighted: true
  })), " ");
}
