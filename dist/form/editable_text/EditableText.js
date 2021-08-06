import {h} from "../../../snowpack/pkg/preact.js";
import {
  EditableTextCommon
} from "./editable_text_common.js";
import {adjust_height} from "../utils.js";
export function EditableText(props) {
  return /* @__PURE__ */ h(EditableTextCommon, {
    ...props,
    component: ({value, on_render, on_focus, on_change, on_blur}) => /* @__PURE__ */ h("textarea", {
      style: {height: "auto"},
      placeholder: props.placeholder,
      value,
      ref: (el) => {
        if (!el)
          return;
        adjust_height(el);
        on_render(el);
      },
      onFocus: on_focus,
      onChange: on_change,
      onBlur: on_blur
    })
  });
}
