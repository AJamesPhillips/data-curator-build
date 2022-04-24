import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {EditableTextSingleLine} from "../form/editable_text/EditableTextSingleLine.js";
import {EditableTextOnBlurType} from "../form/editable_text/editable_text_common.js";
import "./SandBox.css.proxy.js";
const map_state = (state) => {
  return {};
};
const connector = connect(map_state);
function _SandBoxConnected(props) {
  const [some_string, set_some_string] = useState("testing 123");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "1",
    force_focus_on_first_render: true,
    value: some_string,
    on_blur: set_some_string,
    on_blur_type: EditableTextOnBlurType.conditional
  }));
}
export const SandBoxConnected = connector(_SandBoxConnected);
