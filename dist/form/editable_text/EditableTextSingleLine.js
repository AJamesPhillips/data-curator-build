import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {
  EditableTextCommon
} from "./editable_text_common.js";
export function EditableTextSingleLine(props) {
  return /* @__PURE__ */ h(EditableTextCommon, {
    ...props,
    component: ({value, on_render, on_focus, on_change, on_blur}) => /* @__PURE__ */ h(TextField, {
      fullWidth: true,
      label: props.placeholder,
      variant: "outlined",
      value,
      onFocus: on_focus,
      onChange: on_change,
      onBlur: on_blur,
      ref: (el) => {
        if (!el)
          return;
        const input_el = el.getElementsByTagName("input")[0];
        if (!input_el)
          return;
        on_render(input_el);
      }
    })
  });
}
