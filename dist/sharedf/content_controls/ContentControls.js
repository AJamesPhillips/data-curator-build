import {h} from "../../../_snowpack/pkg/preact.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {Box} from "../../../_snowpack/pkg/@material-ui/core.js";
import {ToggleButtonGroup, ToggleButton} from "../../../_snowpack/pkg/@material-ui/lab.js";
import {MoveToWComponentButton} from "../../canvas/MoveToWComponentButton.js";
import {TimeResolutionOptions} from "../../display_options/TimeResolutionOptions.js";
import {ACTIONS} from "../../state/actions.js";
import {TimeSlider} from "../../time_control/TimeSlider.js";
import {Button} from "../Button.js";
const map_state = (state) => ({
  linked_datetime_sliders: state.controls.linked_datetime_sliders,
  display_by_simulated_time: state.display_options.display_by_simulated_time,
  display_created_at_time_slider: state.controls.display_created_at_time_slider,
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  change_display_at_created_datetime: ACTIONS.display_at_created_datetime.change_display_at_created_datetime,
  change_display_at_sim_datetime: ACTIONS.display_at_sim_datetime.change_display_at_sim_datetime,
  toggle_linked_datetime_sliders: ACTIONS.controls.toggle_linked_datetime_sliders,
  set_display_by_simulated_time: ACTIONS.display.set_display_by_simulated_time
};
const connector = connect(map_state, map_dispatch);
function _ContentControls(props) {
  const {created_events, sim_events, move_to_component_id} = props;
  return /* @__PURE__ */ h(Box, {
    p: 2,
    mb: 2,
    borderTop: 1,
    borderColor: "primary.main"
  }, /* @__PURE__ */ h(Box, {
    mb: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(MoveToWComponentButton, {
    wcomponent_id: move_to_component_id
  })), /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(TimeResolutionOptions, null)), /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(ToggleButtonGroup, {
    size: "small",
    exclusive: true,
    onChange: (e) => {
      const display_by_simulated_time = JSON.parse(e.currentTarget.value);
      props.set_display_by_simulated_time({display_by_simulated_time});
    },
    value: props.display_by_simulated_time,
    "aria-label": "text formatting"
  }, /* @__PURE__ */ h(ToggleButton, {
    value: true,
    "aria-label": "Display by simulated time"
  }, "Time"), /* @__PURE__ */ h(ToggleButton, {
    value: false,
    "aria-label": "Display by relationships"
  }, "Relationships")))), /* @__PURE__ */ h(Box, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  }, (props.editing || props.display_created_at_time_slider) && /* @__PURE__ */ h(Button, {
    onClick: () => props.toggle_linked_datetime_sliders()
  }, props.linked_datetime_sliders ? "Unlink" : "Link"), /* @__PURE__ */ h(Box, {
    flexGrow: 1
  }, (props.editing || props.display_created_at_time_slider) && /* @__PURE__ */ h(TimeSlider, {
    events: created_events,
    get_handle_ms: (state) => state.routing.args.created_at_ms,
    change_handle_ms: (ms) => props.change_display_at_created_datetime({ms}),
    data_set_name: "content_controls_created_at_datetimes",
    title: "Created at"
  }), /* @__PURE__ */ h(TimeSlider, {
    events: sim_events,
    get_handle_ms: (state) => state.routing.args.sim_ms,
    change_handle_ms: (ms) => props.change_display_at_sim_datetime({ms}),
    data_set_name: "content_controls_sim_datetimes",
    title: "Simulation"
  }))));
}
export const ContentControls = connector(_ContentControls);
