import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./ItemSelect.css.proxy.js";
import {get_id_map} from "../utils/get_id_map.js";
import {description} from "../utils/item.js";
import {ItemSearchWindow} from "./ItemSearchWindow.js";
const map_state = (state, own_props) => {
  const ids = [own_props.item_id];
  const id_map = get_id_map(ids, state);
  return {id_map};
};
const connector = connect(map_state);
const placeholder_map = {
  simple_types: "Statement Type",
  types: "Statement Type or Pattern",
  patterns: "Pattern",
  all_concrete: "All instances"
};
function _ItemSelect(props) {
  let item_id_css_class = "empty";
  const placeholder = props.placeholder || placeholder_map[props.filter];
  let item_id_desc = void 0;
  if (props.item_id) {
    item_id_css_class = "";
    const item = props.id_map[props.item_id];
    item_id_desc = item ? description(item) : props.item_id;
  }
  if (!props.editable) {
    return /* @__PURE__ */ h("div", {
      class: "fake_text_input disabled " + item_id_css_class
    }, item_id_desc || "");
  }
  const [display_search, set_display_search] = useState(false);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", {
    class: "fake_text_input " + item_id_css_class,
    onClick: () => set_display_search(true)
  }, item_id_desc || placeholder), display_search && /* @__PURE__ */ h(ItemSearchWindow, {
    specific_type_id: props.filter_specific_type_id,
    filter_type: props.filter,
    on_choose: (item) => {
      props.on_change_item_id && props.on_change_item_id(item.id);
      props.on_change_item && props.on_change_item(item);
      set_display_search(false);
    },
    on_close: () => set_display_search(false)
  }));
}
export const ItemSelect = connector(_ItemSelect);
