import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  use_creation_context: state.creation_context.use_creation_context
});
const map_dispatch = {
  toggle_use_creation_context: ACTIONS.creation_context.toggle_use_creation_context
};
const connector = connect(map_state, map_dispatch);
function _CreationContextTabTitle(props) {
  return /* @__PURE__ */ h("div", null, "Creation Context", /* @__PURE__ */ h("input", {
    type: "checkbox",
    style: {margin: "-3px 0 0 5px"},
    checked: props.use_creation_context,
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
    },
    onPointerDown: (e) => {
      e.stopPropagation();
      e.preventDefault();
      props.toggle_use_creation_context();
    }
  }));
}
export const CreationContextTabTitle = connector(_CreationContextTabTitle);
