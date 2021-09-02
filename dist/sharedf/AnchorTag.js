import {h} from "../../snowpack/pkg/preact.js";
export function AnchorTag(props) {
  return /* @__PURE__ */ h("a", {
    href: props.href,
    onClick: (e) => e.stopImmediatePropagation(),
    onPointerDown: (e) => e.stopImmediatePropagation()
  }, props.children);
}
