import {h} from "../../../_snowpack/pkg/preact.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import "./WComponentJudgements.css.proxy.js";
import {JudgementBadgeConnected} from "./JudgementBadgeConnected.js";
import {JudgementBadgeSimple} from "./JudgementBadgeSimple.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
const map_state = (state, own_props) => {
  const current_composed_kv = get_current_composed_knowledge_view_from_state(state);
  const wc_id_map = current_composed_kv?.composed_wc_id_map || {};
  const judgement_or_objective_ids = [
    ...state.derived.judgement_or_objective_ids_by_target_id[own_props.wcomponent.id] || [],
    ...state.derived.judgement_or_objective_ids_by_goal_id[own_props.wcomponent.id] || []
  ].filter((id) => !!wc_id_map[id]);
  return {
    judgement_or_objective_ids
  };
};
const connector = connect(map_state);
function _WComponentJudgements(props) {
  const {judgement_or_objective_ids: ids, target_VAPs_represent, value} = props;
  const node_judgements_container_class_name = "node_judgements_container " + (ids.length ? "" : "empty");
  if (value === void 0 || target_VAPs_represent === void 0) {
    return /* @__PURE__ */ h("div", {
      className: node_judgements_container_class_name
    }, ids.map((id) => /* @__PURE__ */ h(JudgementBadgeConnected, {
      judgement_or_objective_id: id
    })));
  }
  return /* @__PURE__ */ h("div", {
    className: node_judgements_container_class_name
  }, ids.map((id) => /* @__PURE__ */ h(JudgementBadgeSimple, {
    judgement_or_objective_id: id,
    target_VAPs_represent,
    value
  })));
}
export const WComponentJudgements = connector(_WComponentJudgements);
