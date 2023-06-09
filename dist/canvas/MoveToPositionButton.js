import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Box, IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import FilterCenterFocusIcon from "../../snowpack/pkg/@material-ui/icons/FilterCenterFocus.js";
import {ACTIONS} from "../state/actions.js";
import {optional_view_type} from "../views/optional_view_type.js";
const map_state = (state) => ({
  view: state.routing.args.view
});
const map_dispatch = {
  move: (position, view) => ACTIONS.routing.change_route({
    args: {view, ...position}
  })
};
const connector = connect(map_state, map_dispatch);
function _MoveToPositionButton(props) {
  const {move_to_xy: move_to_position} = props;
  if (!move_to_position)
    return null;
  const view = optional_view_type(props.view);
  return /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 2
  }, /* @__PURE__ */ h(IconButton, {
    size: "small",
    onClick: () => props.move(move_to_position, view),
    "aria-label": props.description
  }, /* @__PURE__ */ h(FilterCenterFocusIcon, null)));
}
export const MoveToPositionButton = connector(_MoveToPositionButton);
