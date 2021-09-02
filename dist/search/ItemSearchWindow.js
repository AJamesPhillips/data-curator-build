import {h} from "../../snowpack/pkg/preact.js";
import "./ItemSearchWindow.css.proxy.js";
import {ListOfTypes} from "./ListOfTypes.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {Modal} from "../modal/Modal.js";
export function ItemSearchWindow(props) {
  const [search_string, set_search_string] = useState("");
  return /* @__PURE__ */ h(Modal, {
    on_close: props.on_close,
    title: "Search",
    child: /* @__PURE__ */ h("div", {
      id: "search_container"
    }, /* @__PURE__ */ h("input", {
      type: "text",
      value: search_string,
      onChange: (e) => set_search_string(e.currentTarget.value),
      ref: focus_search_box
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(ListOfTypes, {
      specific_type_id: props.specific_type_id,
      filter_type: props.filter_type,
      filtered_by_string: search_string,
      on_click: (item) => props.on_choose(item)
    }))
  });
}
function focus_search_box(el) {
  if (el)
    el.focus();
}
