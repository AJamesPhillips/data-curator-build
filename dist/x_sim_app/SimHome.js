import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {SimulationSummary} from "./SimulationSummary.js";
import {get_simulations} from "./simulations.js";
import {supabase_load_data} from "../state/sync/supabase/supabase_load_data.js";
import {get_items_by_id} from "../shared/utils/get_items.js";
const initial_data = {};
export function SimHome() {
  const [knowledge_views_by_id, set_knowledge_views_by_id] = useState(initial_data);
  const [wcomponents_by_id, set_wcomponents_by_id] = useState({});
  const [simulations, set_simulations] = useState([]);
  useEffect(() => {
    supabase_load_data(true, 14).then((data) => {
      set_knowledge_views_by_id(get_items_by_id(data.knowledge_views, ""));
      set_wcomponents_by_id(get_items_by_id(data.wcomponents, ""));
    });
    get_simulations().then((sims) => set_simulations(sims));
  }, []);
  if (knowledge_views_by_id === initial_data)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h2", null, "Simulations"), "Loading...");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h2", null, "Simulations"), simulations.map((simulation) => /* @__PURE__ */ h(SimulationSummary, {
    simulation,
    knowledge_views_by_id,
    wcomponents_by_id
  })));
}
