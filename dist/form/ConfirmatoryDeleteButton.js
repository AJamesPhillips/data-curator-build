import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import DeleteIcon from "../../snowpack/pkg/@material-ui/icons/Delete.js";
import {ConfirmatoryButton} from "./ConfirmatoryButton.js";
const map_state = (state) => ({
  consumption_formatting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _ConfirmatoryDeleteButton(props) {
  if (props.consumption_formatting)
    return null;
  return /* @__PURE__ */ h(ConfirmatoryButton, {
    on_click: props.on_delete,
    button_text: props.button_text ?? "Delete",
    button_icon: /* @__PURE__ */ h(DeleteIcon, null),
    tooltip_text: props.tooltip_text
  });
}
export const ConfirmatoryDeleteButton = connector(_ConfirmatoryDeleteButton);
