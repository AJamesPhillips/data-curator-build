import {h} from "../../snowpack/pkg/preact.js";
import "./Editable.css.proxy.js";
export function EditableCheckbox(props) {
  props.value;
  const {on_change} = props;
  const disabled = props.disabled || !on_change;
  return /* @__PURE__ */ h("input", {
    type: "checkbox",
    checked: props.value,
    disabled,
    style: {cursor: disabled ? "not-allowed" : ""},
    onChange: (e) => {
      if (!on_change)
        return;
      const new_value = e.currentTarget.checked;
      on_change(new_value);
    }
  });
}
