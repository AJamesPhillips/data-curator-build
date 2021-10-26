import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {KnowledgeGraphView} from "../knowledge_view/KnowledgeGraphView.js";
import {ObjectivesView} from "../objectives/ObjectivesView.js";
import {PrioritiesListView} from "../priorities_list_view/PrioritiesListView.js";
import {KnowledgeTimeView} from "../knowledge_view/KnowledgeTimeView.js";
import {OldPrioritiesView} from "../priorities/OldPrioritiesView.js";
import {ActionsListView} from "../actions_list_view/ActionsListView.js";
const map_state = (state) => {
  const {view} = state.routing.args;
  const {display_by_simulated_time} = state.display_options;
  return {view, display_by_simulated_time};
};
const connector = connect(map_state);
function _MainAreaRouter(props) {
  let el = /* @__PURE__ */ h("div", null, "Unsupported view: ", props.view, " for display_by_simulated_time: ", "" + props.display_by_simulated_time);
  if (props.view === "knowledge") {
    if (props.display_by_simulated_time)
      el = /* @__PURE__ */ h(KnowledgeTimeView, null);
    else
      el = /* @__PURE__ */ h(KnowledgeGraphView, null);
  } else if (props.view === "objectives")
    el = /* @__PURE__ */ h(ObjectivesView, null);
  else if (props.view === "priorities")
    el = /* @__PURE__ */ h(OldPrioritiesView, null);
  else if (props.view === "priorities_list")
    el = /* @__PURE__ */ h(PrioritiesListView, null);
  else if (props.view === "actions_list")
    el = /* @__PURE__ */ h(ActionsListView, null);
  return el;
}
export const MainAreaRouter = connector(_MainAreaRouter);
