import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import "./PrioritisationEntryNode.css.proxy.js";
import {ACTIONS} from "../state/actions.js";
import {CanvasNode} from "../canvas/CanvasNode.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
import {MARKDOWN_OPTIONS} from "../sharedf/RichMarkDown.js";
const map_state = (state) => ({
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  created_at_ms: state.routing.args.created_at_ms
});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _PrioritisationEntryNode(props) {
  const {wcomponents_by_id, knowledge_views_by_id, created_at_ms, x, y, width, height, effort, display} = props;
  const wcomponent = wcomponents_by_id[props.wcomponent_id];
  if (!wcomponent)
    return null;
  const title = get_title({
    rich_text: true,
    wcomponent,
    wcomponents_by_id,
    knowledge_views_by_id,
    wc_id_to_counterfactuals_map: void 0,
    created_at_ms,
    sim_ms: new Date().getTime()
  });
  const initial_w = Math.max(width, 60);
  const hover_w = Math.max(width, 250);
  const [w, set_w] = useState(initial_w);
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
    on_pointer_enter: () => set_w(hover_w),
    on_pointer_leave: () => set_w(initial_w),
    extra_css_class: " prioritisation_entry "
  }, /* @__PURE__ */ h("div", {
    className: "node_main_content",
    style: style_inner
  }, " ", /* @__PURE__ */ h("span", {
    title
  }, /* @__PURE__ */ h(Markdown, {
    options: MARKDOWN_OPTIONS
  }, title)), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("span", {
    style: {color: "grey", fontSize: 10}
  }, "  ", effort > 0 && `Effort ${percent}`))));
}
export const PrioritisationEntryNode = connector(_PrioritisationEntryNode);
