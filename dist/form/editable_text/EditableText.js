import {h} from "../../../snowpack/pkg/preact.js";
import {
  EditableTextCommon
} from "./editable_text_common.js";
import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
export function EditableText(props) {
  return /* @__PURE__ */ h(EditableTextCommon, {
    ...props,
    component: ({value, on_render, on_focus, on_change, on_blur}) => /* @__PURE__ */ h(TextField, {
      fullWidth: true,
      size: "small",
      variant: "standard",
      label: props.placeholder,
      multiline: true,
      value,
      onFocus: on_focus,
      onChange: on_change,
      onBlur: on_blur,
      inputRef: (el) => {
        if (!el)
          return;
        on_render(el);
      }
    })
  });
}
