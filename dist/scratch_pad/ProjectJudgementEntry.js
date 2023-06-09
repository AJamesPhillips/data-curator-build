import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {calculate_judgement_value} from "../sharedf/judgement_badge/calculate_judgement_value.js";
import {JudgementBadge} from "../sharedf/judgement_badge/JudgementBadge.js";
import {get_wcomponent_state_UI_value} from "../wcomponent_derived/get_wcomponent_state_UI_value.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {format_wcomponent_url} from "../wcomponent_derived/rich_text/templates.js";
import {RichMarkDown} from "../sharedf/RichMarkDown.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {lefttop_to_xy} from "../state/display_options/display.js";
const map_state = (state, {judgement}) => {
  const target_wc_id = judgement.judgement_target_wcomponent_id;
  const target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wc_id];
  return {
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    target_wcomponent,
    wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state)
  };
};
const connector = connect(map_state);
const _ProjectJudgementEntry = (props) => {
  if (!props.target_wcomponent)
    return /* @__PURE__ */ h("div", null, "Can not find judgement's target wcomponent of id: ", props.judgement.judgement_target_wcomponent_id);
  const {
    knowledge_view,
    judgement,
    target_wcomponent,
    wc_id_to_counterfactuals_map,
    wcomponents_by_id,
    knowledge_views_by_id,
    created_at_ms,
    sim_ms
  } = props;
  const VAP_set_id_to_counterfactual_v2_map = wc_id_to_counterfactuals_map && wc_id_to_counterfactuals_map[target_wcomponent.id]?.VAP_sets;
  return /* @__PURE__ */ h("div", {
    style: {display: "flex", flexDirection: "row", flexBasis: "100", padding: "3px 5px", margin: 2, borderBottom: "thin solid #aaa"}
  }, /* @__PURE__ */ h("div", {
    style: {flex: "5", cursor: "pointer"},
    onClick: () => {
      const wcomponent_id = target_wcomponent.id;
      const url = get_url_for_wcomponent({knowledge_view, wcomponent_id});
      window.location.href = url;
    }
  }, /* @__PURE__ */ h(RichMarkDown, {
    text: get_title({rich_text: true, wcomponents_by_id, knowledge_views_by_id, wcomponent: target_wcomponent, wc_id_to_counterfactuals_map, created_at_ms, sim_ms})
  })), /* @__PURE__ */ h("div", {
    style: {flex: "1", textAlign: "right"}
  }, get_wcomponent_state_UI_value({wcomponent: target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms}).values_string), /* @__PURE__ */ h("div", {
    style: {flex: "1"}
  }, " ", judgement.judgement_operator, " ", judgement.judgement_comparator_value), /* @__PURE__ */ h("a", {
    style: {flex: "4", cursor: "pointer", display: "flex", textDecoration: "inherit", color: "inherit"},
    href: (() => {
      const wcomponent_id = judgement.id;
      return get_url_for_wcomponent({knowledge_view, wcomponent_id});
    })()
  }, /* @__PURE__ */ h(JudgementBadge, {
    judgement: calculate_judgement_value({judgement_wcomponent: judgement, target_wcomponent, VAP_set_id_to_counterfactual_v2_map, created_at_ms, sim_ms}),
    judgement_trend_manual: judgement.judgement_trend_manual,
    size: "medium"
  }), /* @__PURE__ */ h(RichMarkDown, {
    text: get_title({rich_text: true, wcomponents_by_id, knowledge_views_by_id, wcomponent: judgement, wc_id_to_counterfactuals_map: void 0, created_at_ms, sim_ms})
  })));
};
export const ProjectJudgementEntry = connector(_ProjectJudgementEntry);
function get_url_for_wcomponent(args) {
  const position = args.knowledge_view.wc_id_map[args.wcomponent_id];
  const result = lefttop_to_xy({...position, zoom: 100}, true);
  const x = result && result.x || 0;
  const y = result && result.y || 0;
  return `/app${format_wcomponent_url("", args.wcomponent_id)}&x=${x}&y=${y}&zoom=${100}&view=knowledge&subview_id=${args.knowledge_view.id}`;
}
