import {Button, ButtonGroup} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {time_resolution_types} from "../state/display_options/state.js";
const map_state = (state) => ({
  time_resolution: state.display_options.time_resolution,
  display_by_simulated_time: state.display_options.display_by_simulated_time
});
const map_dispatch = {
  set_time_resolution: ACTIONS.display.set_time_resolution
};
const connector = connect(map_state, map_dispatch);
function _TimeResolutionOptions(props) {
  return !props.display_by_simulated_time && /* @__PURE__ */ h(ButtonGroup, {
    disableElevation: true,
    variant: "contained",
    value: props.time_resolution
  }, time_resolution_types.map((type) => /* @__PURE__ */ h(Button, {
    value: type,
    onClick: (e) => {
      const time_resolution = e.currentTarget.value;
      time_resolution && props.set_time_resolution({time_resolution});
    },
    disabled: props.time_resolution == type ? true : false
  }, type)));
}
export const TimeResolutionOptions = connector(_TimeResolutionOptions);
