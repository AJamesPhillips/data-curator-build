import {h} from "../../snowpack/pkg/preact.js";
import {ItemSelect} from "../search/ItemSelect.js";
export function SelectPattern(props) {
  return /* @__PURE__ */ h("div", null, props.disabled && /* @__PURE__ */ h(ItemSelect, {
    editable: false,
    item_id: props.pattern_id,
    filter: "patterns"
  }), !props.disabled && /* @__PURE__ */ h(ItemSelect, {
    editable: true,
    item_id: props.pattern_id,
    filter: "patterns",
    on_change_item: (item) => props.on_change_pattern(item)
  }));
}
