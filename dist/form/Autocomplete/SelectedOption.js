import {h} from "../../../snowpack/pkg/preact.js";
import {Button} from "../../sharedf/Button.js";
import {color_to_opposite, color_to_string} from "../../sharedf/color.js";
import {ButtonGroup, IconButton, Tooltip, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import ClearIcon from "../../../snowpack/pkg/@material-ui/icons/Clear.js";
export function SelectedOption(props) {
  const {
    editing,
    option,
    on_remove_option,
    on_mouse_over_option,
    on_mouse_leave_option,
    on_pointer_down_selected_option: pointer_down
  } = props;
  if (!option)
    return null;
  return /* @__PURE__ */ h(ButtonGroup, {
    size: "small",
    color: "primary",
    variant: "contained",
    fullWidth: true,
    disableElevation: true
  }, /* @__PURE__ */ h(Button, {
    onClick: (e) => pointer_down && pointer_down(e, option.id),
    disabled: !pointer_down,
    style: {
      cursor: !pointer_down ? "not-allowed" : "",
      backgroundColor: option.color && color_to_string(option.color),
      color: option.color && color_to_string(color_to_opposite(option.color))
    }
  }, /* @__PURE__ */ h(Tooltip, {
    title: option.jsx || option.title,
    "aria-label": option.jsx || option.title
  }, /* @__PURE__ */ h(Typography, {
    noWrap: true,
    textOverflow: "ellipsis",
    variant: "caption"
  }, option.jsx || option.title))), editing && /* @__PURE__ */ h(IconButton, {
    onClick: () => on_remove_option(option.id)
  }, /* @__PURE__ */ h(ClearIcon, null)));
}
