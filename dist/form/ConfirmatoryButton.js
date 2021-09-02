import {Box, ThemeProvider, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {DefaultTheme, WarningTheme} from "../ui_themes/material_default.js";
import {Button} from "../sharedf/Button.js";
export function ConfirmatoryButton(props) {
  const [progressing, set_progressing] = useState(false);
  const {tooltip_text = ""} = props;
  return /* @__PURE__ */ h(Box, {
    display: "flex",
    justifyContent: "space-between",
    mb: 3
  }, /* @__PURE__ */ h(ThemeProvider, {
    theme: WarningTheme
  }, /* @__PURE__ */ h(Button, {
    color: "secondary",
    disabled: props.disabled,
    is_hidden: !progressing,
    onClick: (e) => {
      e.stopImmediatePropagation();
      set_progressing(false);
      props.on_click && props.on_click();
    },
    startIcon: props.button_icon
  }, /* @__PURE__ */ h(Tooltip, {
    title: tooltip_text,
    "aria-label": tooltip_text
  }, /* @__PURE__ */ h(Box, {
    component: "span"
  }, "CONFIRM")))), /* @__PURE__ */ h(ThemeProvider, {
    theme: DefaultTheme
  }, /* @__PURE__ */ h(Button, {
    color: "primary",
    fullWidth: !progressing,
    is_hidden: !props.on_click,
    onClick: (e) => {
      e.stopImmediatePropagation();
      set_progressing(!progressing);
    },
    startIcon: progressing ? "" : props.button_icon
  }, /* @__PURE__ */ h(Tooltip, {
    title: progressing ? "" : tooltip_text,
    "aria-label": progressing ? "" : tooltip_text
  }, /* @__PURE__ */ h(Box, {
    component: "span"
  }, progressing ? "Cancel" : props.button_text)))));
}
