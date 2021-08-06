import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ProjectDashboard} from "./ProjectDashboard.js";
const map_state = (state) => ({
  knowledge_views: state.derived.knowledge_views
});
const connector = connect(map_state);
const _DemoProjectDashboard = (props) => {
  const [selected_knowledge_view, select_knowledge_view] = useState(void 0);
  return /* @__PURE__ */ h("div", null, "DemoProjectDashboard", props.knowledge_views.map((kv) => {
    return /* @__PURE__ */ h("div", {
      onClick: () => select_knowledge_view(kv.id),
      style: {
        fontWeight: kv.id === selected_knowledge_view ? "bold" : "initial",
        cursor: "pointer"
      }
    }, kv.title);
  }), selected_knowledge_view && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(ProjectDashboard, {
    knowledge_view_id: selected_knowledge_view
  })));
};
export const DemoProjectDashboard = connector(_DemoProjectDashboard);
