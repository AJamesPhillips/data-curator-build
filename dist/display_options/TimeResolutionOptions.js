import {ToggleButton, ToggleButtonGroup} from "../../snowpack/pkg/@material-ui/lab.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {time_resolution_types} from "../state/display_options/state.js";
const map_state = (state) => ({
  time_resolution: state.display_options.time_resolution
});
const map_dispatch = {
  set_time_resolution: ACTIONS.display.set_time_resolution
};
const connector = connect(map_state, map_dispatch);
function _TimeResolutionOptions(props) {
  return /* @__PURE__ */ h(ToggleButtonGroup, {
    exclusive: true,
    size: "small",
    value: props.time_resolution,
    onChange: (e) => {
      const time_resolution = e.currentTarget.value;
      time_resolution && props.set_time_resolution({time_resolution});
    },
    "aria-label": "text formatting"
  }, time_resolution_types.map((type) => /* @__PURE__ */ h(ToggleButton, {
    value: type
  }, type)));
}
export const TimeResolutionOptions = connector(_TimeResolutionOptions);
