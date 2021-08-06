import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  apply_filter: state.filter_context.apply_filter
});
const map_dispatch = {
  set_apply_filter: ACTIONS.filter_context.set_apply_filter
};
const connector = connect(map_state, map_dispatch);
function _FilterContextTabTitle(props) {
  return /* @__PURE__ */ h("div", null, "Filter", /* @__PURE__ */ h("input", {
    type: "checkbox",
    style: {margin: "-3px 0 0 5px"},
    checked: props.apply_filter,
    onClick: (e) => {
      e.stopPropagation();
      e.preventDefault();
    },
    onPointerDown: (e) => {
      e.stopPropagation();
      e.preventDefault();
      props.set_apply_filter(!props.apply_filter);
    }
  }));
}
export const FilterContextTabTitle = connector(_FilterContextTabTitle);
