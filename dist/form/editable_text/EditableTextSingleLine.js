import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {
  EditableTextCommon
} from "./editable_text_common.js";
export function EditableTextSingleLine(props) {
  const component = useMemo(() => {
    return ({value, on_render, on_focus, on_change, on_blur}) => /* @__PURE__ */ h(TextField, {
      fullWidth: true,
      label: props.placeholder,
      variant: "outlined",
      value,
      onFocus: on_focus,
      onChange: on_change,
      onBlur: on_blur,
      size: props.size,
      inputRef: on_render
    });
  }, [props.placeholder, props.size]);
  return /* @__PURE__ */ h(EditableTextCommon, {
    ...props,
    component
  });
}
