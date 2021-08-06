import {h} from "../../snowpack/pkg/preact.js";
import {WComponentCanvasConnection} from "../knowledge/WComponentCanvasConnection.js";
import {WComponentCanvasNode} from "../knowledge/canvas_node/WComponentCanvasNode.js";
import {Canvas} from "../canvas/Canvas.js";
import {MainArea} from "../layout/MainArea.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
const map_state = (state) => {
  const sync_ready = state.sync.ready;
  const {current_composed_knowledge_view} = state.derived;
  if (sync_ready && !current_composed_knowledge_view)
    console.log(`No current_composed_knowledge_view`);
  const {selected_wcomponent_ids_map} = state.meta_wcomponents;
  let wcomponent_nodes = [];
  if (current_composed_knowledge_view) {
    wcomponent_nodes = current_composed_knowledge_view.wcomponent_nodes;
  }
  return {
    sync_ready,
    wcomponent_nodes,
    wcomponent_connections: current_composed_knowledge_view && current_composed_knowledge_view.wcomponent_connections,
    presenting: state.display_options.consumption_formatting,
    selected_wcomponent_ids_map
  };
};
const connector = connect(map_state);
function _KnowledgeGraphView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: [],
      svg_upper_children: get_svg_upper_children(props),
      plain_background: props.presenting
    }, elements)
  });
}
export const KnowledgeGraphView = connector(_KnowledgeGraphView);
const no_children = [];
const get_children = (props) => {
  const {sync_ready} = props;
  let {wcomponent_nodes} = props;
  if (!sync_ready || !wcomponent_nodes)
    return no_children;
  const elements = wcomponent_nodes.map(({id}) => /* @__PURE__ */ h(WComponentCanvasNode, {
    key: id,
    id
  }));
  return elements;
};
const no_svg_upper_children = [];
const get_svg_upper_children = ({wcomponent_connections}) => {
  if (!wcomponent_connections)
    return no_svg_upper_children;
  return wcomponent_connections.map(({id}) => /* @__PURE__ */ h(WComponentCanvasConnection, {
    key: id,
    id
  }));
};
