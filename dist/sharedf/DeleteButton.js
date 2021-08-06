import {h} from "../../snowpack/pkg/preact.js";
import "./DeleteButton.css.proxy.js";
export function DeleteButton(props) {
  let value = "X";
  if (props.is_large)
    value = "Delete";
  const class__large = props.is_large ? " large " : "";
  const class__disabled = props.disabled ? " disabled " : "";
  const class_names = `delete_button ${class__large} ${class__disabled}`;
  return /* @__PURE__ */ h("input", {
    type: "button",
    value,
    onClick: () => props.on_delete(),
    className: class_names,
    disabled: props.disabled
  });
}
