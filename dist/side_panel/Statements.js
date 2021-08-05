import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {EditStatementForm} from "../statements/EditStatementForm.js";
import {StatementsList} from "../statements/StatementsList.js";
import {NewStatementForm} from "../statements/NewStatementForm.js";
const map_state = (state) => ({
  statement: state.statements.find(({id}) => id === state.routing.item_id),
  statement_count: state.statements.length
});
const connector = connect(map_state);
function _Statements(props) {
  if (props.statement) {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditStatementForm, {
      statement: props.statement
    }));
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("b", null, "Add statements"), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(NewStatementForm, null), /* @__PURE__ */ h("hr", null), "Statements: ", props.statement_count, /* @__PURE__ */ h(StatementsList, null));
}
export const Statements = connector(_Statements);
