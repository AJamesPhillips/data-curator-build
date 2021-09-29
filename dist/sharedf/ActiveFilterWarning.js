import {h} from "../../snowpack/pkg/preact.js";
import {IconButton, makeStyles, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterNoneIcon from "../../snowpack/pkg/@material-ui/icons/FilterNone.js";
const map_state = (state) => ({
  apply_filter: state.filter_context.apply_filter
});
const connector = connect(map_state);
function _ActiveFilterWarning(props) {
  const {apply_filter} = props;
  const classes = use_styles();
  if (!apply_filter)
    return null;
  return /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: "WARNING: a filter is in place which could result in components being hidden."
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    disableRipple: true,
    disableElevation: true,
    size: "small"
  }, /* @__PURE__ */ h(FilterNoneIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveFilterWarning = connector(_ActiveFilterWarning);
const use_styles = makeStyles((theme) => ({
  warning_button: {cursor: "help"},
  warning_icon: {color: theme.palette.warning.main}
}));
