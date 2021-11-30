import {h} from "../../snowpack/pkg/preact.js";
import {IconButton, Tooltip} from "../../snowpack/pkg/@material-ui/core.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import FilterNoneIcon from "../../snowpack/pkg/@material-ui/icons/FilterNone.js";
import {ACTIONS} from "../state/actions.js";
import {active_warning_styles} from "./active_warning_common.js";
const map_state = (state) => ({
  apply_filter: state.filter_context.apply_filter
});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ActiveFilterWarning(props) {
  const {apply_filter} = props;
  const classes = active_warning_styles();
  if (!apply_filter)
    return null;
  return /* @__PURE__ */ h(Tooltip, {
    placement: "top",
    title: "A filter is in place which could result in components being hidden"
  }, /* @__PURE__ */ h(IconButton, {
    className: classes.warning_button,
    component: "span",
    size: "small",
    onClick: () => props.change_route({route: "filter"})
  }, /* @__PURE__ */ h(FilterNoneIcon, {
    className: classes.warning_icon
  })));
}
export const ActiveFilterWarning = connector(_ActiveFilterWarning);
