import {h} from "../../snowpack/pkg/preact.js";
import {SimulationScenarioSummary} from "./SimulationScenarioSummary.js";
export function SimulationSummary(props) {
  const {foundational_knowledge_view_id, scenario_knowledge_view_ids} = props.simulation;
  const {knowledge_views_by_id, wcomponents_by_id} = props;
  const base_kv = knowledge_views_by_id[foundational_knowledge_view_id];
  if (!base_kv)
    return /* @__PURE__ */ h("div", null, "Unknown simulation base knowledge view for id: ", foundational_knowledge_view_id);
  const created_at_ms = new Date().getTime();
  const sim_ms = created_at_ms;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, base_kv.title), /* @__PURE__ */ h("i", null, "Scenarios"), scenario_knowledge_view_ids.map((id) => /* @__PURE__ */ h(SimulationScenarioSummary, {
    key: id,
    simulation: props.simulation,
    scenario_kv_id: id,
    knowledge_views_by_id,
    wcomponents_by_id,
    created_at_ms,
    sim_ms
  })));
}
