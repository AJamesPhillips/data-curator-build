import {IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import FilterIcon from "../../snowpack/pkg/@material-ui/icons/Filter.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {active_warning_styles} from "./active_warning_common.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  component_number_excluded_by_created_at_datetime_filter: get_current_composed_knowledge_view_from_state(state)?.filters.wc_ids_excluded_by_created_at_datetime_filter.size
});
const map_dispatch = {
  set_display_time_sliders: ACTIONS.controls.set_display_time_sliders
};
const connector = connect(map_state, map_dispatch);
function _ActiveCreatedAtFilterWarning(props) {
  const {component_number_excluded_by_created_at_datetime_filter} = props;
  if (!component_number_excluded_by_created_at_datetime_filter)
    return null;
  const classes = active_warning_styles();
  return /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: `${component_number_excluded_by_created_at_datetime_filter} components are invisible due to created at datetime filter`
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    onClick: () => props.set_display_time_sliders(true),
    size: "small"
  }, /* @__PURE__ */ h(FilterIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveCreatedAtFilterWarning = connector(_ActiveCreatedAtFilterWarning);
