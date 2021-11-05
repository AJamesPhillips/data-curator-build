import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Box, Button, Toolbar, makeStyles, Collapse} from "../../../snowpack/pkg/@material-ui/core.js";
import "./ContentControls.css.proxy.js";
import {MoveToWComponentButton} from "../../canvas/MoveToWComponentButton.js";
import {TimeResolutionOptions} from "../../display_options/TimeResolutionOptions.js";
import {ACTIONS} from "../../state/actions.js";
import {TimeSlider} from "../../time_control/TimeSlider.js";
import {invert_disabled_appearance} from "../../ui_themes/invert_disabled.js";
import {ActiveCreatedAtFilterWarning} from "../ActiveCreatedAtFilterWarning.js";
import {ToggleDatetimeMarkers} from "./ToggleDatetimeMarkers.js";
import {get_actually_display_time_sliders} from "../../state/controls/accessors.js";
const map_state = (state) => {
  return {
    linked_datetime_sliders: state.controls.linked_datetime_sliders,
    display_by_simulated_time: state.display_options.display_by_simulated_time,
    display_time_sliders: state.controls.display_time_sliders,
    actually_display_time_sliders: get_actually_display_time_sliders(state),
    editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms
  };
};
const map_dispatch = {
  change_display_at_created_datetime: ACTIONS.display_at_created_datetime.change_display_at_created_datetime,
  change_display_at_sim_datetime: ACTIONS.display_at_sim_datetime.change_display_at_sim_datetime,
  toggle_linked_datetime_sliders: ACTIONS.controls.toggle_linked_datetime_sliders,
  set_display_time_sliders: ACTIONS.controls.set_display_time_sliders,
  set_display_by_simulated_time: ACTIONS.display.set_display_by_simulated_time
};
const connector = connect(map_state, map_dispatch);
function _ContentControls(props) {
  const [allow_drawing_attention, set_allow_drawing_attention] = useState(true);
  const invert_classes = invert_disabled_appearance();
  const {created_events, sim_events} = props;
  const classes = use_styles();
  return /* @__PURE__ */ h(Box, {
    p: 2,
    mb: 2,
    borderTop: 1,
    borderColor: "primary.main",
    position: "relative"
  }, /* @__PURE__ */ h(Collapse, {
    in: props.actually_display_time_sliders
  }, /* @__PURE__ */ h(Box, {
    className: classes.drawer_content
  }, /* @__PURE__ */ h(Button, {
    onClick: () => props.toggle_linked_datetime_sliders()
  }, props.linked_datetime_sliders ? "Unlink" : "Link"), /* @__PURE__ */ h(Box, {
    flexGrow: 1
  }, /* @__PURE__ */ h(TimeSlider, {
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
  })))), /* @__PURE__ */ h(Toolbar, {
    className: classes.toolbar,
    variant: "dense"
  }, /* @__PURE__ */ h(MoveToWComponentButton, {
    allow_drawing_attention,
    have_finished_drawing_attention: () => set_allow_drawing_attention(false)
  }), /* @__PURE__ */ h(ActiveCreatedAtFilterWarning, null), /* @__PURE__ */ h(Box, {
    component: "label",
    title: props.editing ? "Time sliders always shown whilst editing" : ""
  }, /* @__PURE__ */ h(Button, {
    variant: "contained",
    disableElevation: true,
    disabled: props.editing,
    onClick: () => props.set_display_time_sliders(!props.display_time_sliders)
  }, props.display_time_sliders ? "Hide" : "Show", " time sliders")), /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(TimeResolutionOptions, null)), /* @__PURE__ */ h(ToggleDatetimeMarkers, null)));
}
export const ContentControls = connector(_ContentControls);
const use_styles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between"
  },
  drawer_content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center"
  },
  warning_icon: {
    color: theme.palette.warning.main
  }
}));
