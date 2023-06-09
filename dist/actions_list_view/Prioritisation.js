import {h} from "../../snowpack/pkg/preact.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
export function Prioritisation({prioritisation}) {
  return /* @__PURE__ */ h(WComponentCanvasNode, {
    id: prioritisation.id,
    is_on_canvas: false,
    always_show: true
  });
}
