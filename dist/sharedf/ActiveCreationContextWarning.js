import {h} from "../../snowpack/pkg/preact.js";
import {IconButton, makeStyles, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import PhotoFilterIcon from "../../snowpack/pkg/@material-ui/icons/PhotoFilter.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  creation_context: state.creation_context,
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _ActiveCreationContextWarning(props) {
  const {creation_context, editing} = props;
  const use_styles = makeStyles((theme) => ({
    warning_button: {cursor: "help"},
    warning_icon: {color: theme.palette.warning.main}
  }));
  const classes = use_styles();
  return creation_context.use_creation_context && editing && /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: "WARNING: Creation Context is active, which can result in components being created with incorrect information!"
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    disableRipple: true,
    disableElevation: true,
    size: "small"
  }, /* @__PURE__ */ h(PhotoFilterIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveCreationContextWarning = connector(_ActiveCreationContextWarning);