import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AboutSidePanel} from "../about/AboutSidePanel.js";
import {CreationContextSidePanel} from "../creation_context/CreationContextSidePanel.js";
import {DisplayOptionsSidePanel} from "../display_options/DisplayOptionsSidePanel.js";
import {FiltersSidePanel} from "../filter_context/FiltersSidePanel.js";
import {WComponentsSidePanel} from "../knowledge/WComponentsSidePanel.js";
import {ViewsSidePanel} from "../knowledge_view/ViewsSidePanel.js";
import {PerceptionsSidePanel} from "../perceptions/PerceptionsSidePanel.js";
import {Objects} from "./Objects.js";
import {Patterns} from "./Patterns.js";
import {Statements} from "./Statements.js";
const map_state = (state) => ({
  route: state.routing.route,
  item_id: state.routing.item_id,
  presenting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _SidePanel(props) {
  if (props.presenting) {
    if (props.route === "wcomponents") {
      if (!props.item_id)
        return /* @__PURE__ */ h("div", null, "TODO: can hide this");
    }
  }
  return /* @__PURE__ */ h("div", null, props.route === "filter" && /* @__PURE__ */ h(FiltersSidePanel, null), props.route === "display" && /* @__PURE__ */ h(DisplayOptionsSidePanel, null), props.route === "statements" && /* @__PURE__ */ h(Statements, null), props.route === "objects" && /* @__PURE__ */ h(Objects, null), props.route === "patterns" && /* @__PURE__ */ h(Patterns, null), props.route === "creation_context" && /* @__PURE__ */ h(CreationContextSidePanel, null), props.route === "views" && /* @__PURE__ */ h(ViewsSidePanel, null), props.route === "perceptions" && /* @__PURE__ */ h(PerceptionsSidePanel, null), props.route === "wcomponents" && /* @__PURE__ */ h(WComponentsSidePanel, null), props.route === "about" && /* @__PURE__ */ h(AboutSidePanel, null));
}
export const SidePanel = connector(_SidePanel);
