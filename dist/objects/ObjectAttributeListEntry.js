import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {is_id_attribute, is_value_attribute} from "../state/State.js";
import {get_id_map} from "../utils/get_id_map.js";
import {ItemSelect} from "../search/ItemSelect.js";
import {CORE_IDS} from "../state/core_data.js";
const map_state = (state, own_props) => {
  const ids = [];
  const id_map = get_id_map(ids, state);
  return {id_map};
};
function _ObjectAttributeListEntry(props) {
  const attribute = props.attribute;
  function on_change_id(id) {
    if (props.editable) {
      const changed_attribute = {...props.attribute, id};
      delete changed_attribute.value;
      props.on_change(changed_attribute);
    }
  }
  function on_change_value(value) {
    if (props.editable) {
      const changed_attribute = {...props.attribute, value};
      delete changed_attribute.id;
      props.on_change(changed_attribute);
    }
  }
  return [
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(ItemSelect, {
      editable: !!props.editable_type,
      item_id: attribute.pattern.type_id,
      filter: "types",
      filter_specific_type_id: CORE_IDS.sType
    })),
    /* @__PURE__ */ h("td", null, attribute.pattern.alt_name),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(ItemSelect, {
      editable: props.editable && (is_id_attribute(attribute) || !attribute.value),
      item_id: is_id_attribute(attribute) && attribute.id || "",
      filter: "all_concrete",
      filter_specific_type_id: attribute.pattern.type_id,
      on_change_item_id: on_change_id
    })),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h("input", {
      disabled: !(props.editable && (is_value_attribute(attribute) || !attribute.id)),
      value: is_value_attribute(attribute) && attribute.value || "",
      onChange: (e) => on_change_value(e.currentTarget.value),
      placeholder: "Value"
    }))
  ];
}
const connector = connect(map_state);
export const ObjectAttributeListEntry = connector(_ObjectAttributeListEntry);
