import {IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import FilterIcon from "../../snowpack/pkg/@material-ui/icons/Filter.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {active_warning_styles} from "./active_warning_common.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  const {
    wc_ids_excluded_by_created_at_datetime_filter,
    vap_set_number_excluded_by_created_at_datetime_filter = 0
  } = get_current_composed_knowledge_view_from_state(state)?.filters || {};
  return {
    components: wc_ids_excluded_by_created_at_datetime_filter?.size || 0,
    vap_sets: vap_set_number_excluded_by_created_at_datetime_filter
  };
};
const map_dispatch = {
  set_display_time_sliders: ACTIONS.controls.set_display_time_sliders
};
const connector = connect(map_state, map_dispatch);
function _ActiveCreatedAtFilterWarning(props) {
  const {components, vap_sets} = props;
  if (components + vap_sets === 0)
    return null;
  const classes = active_warning_styles();
  let title = components ? `${components} components are invisible ` : "";
  if (components && vap_sets)
    title += "and ";
  title += vap_sets ? `${vap_sets} predictions are invisible ` : "";
  title += `due to created at datetime filter`;
  return /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title
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
