import {IconButton, makeStyles, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import FilterIcon from "../../snowpack/pkg/@material-ui/icons/Filter.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
const map_state = (state) => ({
  component_number_excluded_by_created_at_datetime_filter: get_current_composed_knowledge_view_from_state(state)?.filters.wc_ids_excluded_by_created_at_datetime_filter.size
});
const connector = connect(map_state);
function _ActiveCreatedAtFilterWarning(props) {
  const {component_number_excluded_by_created_at_datetime_filter} = props;
  if (!component_number_excluded_by_created_at_datetime_filter)
    return null;
  const classes = use_styles();
  return /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: `${component_number_excluded_by_created_at_datetime_filter} components are invisible due to created at datetime filter`
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    disableRipple: true,
    disableElevation: true,
    size: "small"
  }, /* @__PURE__ */ h(FilterIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveCreatedAtFilterWarning = connector(_ActiveCreatedAtFilterWarning);
const use_styles = makeStyles((theme) => ({
  warning_button: {cursor: "help"},
  warning_icon: {color: theme.palette.warning.main}
}));
