import {h} from "../../../snowpack/pkg/preact.js";
import "./StorageOption.css.proxy.js";
export function StorageOption(props) {
  const {selected} = props;
  return /* @__PURE__ */ h("div", {
    className: "section storage_option " + (selected ? "selected" : ""),
    onClick: props.on_click
  }, /* @__PURE__ */ h("h3", null, props.name), props.description);
}
