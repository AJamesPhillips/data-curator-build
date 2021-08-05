import {h} from "../../_snowpack/pkg/preact.js";
import {useState, useCallback} from "../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {LabelsList} from "../labels/LabelsList.js";
import {ItemSelect} from "../search/ItemSelect.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  creation_context: state.creation_context
});
const map_dispatch = {
  add_statement: (content, labels, creation_context) => ACTIONS.statement.add_statement({content, labels}, creation_context)
};
const connector = connect(map_state, map_dispatch);
function _NewStatementForm(props) {
  const [content, set_content] = useState("");
  const [labels, set_labels] = useState([]);
  const content_changed = useCallback((event) => {
    set_content(event.currentTarget.value);
  }, [content]);
  function add_label(id) {
    if (labels.includes(id))
      return;
    set_labels([...labels, id]);
  }
  function add_statement() {
    props.add_statement(content, labels, props.creation_context);
    set_content("");
    set_labels([]);
  }
  return /* @__PURE__ */ h("div", null, "Statement content:", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    placeholder: "Statement content",
    value: content,
    onChange: content_changed,
    onKeyDown: (e) => e.key === "Enter" && add_statement()
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Labels:", /* @__PURE__ */ h(ItemSelect, {
    editable: true,
    item_id: "",
    filter: "simple_types",
    on_change_item_id: add_label
  }), /* @__PURE__ */ h(LabelsList, {
    labels
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: add_statement,
    value: "Add statement",
    disabled: !content
  }));
}
export const NewStatementForm = connector(_NewStatementForm);
