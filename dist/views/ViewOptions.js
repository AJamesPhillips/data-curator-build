import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useRef, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ButtonGroup, IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import EditIcon from "../../snowpack/pkg/@material-ui/icons/Edit.js";
import PresentToAllIcon from "../../snowpack/pkg/@material-ui/icons/PresentToAll.js";
import {ACTIONS} from "../state/actions.js";
import {invert_disabled_appearance} from "../ui_themes/invert_disabled.js";
import {selector_current_user_access_level} from "../state/user_info/selector.js";
import {Modal} from "../modal/Modal.js";
import {Button} from "../sharedf/Button.js";
const map_state = (state) => {
  const access_level = selector_current_user_access_level(state);
  return {
    presenting: state.display_options.consumption_formatting,
    access_level
  };
};
const map_dispatch = {
  toggle_consumption_formatting: ACTIONS.display.toggle_consumption_formatting,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ViewOptions(props) {
  const {access_level} = props;
  const can_not_edit = access_level === "viewer" || access_level === "none";
  const are_in_edit_mode = !props.presenting;
  const [present_warning, set_present_warning] = useState(void 0);
  const presented_warning_once = useRef(false);
  useEffect(() => {
    if (access_level === void 0)
      return;
    if (presented_warning_once.current)
      return;
    presented_warning_once.current = true;
    set_present_warning(can_not_edit);
  }, [access_level]);
  const button_edit_title = can_not_edit ? "No editing rights" : "";
  const button_edit_color = can_not_edit ? props.presenting ? "rgba(183, 28, 26, 0.5)" : "rgba(183, 28, 26)" : "";
  const classes = invert_disabled_appearance();
  return /* @__PURE__ */ h(ButtonGroup, {
    size: "small",
    value: props.presenting ? "presenting" : "editing"
  }, /* @__PURE__ */ h(Tooltip, {
    title: button_edit_title,
    "aria-label": button_edit_title
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.inverse_disabled,
    disabled: are_in_edit_mode,
    component: are_in_edit_mode ? "div" : void 0,
    onClick: are_in_edit_mode ? void 0 : props.toggle_consumption_formatting,
    value: "editing"
  }, /* @__PURE__ */ h(EditIcon, {
    style: {color: button_edit_color}
  }))), /* @__PURE__ */ h(IconButton, {
    className: classes.inverse_disabled,
    disabled: props.presenting,
    onClick: props.toggle_consumption_formatting,
    value: "presenting"
  }, /* @__PURE__ */ h(PresentToAllIcon, null)), are_in_edit_mode && present_warning && /* @__PURE__ */ h(Modal, {
    title: "",
    size: "small",
    scrollable: false,
    on_close: () => set_present_warning(false),
    child: /* @__PURE__ */ h("div", {
      style: {margin: "30px"}
    }, /* @__PURE__ */ h("h1", null, "Warning: Your edits will not be saved"), /* @__PURE__ */ h("p", null, "You can make changes to this knowledge base but they will not be saved. The owner of this knowledge base may give you editing rights if you ask them."), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("p", {
      style: {textAlign: "center"}
    }, /* @__PURE__ */ h(Button, {
      onClick: () => set_present_warning(false)
    }, "Ok")))
  }));
}
export const ViewOptions = connector(_ViewOptions);
