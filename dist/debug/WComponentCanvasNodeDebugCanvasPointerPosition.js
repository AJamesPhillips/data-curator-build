import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {CanvasNode} from "../canvas/CanvasNode.js";
import {node_height_approx, NODE_WIDTH} from "../canvas/position_utils.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
import {position_from_canvas_pointer_event} from "../state/specialised_objects/subscribers/create_wcomponent_on_double_tap.js";
export function WComponentCanvasNodeDebugCanvasPointerPosition() {
  const [position, set_position] = useState({left: 0, top: 0});
  useEffect(() => {
    const unsubscribe = pub_sub.canvas.sub("canvas_move", (point) => {
      const position2 = position_from_canvas_pointer_event(point);
      set_position(position2);
    });
    return unsubscribe;
  }, []);
  return /* @__PURE__ */ h(CanvasNode, {
    position,
    extra_styles: {pointerEvents: "none"}
  }, /* @__PURE__ */ h("div", {
    style: {
      width: NODE_WIDTH,
      height: node_height_approx(),
      backgroundColor: "white"
    }
  }, "Some text"));
}
