import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./Editable.css.proxy.js";
import "./EditableNumber.css.proxy.js";
import {EditableTextSingleLine} from "./editable_text/EditableTextSingleLine.js";
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _EditableNumber(props) {
  const value = props.value !== void 0 ? props.value.toString() : "";
  const {
    allow_undefined,
    conditional_on_change,
    conditional_on_blur,
    always_on_blur,
    disabled,
    editing,
    default_value_when_invalid = 0
  } = props;
  let class_name = "editable_number";
  if (!editing || !conditional_on_change && !conditional_on_blur && !always_on_blur || disabled) {
    class_name = class_name + (editing ? "" : " not_editable ") + (disabled ? " disabled " : "");
    return /* @__PURE__ */ h("div", {
      className: class_name
    }, props.value === void 0 ? props.placeholder : props.value);
  }
  return /* @__PURE__ */ h("div", {
    className: class_name
  }, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: props.placeholder,
    value,
    conditional_on_change: (new_value) => {
      if (!conditional_on_change)
        return;
      const valid_value = string_to_number(new_value, default_value_when_invalid);
      if (on_event_handler_accepts_undefined(conditional_on_change, allow_undefined))
        conditional_on_change(valid_value);
      else if (valid_value !== void 0)
        conditional_on_change(valid_value);
    },
    conditional_on_blur: (value2) => {
      if (!conditional_on_blur)
        return;
      handle_blur({value: value2, default_value_when_invalid, on_blur: conditional_on_blur, allow_undefined});
    },
    always_on_blur: (value2) => {
      if (!always_on_blur)
        return;
      handle_blur({value: value2, default_value_when_invalid, on_blur: always_on_blur, allow_undefined});
    }
  }));
}
export const EditableNumber = connector(_EditableNumber);
function string_to_number(value, default_value_when_invalid) {
  if (!value)
    return void 0;
  const num_value = parseFloat(value);
  if (Number.isNaN(num_value))
    return default_value_when_invalid;
  return num_value;
}
function on_event_handler_accepts_undefined(on_change, allow_undefined) {
  return !!allow_undefined;
}
function handle_blur({value, default_value_when_invalid, on_blur, allow_undefined}) {
  let valid_value = string_to_number(value, default_value_when_invalid);
  if (on_event_handler_accepts_undefined(on_blur, allow_undefined)) {
    on_blur(valid_value);
  } else {
    if (valid_value === void 0)
      valid_value = default_value_when_invalid;
    on_blur(valid_value);
  }
}
