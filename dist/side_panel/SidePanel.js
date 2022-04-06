import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AboutSidePanel} from "../about/AboutSidePanel.js";
import {CreationContextSidePanel} from "../creation_context/CreationContextSidePanel.js";
import {DisplayOptionsSidePanel} from "../display_options/DisplayOptionsSidePanel.js";
import {FiltersSidePanel} from "../filter_context/FiltersSidePanel.js";
import {ViewsSidePanel} from "../knowledge_view/ViewsSidePanel.js";
import {SearchSidePanel} from "../search/SearchSidePanel.js";
import {SelectionControlSidePanel} from "../selection_control/SelectionControlSidePanel.js";
import "./SidePanel.css.proxy.js";
import {WComponentsSidePanel} from "./wcomponents/WComponentsSidePanel.js";
const map_state = (state) => ({
  route: state.routing.route
});
const connector = connect(map_state);
function _SidePanel(props) {
  return /* @__PURE__ */ h("div", null, props.route === "filter" && /* @__PURE__ */ h(FiltersSidePanel, null), props.route === "select" && /* @__PURE__ */ h(SelectionControlSidePanel, null), props.route === "display" && /* @__PURE__ */ h(DisplayOptionsSidePanel, null), props.route === "creation_context" && /* @__PURE__ */ h(CreationContextSidePanel, null), props.route === "views" && /* @__PURE__ */ h(ViewsSidePanel, null), props.route === "wcomponents" && /* @__PURE__ */ h(WComponentsSidePanel, null), props.route === "about" && /* @__PURE__ */ h(AboutSidePanel, null), props.route === "search" && /* @__PURE__ */ h(SearchSidePanel, null));
}
export const SidePanel = connector(_SidePanel);
