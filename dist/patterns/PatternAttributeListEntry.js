import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {get_id_map} from "../utils/get_id_map.js";
import {ItemSelect} from "../search/ItemSelect.js";
const map_state = (state, own_props) => {
  const ids = [own_props.attribute.type_id];
  const id_map = get_id_map(ids, state);
  return {id_map};
};
function _PatternAttributeListEntry(props) {
  if (!props.editable) {
    return [
      /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(ItemSelect, {
        editable: false,
        item_id: props.attribute.type_id,
        filter: "types"
      })),
      /* @__PURE__ */ h("td", null, props.attribute.alt_name),
      /* @__PURE__ */ h("td", null, /* @__PURE__ */ h("input", {
        type: "checkbox",
        title: "Multiple values",
        checked: props.attribute.multiple,
        disabled: true
      }))
    ];
  }
  function on_change_type_id(type_id) {
    if (props.editable)
      props.on_change({...props.attribute, type_id});
  }
  function on_change_alt_name(e) {
    const alt_name = e.currentTarget.value;
    if (props.editable)
      props.on_change({...props.attribute, alt_name});
  }
  function on_change_multiple(e) {
    const multiple = e.currentTarget.checked;
    if (props.editable)
      props.on_change({...props.attribute, multiple});
  }
  return [
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(ItemSelect, {
      editable: true,
      item_id: props.attribute.type_id,
      filter: "types",
      on_change_item_id: on_change_type_id
    })),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h("input", {
      type: "text",
      placeholder: "Alternative description",
      value: props.attribute.alt_name,
      onChange: on_change_alt_name
    })),
    /* @__PURE__ */ h("td", null, /* @__PURE__ */ h("input", {
      type: "checkbox",
      title: "Multiple values",
      checked: props.attribute.multiple,
      onChange: on_change_multiple
    }))
  ];
}
const connector = connect(map_state);
export const PatternAttributeListEntry = connector(_PatternAttributeListEntry);
export const PatternAttributeListHeader = () => /* @__PURE__ */ h("tr", {
  style: {fontSize: "small", textAlign: "center"}
}, /* @__PURE__ */ h("td", null), /* @__PURE__ */ h("td", null), /* @__PURE__ */ h("td", null, "M"));
