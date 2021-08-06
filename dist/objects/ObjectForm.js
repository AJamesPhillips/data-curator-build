import {h} from "../../snowpack/pkg/preact.js";
import {useState, useCallback} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./ObjectForm.css.proxy.js";
import {SelectPattern} from "../patterns/SelectPattern.js";
import {DeleteButton} from "../sharedf/DeleteButton.js";
import {ACTIONS} from "../state/actions.js";
import {convert_from_pattern_attributes} from "../state/objects/objects.js";
import {LinkButton} from "../sharedf/Link.js";
import {EditableObjectAttributesList} from "./EditableObjectAttributesList.js";
import {object_content} from "./object_content.js";
const map_state = (state) => ({
  creation_context: state.creation_context
});
const map_dispatch = (dispatch) => ({
  add_object: (args, creation_context) => {
    const action_add_object = ACTIONS.object.add_object(args, creation_context);
    dispatch(action_add_object);
    dispatch(ACTIONS.routing.change_route({
      route: "objects",
      item_id: action_add_object.id,
      sub_route: null,
      args: {}
    }));
  },
  update_object: (args) => dispatch(ACTIONS.object.update_object(args)),
  delete_object: (id) => dispatch(ACTIONS.object.delete_object(id))
});
const connector = connect(map_state, map_dispatch);
const blank_state = {
  id: void 0,
  datetime_created: void 0,
  pattern_id: "",
  pattern_name: "",
  content: "",
  attributes: [],
  labels: [],
  external_ids: {},
  rendered: "",
  is_rendered: false
};
function _ObjectForm(props) {
  const initial_state = props.object || blank_state;
  const [object, set_object] = useState(initial_state);
  const [pattern_attributes, set_pattern_attributes] = useState([]);
  function update_object(args) {
    set_object({...object, ...args});
  }
  if (props.object && props.object.id !== object.id)
    reset_form_data();
  if (!props.object && object.id !== void 0)
    reset_form_data();
  const set_pattern = useCallback((pattern) => {
    update_object({
      pattern_id: pattern.id,
      content: pattern.content,
      attributes: convert_from_pattern_attributes(pattern.attributes)
    });
    set_pattern_attributes(pattern.attributes);
  }, [object]);
  const change_attributes = useCallback((new_attributes) => {
    set_object({...object, attributes: new_attributes});
  }, [object]);
  function delete_attribute(index) {
    const new_attributes = object.attributes.filter((_, i) => i !== index);
    set_object({...object, attributes: new_attributes});
  }
  function upsert_object() {
    props.object ? props.update_object(object) : props.add_object(object, props.creation_context);
  }
  function reset_form_data() {
    set_object(initial_state);
    set_pattern_attributes([]);
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("b", null, props.object ? "Edit object" : "Add object"), /* @__PURE__ */ h(LinkButton, {
    route: "objects",
    sub_route: "objects_bulk_import",
    item_id: void 0,
    args: void 0,
    name: "Bulk import",
    style: {float: "right"}
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    class: "field_label"
  }, "Pattern:"), /* @__PURE__ */ h("div", {
    class: "field"
  }, /* @__PURE__ */ h(SelectPattern, {
    pattern_id: object.pattern_id,
    disabled: !!props.object,
    on_change_pattern: set_pattern
  }))), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(EditableObjectAttributesList, {
    pattern_attributes,
    attributes: object.attributes,
    change_attributes,
    delete_attribute
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    style: {width: 400},
    type: "text",
    placeholder: "Object content",
    value: object.content,
    disabled: true
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", null, object_content({object: {...object, rendered: "", is_rendered: false}})), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    onClick: upsert_object,
    value: props.object ? "Update object" : "Add object",
    disabled: initial_state === object
  }), /* @__PURE__ */ h("div", {
    style: {float: "right"}
  }, /* @__PURE__ */ h(DeleteButton, {
    on_delete: () => props.delete_object(object.id),
    is_large: true,
    disabled: !object.id
  })));
}
export const ObjectForm = connector(_ObjectForm);
