import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import Markdown from "../../../snowpack/pkg/markdown-to-jsx.js";
import "./ProjectPriorityNode.css.proxy.js";
import {ACTIONS} from "../../state/actions.js";
import {CanvasNode} from "../../canvas/CanvasNode.js";
import {get_title} from "../../wcomponent_derived/rich_text/get_rich_text.js";
import {MARKDOWN_OPTIONS} from "../../sharedf/RichMarkDown.js";
const map_state = (state) => ({
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  created_at_ms: state.routing.args.created_at_ms
});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ProjectPriorityNode(props) {
  const {wcomponents_by_id, created_at_ms, x, y, width, height, effort, display} = props;
  const wcomponent = wcomponents_by_id[props.wcomponent_id];
  if (!wcomponent)
    return null;
  const title = get_title({
    rich_text: true,
    wcomponent,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map: {},
    created_at_ms,
    sim_ms: new Date().getTime()
  });
  const w = effort > 0 ? Math.max(width, 150) : 150;
  const percent = `${Math.round(effort * 100)}%`;
  const backgroundImage = `linear-gradient(to top, #a6eaff ${percent}, rgba(0,0,0,0) ${percent})`;
  const style_inner = {
    backgroundImage,
    backgroundColor: "white"
  };
  return /* @__PURE__ */ h(CanvasNode, {
    position: {left: x, top: y, width: w, height},
    display,
    on_pointer_down: (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();
      props.change_route({item_id: props.wcomponent_id});
    },
    extra_css_class: " unlimited_width_on_hover "
  }, /* @__PURE__ */ h("div", {
    className: "node_main_content",
    style: style_inner
  }, " ", /* @__PURE__ */ h("span", {
    title
  }, /* @__PURE__ */ h(Markdown, {
    options: MARKDOWN_OPTIONS
  }, title)), effort > 0 && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("span", {
    style: {color: "grey", fontSize: 10}
  }, "  Effort ", percent))));
}
export const ProjectPriorityNode = connector(_ProjectPriorityNode);
