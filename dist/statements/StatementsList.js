import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {StatementListEntry} from "./StatementListEntry.js";
const map_state = (state) => ({
  statements: [...state.statements].reverse()
});
const connector = connect(map_state);
function _StatementsList(props) {
  return /* @__PURE__ */ h("table", {
    class: "list"
  }, /* @__PURE__ */ h("tbody", null, props.statements.map((statement) => /* @__PURE__ */ h("tr", null, StatementListEntry({statement})))));
}
export const StatementsList = connector(_StatementsList);
