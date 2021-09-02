import {Box, ThemeProvider, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import AddIcon from "../../snowpack/pkg/@material-ui/icons/Add.js";
import {DefaultTheme} from "../ui_themes/material_default.js";
import {Button} from "../sharedf/Button.js";
export function AddButton(props) {
  const {tooltip_text = ""} = props;
  return /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(Button, {
    color: "primary",
    onClick: (e) => {
      e.stopImmediatePropagation();
      props.on_click();
    },
    startIcon: /* @__PURE__ */ h(AddIcon, null)
  }, /* @__PURE__ */ h(Tooltip, {
    title: tooltip_text,
    "aria-label": tooltip_text
  }, /* @__PURE__ */ h(Box, {
    component: "span"
  }, props.button_text ?? "Add"))));
}
