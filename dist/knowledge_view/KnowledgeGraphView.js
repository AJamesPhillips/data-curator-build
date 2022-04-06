import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {
  WComponentCanvasConnection
} from "../wcomponent_canvas/connection/WComponentCanvasConnection.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {Canvas} from "../canvas/Canvas.js";
import {MainArea} from "../layout/MainArea.js";
import {KnowledgeGraphTimeMarkers} from "./KnowledgeGraphTimeMarkers.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
const map_state = (state) => {
  const {ready_for_reading: ready} = state.sync;
  const {current_composed_knowledge_view} = state.derived;
  if (ready && !current_composed_knowledge_view)
    console.log(`No current_composed_knowledge_view`);
  const {wcomponent_nodes, wcomponent_connections, wcomponent_unfound_ids} = current_composed_knowledge_view || {};
  const any_node_is_moving = state.meta_wcomponents.wcomponent_ids_to_move_set.size > 0;
  const any_frame_is_resizing = state.meta_wcomponents.frame_is_resizing;
  const canvas_drag_event = any_node_is_moving || any_frame_is_resizing;
  return {
    ready,
    wcomponent_nodes,
    wcomponent_connections,
    wcomponent_unfound_ids,
    presenting: state.display_options.consumption_formatting,
    show_large_grid: state.display_options.show_large_grid,
    canvas_drag_event
  };
};
const connector = connect(map_state);
function _KnowledgeGraphView(props) {
  const elements = get_children(props);
  const [canvas_pointed_down, set_canvas_pointed_down] = useState(false);
  useEffect(() => {
    return pub_sub.canvas.sub("canvas_pointer_down", () => {
      set_canvas_pointed_down(true);
    });
  });
  useEffect(() => {
    return pub_sub.canvas.sub("canvas_pointer_up", () => {
      set_canvas_pointed_down(false);
    });
  });
  const extra_class_names = props.canvas_drag_event || canvas_pointed_down ? " canvas_drag_event " : "";
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: [],
      svg_upper_children: get_svg_upper_children(props),
      overlay: get_overlay_children(),
      plain_background: props.presenting,
      show_large_grid: props.show_large_grid,
      extra_class_names
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
