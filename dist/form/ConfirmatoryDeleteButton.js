import {Box, ThemeProvider} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {DefaultTheme, WarningTheme} from "../ui_themes/material_default.js";
import {Button} from "../sharedf/Button.js";
import {Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import DeleteIcon from "../../snowpack/pkg/@material-ui/icons/Delete.js";
const map_state = (state) => ({
  consumption_formatting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _ConfirmatoryDeleteButton(props) {
  const [deleting, set_deleting] = useState(false);
  const toolip_text = props.tooltip_text || "";
  if (props.consumption_formatting)
    return null;
  return /* @__PURE__ */ h(Box, {
    display: "flex",
    justifyContent: "space-between",
    mb: 3
  }, /* @__PURE__ */ h(ThemeProvider, {
    theme: WarningTheme
  }, /* @__PURE__ */ h(Button, {
    color: "secondary",
    is_hidden: !deleting,
    onClick: () => {
      set_deleting(false);
      props.on_delete && props.on_delete();
    },
    startIcon: /* @__PURE__ */ h(DeleteIcon, null)
  }, /* @__PURE__ */ h(Tooltip, {
    title: toolip_text,
    "aria-label": toolip_text
  }, /* @__PURE__ */ h(Box, {
    component: "span"
  }, "CONFIRM")))), /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(Button, {
    color: "primary",
    fullWidth: !deleting,
    is_hidden: !props.on_delete,
    onClick: () => set_deleting(!deleting),
    startIcon: deleting ? "" : /* @__PURE__ */ h(DeleteIcon, null)
  }, /* @__PURE__ */ h(Tooltip, {
    title: deleting ? "" : toolip_text,
    "aria-label": deleting ? "" : toolip_text
  }, /* @__PURE__ */ h(Box, {
    component: "span"
  }, deleting ? "Cancel" : props.button_text || "Delete")))));
}
export const ConfirmatoryDeleteButton = connector(_ConfirmatoryDeleteButton);
