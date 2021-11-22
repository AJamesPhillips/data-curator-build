import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "./WComponentJudgements.css.proxy.js";
import {JudgementBadgeConnected} from "../../sharedf/judgement_badge/JudgementBadgeConnected.js";
import {JudgementBadgeSimple} from "../../sharedf/judgement_badge/JudgementBadgeSimple.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
const map_state = (state) => {
  const current_composed_kv = get_current_composed_knowledge_view_from_state(state);
  return {
    active_judgement_or_objective_ids_by_target_id: current_composed_kv?.active_judgement_or_objective_ids_by_target_id,
    active_judgement_or_objective_ids_by_goal_or_action_id: current_composed_kv?.active_judgement_or_objective_ids_by_goal_or_action_id
  };
};
const connector = connect(map_state);
function _WComponentJudgements(props) {
  const {
    active_judgement_or_objective_ids_by_target_id,
    active_judgement_or_objective_ids_by_goal_or_action_id,
    target_VAPs_represent,
    value
  } = props;
  const judgement_or_objective_ids = useMemo(() => {
    return [
      ...(active_judgement_or_objective_ids_by_target_id || {})[props.wcomponent.id] || [],
      ...(active_judgement_or_objective_ids_by_goal_or_action_id || {})[props.wcomponent.id] || []
    ];
  }, [
    active_judgement_or_objective_ids_by_target_id,
    active_judgement_or_objective_ids_by_goal_or_action_id
  ]);
  const node_judgements_container_class_name = "node_judgements_container " + (judgement_or_objective_ids.length ? "" : "empty");
  if (value === void 0 || target_VAPs_represent === void 0) {
    return /* @__PURE__ */ h("div", {
      className: node_judgements_container_class_name
    }, judgement_or_objective_ids.map((id) => /* @__PURE__ */ h(JudgementBadgeConnected, {
      judgement_or_objective_id: id
    })));
  }
  return /* @__PURE__ */ h("div", {
    className: node_judgements_container_class_name
  }, judgement_or_objective_ids.map((id) => /* @__PURE__ */ h(JudgementBadgeSimple, {
    judgement_or_objective_id: id,
    target_VAPs_represent,
    value
  })));
}
export const WComponentJudgements = connector(_WComponentJudgements);
