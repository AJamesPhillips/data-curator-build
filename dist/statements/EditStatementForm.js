import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {LabelsList} from "../labels/LabelsList.js";
import {DeleteButton} from "../sharedf/DeleteButton.js";
import {ACTIONS} from "../state/actions.js";
const map_dispatch = (dispatch, props) => ({
  delete_statement: () => {
    dispatch(ACTIONS.statement.delete_statement(props.statement.id));
    dispatch(ACTIONS.routing.change_route({route: "statements", sub_route: void 0, item_id: void 0, args: {}}));
  }
});
const connector = connect(null, map_dispatch);
function _EditStatementForm(props) {
  const labels = props.statement.labels;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "Statement",
    value: props.statement.content,
    disabled: true
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Labels:", /* @__PURE__ */ h(LabelsList, {
    labels
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(DeleteButton, {
    on_delete: () => props.delete_statement(),
    is_large: true
  }));
}
export const EditStatementForm = connector(_EditStatementForm);
