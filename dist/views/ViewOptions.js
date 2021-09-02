import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {ButtonGroup, IconButton} from "../../snowpack/pkg/@material-ui/core.js";
import EditIcon from "../../snowpack/pkg/@material-ui/icons/Edit.js";
import PresentToAllIcon from "../../snowpack/pkg/@material-ui/icons/PresentToAll.js";
const map_state = (state) => {
  return {
    presenting: state.display_options.consumption_formatting
  };
};
const map_dispatch = {
  toggle_consumption_formatting: ACTIONS.display.toggle_consumption_formatting,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ViewOptions(props) {
  return /* @__PURE__ */ h(ButtonGroup, {
    size: "small",
    value: props.presenting ? "presenting" : "editing"
  }, /* @__PURE__ */ h(IconButton, {
    disabled: !props.presenting ? true : false,
    onClick: props.toggle_consumption_formatting,
    value: "editing"
  }, /* @__PURE__ */ h(EditIcon, {
    color: "inherit"
  })), /* @__PURE__ */ h(IconButton, {
    disabled: props.presenting ? true : false,
    onClick: props.toggle_consumption_formatting,
    value: "presenting"
  }, /* @__PURE__ */ h(PresentToAllIcon, null)));
}
export const ViewOptions = connector(_ViewOptions);
