import {h} from "../../snowpack/pkg/preact.js";
import {IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import CloseIcon from "../../snowpack/pkg/@material-ui/icons/Close.js";
import MenuIcon from "../../snowpack/pkg/@material-ui/icons/Menu.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  display_side_panel: state.controls.display_side_panel
});
const map_dispatch = {
  set_or_toggle_display_side_panel: ACTIONS.controls.set_or_toggle_display_side_panel
};
const connector = connect(map_state, map_dispatch);
function _SidePanelOrMenuButton(props) {
  return /* @__PURE__ */ h(IconButton, {
    "aria-label": "open side panel",
    color: "inherit",
    edge: "end",
    onClick: props.set_or_toggle_display_side_panel,
    size: "small"
  }, props.display_side_panel ? /* @__PURE__ */ h(CloseIcon, null) : /* @__PURE__ */ h(MenuIcon, null));
}
export const SidePanelOrMenuButton = connector(_SidePanelOrMenuButton);
