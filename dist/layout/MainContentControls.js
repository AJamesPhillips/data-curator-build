import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {KnowledgeContentControls} from "../knowledge_view/KnowledgeContentControls.js";
import {PrioritiesContentControls} from "../priorities/PrioritiesContentControls.js";
const map_state = (state) => ({
  view: state.routing.args.view
});
const connector = connect(map_state);
function _MainContentControls(props) {
  const {view} = props;
  return /* @__PURE__ */ h("div", {
    className: "main_content_controls"
  }, view === "knowledge" && /* @__PURE__ */ h(KnowledgeContentControls, null), view === "priorities" && /* @__PURE__ */ h(PrioritiesContentControls, null));
}
export const MainContentControls = connector(_MainContentControls);
