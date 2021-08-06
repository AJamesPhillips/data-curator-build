import {h} from "../../snowpack/pkg/preact.js";
import {WComponentCanvasNode} from "../knowledge/canvas_node/WComponentCanvasNode.js";
export function Prioritisation({prioritisation}) {
  return /* @__PURE__ */ h(WComponentCanvasNode, {
    id: prioritisation.id,
    on_graph: false
  });
}
