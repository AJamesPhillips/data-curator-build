import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {
  WComponentCanvasConnection
} from "../wcomponent_canvas/connection/WComponentCanvasConnection.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {Canvas} from "../canvas/Canvas.js";
import {MainArea} from "../layout/MainArea.js";
import {KnowledgeGraphTimeMarkers} from "./KnowledgeGraphTimeMarkers.js";
import {TemporaryDraggedCanvasNodes} from "../canvas/TemporaryDraggedCanvasNodes.js";
const map_state = (state) => {
  const {ready_for_reading: ready} = state.sync;
  const {current_composed_knowledge_view} = state.derived;
  if (ready && !current_composed_knowledge_view)
    console.log(`No current_composed_knowledge_view`);
  const {wcomponent_nodes, wcomponent_connections, wcomponent_unfound_ids} = current_composed_knowledge_view || {};
  return {
    ready,
    wcomponent_nodes,
    wcomponent_connections,
    wcomponent_unfound_ids,
    presenting: state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _KnowledgeGraphView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: [],
      svg_upper_children: get_svg_upper_children(props),
      overlay: get_overlay_children(),
      plain_background: props.presenting
    }, elements)
  });
}
export const KnowledgeGraphView = connector(_KnowledgeGraphView);
const no_children = [];
const get_children = (props) => {
  const {ready, wcomponent_nodes = [], wcomponent_unfound_ids = []} = props;
  if (!ready)
    return no_children;
  if (wcomponent_nodes.length === 0 && wcomponent_unfound_ids.length === 0)
    return no_children;
  const elements = [
    ...wcomponent_nodes.map(({id}) => /* @__PURE__ */ h(WComponentCanvasNode, {
      key: id,
      id
    })),
    ...wcomponent_unfound_ids.map((id) => /* @__PURE__ */ h(WComponentCanvasNode, {
      key: id,
      id
    }))
  ];
  elements.push(/* @__PURE__ */ h(TemporaryDraggedCanvasNodes, null));
  return elements;
};
const get_svg_upper_children = ({wcomponent_connections = []}) => {
  return wcomponent_connections.map(({id}) => /* @__PURE__ */ h(WComponentCanvasConnection, {
    key: id,
    id
  }));
};
const get_overlay_children = () => {
  return /* @__PURE__ */ h(KnowledgeGraphTimeMarkers, null);
};
