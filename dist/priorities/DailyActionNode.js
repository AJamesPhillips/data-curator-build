import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {CanvasNode} from "../canvas/CanvasNode.js";
import {ACTIONS} from "../state/actions.js";
const map_dispatch = {
  set_action_ids_to_show: ACTIONS.view_priorities.set_action_ids_to_show
};
const connector = connect(null, map_dispatch);
function _DailyActionNode(props) {
  const {x, y, width, height, display, action_ids, date_shown} = props;
  const extra_styles = {
    backgroundColor: "orange",
    borderRadius: "2px",
    border: "thin solid #777",
    overflow: "hidden",
    fontSize: "7px",
    textAlign: "center"
  };
  const canvas_node = /* @__PURE__ */ h(CanvasNode, {
    position: {width, height, left: x, top: y},
    display,
    extra_styles,
    on_click: () => props.set_action_ids_to_show({action_ids, date_shown})
  }, action_ids.length);
  return canvas_node;
}
export const DailyActionNode = connector(_DailyActionNode);
