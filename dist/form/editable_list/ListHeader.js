import {h} from "../../../snowpack/pkg/preact.js";
export function ListHeader(props) {
  const {
    items_descriptor,
    on_click_header,
    other_content = () => null
  } = props;
  return /* @__PURE__ */ h("div", {
    onClick: on_click_header,
    style: {cursor: on_click_header ? "pointer" : "default"}
  }, other_content(), /* @__PURE__ */ h("div", {
    className: "item_descriptors"
  }, items_descriptor), /* @__PURE__ */ h("div", {
    style: {clear: "both"}
  }));
}
