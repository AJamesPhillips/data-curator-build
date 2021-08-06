import {h} from "../../snowpack/pkg/preact.js";
import "./Editable.css.proxy.js";
import {bounded} from "../shared/utils/bounded.js";
import {EditableTextSingleLine} from "./editable_text/EditableTextSingleLine.js";
import {percentage_to_string} from "../shared/UI/percentages.js";
export function EditablePercentage(props) {
  const value = percentage_to_string(props.value);
  const {conditional_on_change, conditional_on_blur, disabled} = props;
  if (!conditional_on_change && !conditional_on_blur || disabled) {
    const class_name = "editable_percentage" + (disabled ? "disabled" : "");
    return /* @__PURE__ */ h("div", {
      className: class_name
    }, value || props.placeholder, " %");
  }
  return /* @__PURE__ */ h("div", {
    className: "editable_percentage"
  }, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: props.placeholder,
    value,
    conditional_on_change: (new_value) => {
      const valid_value = string_to_percentage(new_value);
      if (valid_value !== void 0)
        conditional_on_change && conditional_on_change(valid_value);
    },
    conditional_on_blur: (new_value) => {
      const valid_value = string_to_percentage(new_value);
      if (valid_value !== void 0)
        conditional_on_blur && conditional_on_blur(valid_value);
    }
  }), " %");
}
function string_to_percentage(value) {
  if (!value)
    return void 0;
  const num_value = parseFloat(value);
  if (Number.isNaN(num_value))
    return 0;
  return bounded(num_value, 0, 100) / 100;
}
