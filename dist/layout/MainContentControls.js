import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {KnowledgeContentControls} from "../knowledge_view/KnowledgeContentControls.js";
import {ObjectivesContentControls} from "../objectives/ObjectivesContentControls.js";
const map_state = (state) => ({
  view: state.routing.args.view
});
const connector = connect(map_state);
function _MainContentControls(props) {
  const {view} = props;
  return /* @__PURE__ */ h("div", {
    className: "main_content_controls"
  }, view === "knowledge" && /* @__PURE__ */ h(KnowledgeContentControls, null), view === "objectives" && /* @__PURE__ */ h(ObjectivesContentControls, null));
}
export const MainContentControls = connector(_MainContentControls);
