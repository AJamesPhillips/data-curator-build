import {h} from "../../snowpack/pkg/preact.js";
import {IconButton, makeStyles, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import FilterTiltShift from "../../snowpack/pkg/@material-ui/icons/FilterTiltShift.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {active_warning_styles} from "./active_warning_common.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting,
  focused_mode: state.display_options.focused_mode
});
const map_dispatch = {
  set_or_toggle_focused_mode: ACTIONS.display.set_or_toggle_focused_mode
};
const connector = connect(map_state, map_dispatch);
function _ActiveFocusedMode(props) {
  const {presenting, focused_mode} = props;
  const title = focused_mode ? "WARNING: Focused Mode is active, unselected components will be almost invisible" : "Activate focused mode";
  const classes = focused_mode ? active_warning_styles() : inactive_warning_styles();
  return presenting && /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title
  }, /* @__PURE__ */ h(IconButton, {
    component: "span",
    size: "small",
    onClick: () => props.set_or_toggle_focused_mode()
  }, /* @__PURE__ */ h(FilterTiltShift, {
    className: classes.warning_icon
  })));
}
export const ActiveFocusedMode = connector(_ActiveFocusedMode);
const inactive_warning_styles = makeStyles((theme) => ({
  warning_icon: {color: theme.palette.primary.main}
}));
