import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import ArrowForwardIcon from "../../snowpack/pkg/@material-ui/icons/ArrowForward.js";
import ArrowUpwardIcon from "../../snowpack/pkg/@material-ui/icons/ArrowUpward.js";
import ArrowBackIcon from "../../snowpack/pkg/@material-ui/icons/ArrowBack.js";
import "./PrioritisableAction.css.proxy.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {ACTIONS} from "../state/actions.js";
import {IconButton} from "../../snowpack/pkg/@material-ui/core.js";
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _PrioritisableAction(props) {
  const {action, upsert_wcomponent} = props;
  return /* @__PURE__ */ h("div", {
    className: "prioritisable_action"
  }, /* @__PURE__ */ h(WComponentCanvasNode, {
    id: action.id,
    is_on_canvas: false,
    always_show: true
  }), props.show_icebox_actions && /* @__PURE__ */ h("div", {
    className: "controls"
  }, /* @__PURE__ */ h(IconButton, {
    size: "medium",
    onClick: () => upsert_wcomponent({
      wcomponent: {...action, todo_index: new Date().getTime()}
    })
  }, /* @__PURE__ */ h(ArrowForwardIcon, null))), props.show_todo_actions && /* @__PURE__ */ h("div", {
    className: "controls"
  }, /* @__PURE__ */ h(IconButton, {
    size: "medium",
    onClick: () => upsert_wcomponent({
      wcomponent: {...action, todo_index: new Date().getTime()}
    })
  }, /* @__PURE__ */ h(ArrowUpwardIcon, null)), /* @__PURE__ */ h(IconButton, {
    size: "medium",
    onClick: () => upsert_wcomponent({
      wcomponent: {...action, todo_index: void 0}
    })
  }, /* @__PURE__ */ h(ArrowBackIcon, null))));
}
export const PrioritisableAction = connector(_PrioritisableAction);
