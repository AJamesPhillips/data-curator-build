import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {EditableTextSingleLine} from "../form/editable_text/EditableTextSingleLine.js";
import "./SandBox.css.proxy.js";
const map_state = (state) => {
  return {};
};
const connector = connect(map_state);
function _SandBoxConnected(props) {
  const [some_string, set_some_string] = useState("testing 123");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "1",
    force_focus: true,
    value: some_string,
    conditional_on_blur: set_some_string
  }));
}
export const SandBoxConnected = connector(_SandBoxConnected);
