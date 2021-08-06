import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {DeleteButton} from "../sharedf/DeleteButton.js";
import {ACTIONS} from "../state/actions.js";
import {PatternAttributesList} from "./PatternAttributesList.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
const map_dispatch = (dispatch, props) => {
  return {
    update_pattern: (args) => {
      dispatch(ACTIONS.pattern.update_pattern({id: props.pattern.id, ...args}));
    },
    delete_pattern: () => dispatch(ACTIONS.pattern.delete_pattern(props.pattern.id))
  };
};
const connector = connect(null, map_dispatch);
function _EditPatternForm(props) {
  const [name, set_name] = useState(props.pattern.name);
  const [content, set_content] = useState(props.pattern.content);
  const changed = name !== props.pattern.name || content !== props.pattern.content;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "Pattern name",
    value: name,
    onChange: (e) => set_name(e.currentTarget.value)
  }), /* @__PURE__ */ h(PatternAttributesList, {
    attributes: props.pattern.attributes
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    style: {width: 400},
    type: "text",
    placeholder: "Pattern content",
    value: content,
    onChange: (e) => set_content(e.currentTarget.value)
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Update pattern",
    onClick: () => props.update_pattern({name, content}),
    disabled: !changed
  }), /* @__PURE__ */ h("div", {
    style: {float: "right"}
  }, /* @__PURE__ */ h(DeleteButton, {
    on_delete: () => props.delete_pattern(),
    is_large: true
  })));
}
export const EditPatternForm = connector(_EditPatternForm);
