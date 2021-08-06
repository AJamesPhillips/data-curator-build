import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Link} from "../sharedf/Link.js";
const map_state = (state) => {
  const ready = state.sync.ready;
  const perceptions = state.derived.perceptions;
  return {ready, perceptions};
};
const connector = connect(map_state);
function _PerceptionsList(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  return /* @__PURE__ */ h("div", null, props.perceptions.map((pe) => /* @__PURE__ */ h("div", {
    style: {width: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: 6, padding: 6, border: "thin solid #aaa"}
  }, /* @__PURE__ */ h(Link, {
    route: "perceptions",
    sub_route: void 0,
    args: void 0,
    item_id: pe.id
  }, pe.title))));
}
export const PerceptionsList = connector(_PerceptionsList);
