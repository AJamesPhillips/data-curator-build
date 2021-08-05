import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {PatternListEntry} from "./PatternListEntry.js";
const map_state = (state) => ({
  patterns: [...state.patterns].reverse()
});
const connector = connect(map_state);
function _PatternsList(props) {
  return /* @__PURE__ */ h("table", {
    class: "list"
  }, /* @__PURE__ */ h("tbody", null, props.patterns.map((pattern) => /* @__PURE__ */ h("tr", null, PatternListEntry({pattern})))));
}
export const PatternsList = connector(_PatternsList);
