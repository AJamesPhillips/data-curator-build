import {h} from "../../_snowpack/pkg/preact.js";
export function WarningTriangle(props) {
  return /* @__PURE__ */ h("span", {
    style: {backgroundColor: "yellow"},
    title: props.message
  }, "⚠");
}
