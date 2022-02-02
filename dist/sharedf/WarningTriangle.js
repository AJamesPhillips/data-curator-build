import {h} from "../../snowpack/pkg/preact.js";
export function WarningTriangle(props) {
  return /* @__PURE__ */ h("span", {
    style: {backgroundColor: props.backgroundColor || "yellow", color: "black"},
    title: props.message
  }, "⚠");
}
