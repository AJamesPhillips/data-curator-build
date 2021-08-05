import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ProjectJudgementEntry} from "./ProjectJudgementEntry.js";
const map_state = (state, {knowledge_view_id}) => ({
  judgements: state.derived.wcomponent_ids_by_type.judgement,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  knowledge_view: state.specialised_objects.knowledge_views_by_id[knowledge_view_id]
});
const connector = connect(map_state);
const _ProjectDashboard = (props) => {
  const {knowledge_view} = props;
  if (!knowledge_view)
    return /* @__PURE__ */ h("div", null, "Can not find Knowledge view of id: ", props.knowledge_view_id);
  const ids_in_kv = Object.keys(knowledge_view.wc_id_map);
  const judgements = ids_in_kv.filter((id) => props.judgements.has(id)).map((id) => props.wcomponents_by_id[id]).filter((wc) => !!wc).sort((j1, j2) => j1.judgement_target_wcomponent_id < j2.judgement_target_wcomponent_id ? -1 : j1.judgement_target_wcomponent_id > j2.judgement_target_wcomponent_id ? 1 : 0);
  const ms = new Date().getTime();
  return /* @__PURE__ */ h("div", {
    style: {display: "flex", flexDirection: "column"}
  }, judgements.map((judgement) => /* @__PURE__ */ h(ProjectJudgementEntry, {
    knowledge_view,
    judgement,
    created_at_ms: ms,
    sim_ms: ms
  })));
};
export const ProjectDashboard = connector(_ProjectDashboard);
