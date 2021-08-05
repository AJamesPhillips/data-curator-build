import {h} from "../../../_snowpack/pkg/preact.js";
import {CanvasNode} from "../../canvas/CanvasNode.js";
import {DailyActionsList} from "./DailyActionsList.js";
export function DailyActionNode(props) {
  const [action_ids_to_show, set_action_ids_to_show] = [[], (action_ids2) => {
  }];
  const {x, y, width, height, display, action_ids} = props;
  const extra_styles = {
    backgroundColor: "orange",
    borderRadius: "2px",
    border: "thin solid #777"
  };
  const canvas_node = /* @__PURE__ */ h(CanvasNode, {
    position: {width, height, left: x, top: y},
    display,
    extra_styles,
    title: `${action_ids.length} actions`,
    on_click: () => set_action_ids_to_show(action_ids)
  });
  if (action_ids_to_show.length === 0)
    return canvas_node;
  else
    return /* @__PURE__ */ h("div", null, canvas_node, /* @__PURE__ */ h(DailyActionsList, {
      action_ids_to_show,
      on_close: () => set_action_ids_to_show([])
    }));
}
