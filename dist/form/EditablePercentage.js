import {h} from "../../snowpack/pkg/preact.js";
import "./Editable.css.proxy.js";
import {bounded} from "../shared/utils/bounded.js";
import {EditableTextSingleLine} from "./editable_text/EditableTextSingleLine.js";
import {ratio_to_percentage_string} from "../sharedf/percentages.js";
import {EditableTextOnBlurType} from "./editable_text/editable_text_common.js";
export function EditablePercentage(props) {
  const value = ratio_to_percentage_string(props.value);
  const {conditional_on_change, on_blur, on_blur_type = EditableTextOnBlurType.conditional, disabled} = props;
  if (!conditional_on_change && !on_blur || disabled) {
    const class_name = "editable_percentage" + (disabled ? "disabled" : "");
    const have_value = props.value !== void 0;
    return /* @__PURE__ */ h("div", {
      className: class_name
    }, have_value && /* @__PURE__ */ h("span", {
      className: "description_label"
    }, props.placeholder), value || props.placeholder, " %");
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
    on_blur: (new_value) => {
      const valid_value = string_to_percentage(new_value);
      if (valid_value !== void 0)
        on_blur && on_blur(valid_value);
    },
    on_blur_type
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
