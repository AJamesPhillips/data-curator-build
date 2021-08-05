import {h} from "../../_snowpack/pkg/preact.js";
import {ObjectAttributeListEntry} from "./ObjectAttributeListEntry.js";
function _EditableObjectAttributesList(props) {
  const change_attribute = (index) => (attribute) => {
    const new_attributes = [...props.attributes];
    new_attributes[index] = attribute;
    props.change_attributes(new_attributes);
  };
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("table", {
    class: "list no_border padded"
  }, props.attributes.map((attribute, i) => /* @__PURE__ */ h("tr", null, " ", /* @__PURE__ */ h(ObjectAttributeListEntry, {
    attribute,
    on_change: change_attribute(i),
    editable: true,
    editable_type: false
  })))));
}
export const EditableObjectAttributesList = _EditableObjectAttributesList;
