import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useMemo, useState} from "../../snowpack/pkg/preact/hooks.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
import {throttle} from "../utils/throttle.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
export function TemporaryDraggedCanvasNodes() {
  const [wcomponent_ids, set_wcomponent_ids] = useState([]);
  const [relative_position, _set_relative_position] = useState(void 0);
  const set_relative_position = useMemo(() => {
    const set_relative_position2 = (new_rel_pos) => _set_relative_position(new_rel_pos);
    const throttle_set_relative_position = throttle(set_relative_position2, 30);
    return throttle_set_relative_position;
  }, []);
  useEffect(() => {
    const unsubscribe_ids = pub_sub.canvas.sub("canvas_node_drag_wcomponent_ids", (ids) => {
      set_wcomponent_ids(ids);
    });
    const unsubscribe_position = pub_sub.canvas.sub("canvas_node_drag_relative_position", (new_relative_position) => {
      set_relative_position.throttled(new_relative_position);
      if (new_relative_position === void 0)
        set_relative_position.flush();
    });
    return () => {
      unsubscribe_ids();
      unsubscribe_position();
    };
  });
  if (!relative_position)
    return null;
  return /* @__PURE__ */ h("div", null, wcomponent_ids.map((wcomponent_id) => /* @__PURE__ */ h(WComponentCanvasNode, {
    key: `temporary_dragged_canvas_node_${wcomponent_id}`,
    id: wcomponent_id,
    drag_relative_position: relative_position
  })));
}
