import {h} from "../../_snowpack/pkg/preact.js";
import {useState} from "../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import "./SandBox.css.proxy.js";
const map_state = (state) => {
  return {};
};
const connector = connect(map_state);
function _SandBoxConnected(props) {
  const [some_string, set_some_string] = useState("");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: some_string,
    conditional_on_blur: set_some_string
  }), /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id: void 0,
    options: [],
    allow_none: true,
    on_change: () => {
    }
  }));
}
export const SandBoxConnected = connector(_SandBoxConnected);
