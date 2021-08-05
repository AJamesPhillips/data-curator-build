import {h} from "../../_snowpack/pkg/preact.js";
import {useState, useCallback} from "../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ItemSelect} from "../search/ItemSelect.js";
import {ACTIONS} from "../state/actions.js";
import {EditablePatternAttributesList} from "./EditablePatternAttributesList.js";
const map_state = (state) => ({
  creation_context: state.creation_context
});
const map_dispatch = {
  add_pattern: (args, creation_context) => ACTIONS.pattern.add_pattern(args, creation_context)
};
const connector = connect(map_state, map_dispatch);
function _NewPatternForm(props) {
  const [name, set_name] = useState("");
  const name_changed = useCallback((event) => {
    set_name(event.currentTarget.value);
  }, [name]);
  const [content, set_content] = useState("");
  const content_changed = (event) => {
    set_content(event.currentTarget.value);
  };
  const [attributes, set_attributes] = useState([]);
  const change_attributes = useCallback((new_attributes) => {
    set_attributes(new_attributes);
  }, [attributes]);
  const delete_attribute = useCallback((index) => {
    const new_attributes = attributes.filter((_, i) => i !== index);
    set_attributes(new_attributes);
  }, [attributes]);
  function on_change_clone_pattern(pattern) {
    set_name(pattern.name);
    set_content(pattern.content);
    set_attributes(pattern.attributes);
  }
  function add_pattern() {
    props.add_pattern({name, content, attributes}, props.creation_context);
    set_content("");
    set_attributes([]);
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "Pattern name",
    value: name,
    onChange: name_changed
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(EditablePatternAttributesList, {
    attributes,
    change_attributes,
    delete_attribute
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    style: {width: 400},
    type: "text",
    placeholder: "Pattern content",
    value: content,
    onChange: content_changed
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: add_pattern,
    value: "Add pattern",
    disabled: !name
  }), /* @__PURE__ */ h("div", {
    style: {float: "right"}
  }, /* @__PURE__ */ h(ItemSelect, {
    editable: true,
    item_id: "",
    filter: "patterns",
    placeholder: "Clone pattern",
    on_change_item: (pattern) => on_change_clone_pattern(pattern)
  })));
}
export const NewPatternForm = connector(_NewPatternForm);
