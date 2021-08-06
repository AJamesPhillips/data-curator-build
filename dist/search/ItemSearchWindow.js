import {h} from "../../snowpack/pkg/preact.js";
import "./SearchWindow.css.proxy.js";
import {ListOfTypes} from "./ListOfTypes.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {Modal} from "../modal/Modal.js";
export function ItemSearchWindow(props) {
  const [search_string, set_search_string] = useState("");
  return /* @__PURE__ */ h(Modal, {
    on_close: props.on_close,
    title: "Search",
    child: () => {
      const id_search_box = "search_box";
      setTimeout(() => focus_search_box(id_search_box), 0);
      return /* @__PURE__ */ h("div", {
        id: "search_container"
      }, /* @__PURE__ */ h("input", {
        id: id_search_box,
        type: "text",
        value: search_string,
        onChange: (e) => set_search_string(e.currentTarget.value)
      }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(ListOfTypes, {
        specific_type_id: props.specific_type_id,
        filter_type: props.filter_type,
        filtered_by_string: search_string,
        on_click: (item) => props.on_choose(item)
      }));
    }
  });
}
function focus_search_box(html_id) {
  const el = document.getElementById(html_id);
  if (el)
    el.focus();
}
