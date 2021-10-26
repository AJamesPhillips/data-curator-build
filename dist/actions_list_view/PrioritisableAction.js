import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _PrioritisableAction(props) {
  const {action} = props;
  return /* @__PURE__ */ h("div", {
    style: {display: "flex", margin: 10}
  }, /* @__PURE__ */ h(WComponentCanvasNode, {
    id: action.id,
    is_movable: false,
    always_show: true
  }));
}
export const PrioritisableAction = connector(_PrioritisableAction);
