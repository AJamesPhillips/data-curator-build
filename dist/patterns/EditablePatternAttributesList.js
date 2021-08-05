import {h} from "../../_snowpack/pkg/preact.js";
import {DeleteButton} from "../sharedf/DeleteButton.js";
import {PatternAttributeListEntry, PatternAttributeListHeader} from "./PatternAttributeListEntry.js";
function _EditablePatternAttributesList(props) {
  function add_attribute() {
    const new_blank_attribute = {
      type_id: "",
      alt_name: ""
    };
    props.change_attributes([...props.attributes, new_blank_attribute]);
  }
  const change_attribute = (index) => (attribute) => {
    const new_attributes = [...props.attributes];
    new_attributes[index] = attribute;
    props.change_attributes(new_attributes);
  };
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("table", null, !!props.attributes.length && /* @__PURE__ */ h(PatternAttributeListHeader, null), props.attributes.map((attribute, i) => /* @__PURE__ */ h("tr", null, " ", /* @__PURE__ */ h(PatternAttributeListEntry, {
    attribute,
    on_change: change_attribute(i),
    editable: true
  }), /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(DeleteButton, {
    on_delete: () => props.delete_attribute(i)
  }))))), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Add attribute",
    onClick: add_attribute
  }));
}
export const EditablePatternAttributesList = _EditablePatternAttributesList;
