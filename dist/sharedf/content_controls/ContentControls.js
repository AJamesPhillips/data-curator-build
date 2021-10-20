import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Box, ButtonGroup, Button, Toolbar, makeStyles, Collapse} from "../../../snowpack/pkg/@material-ui/core.js";
import "./ContentControls.css.proxy.js";
import {MoveToWComponentButton} from "../../canvas/MoveToWComponentButton.js";
import {TimeResolutionOptions} from "../../display_options/TimeResolutionOptions.js";
import {ACTIONS} from "../../state/actions.js";
import {TimeSlider} from "../../time_control/TimeSlider.js";
import {invert_disabled_appearance} from "../../ui_themes/invert_disabled.js";
import {ActiveCreatedAtFilterWarning} from "../ActiveCreatedAtFilterWarning.js";
import {ToggleDatetimeMarkers} from "./ToggleDatetimeMarkers.js";
import {get_current_composed_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {screen_height, screen_width} from "../../state/display_options/display.js";
import {SCALE_BY} from "../../canvas/zoom_utils.js";
let displayed_pulse_circle_on_move_to_components = true;
const map_state = (state) => {
  let nodes_on_screen = void 0;
  if (displayed_pulse_circle_on_move_to_components) {
    nodes_on_screen = calculate_if_nodes_on_screen(state);
  }
  return {
    linked_datetime_sliders: state.controls.linked_datetime_sliders,
    display_by_simulated_time: state.display_options.display_by_simulated_time,
    display_time_sliders: state.controls.display_time_sliders,
    editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms,
    nodes_on_screen
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
  const invert_classes = invert_disabled_appearance();
  const {created_events, sim_events, move_to_component_id, nodes_on_screen} = props;
  const display_sliders = props.editing || props.display_time_sliders;
  const classes = use_styles();
  return /* @__PURE__ */ h(Box, {
    p: 2,
    mb: 2,
    borderTop: 1,
    borderColor: "primary.main",
    position: "relative"
  }, /* @__PURE__ */ h(Collapse, {
    in: display_sliders
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
  }, /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(MoveToWComponentButton, {
    wcomponent_id: move_to_component_id
  }), /* @__PURE__ */ h("div", {
    className: !move_to_component_id || !displayed_pulse_circle_on_move_to_components || nodes_on_screen ? "" : "pulsating_circle",
    ref: (e) => setTimeout(() => {
      e?.classList.remove("pulsating_circle");
      displayed_pulse_circle_on_move_to_components = false;
    }, 1e4)
  })), /* @__PURE__ */ h(ActiveCreatedAtFilterWarning, null), /* @__PURE__ */ h(Box, {
    component: "label",
    title: props.editing ? "Time sliders always shown whilst editing" : ""
  }, /* @__PURE__ */ h(Button, {
    variant: "contained",
    disableElevation: true,
    disabled: props.editing,
    onClick: () => props.set_display_time_sliders(!props.display_time_sliders)
  }, display_sliders ? "Hide" : "Show", " time sliders")), /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(TimeResolutionOptions, null)), /* @__PURE__ */ h(ToggleDatetimeMarkers, null), /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(ButtonGroup, {
    disableElevation: true,
    variant: "contained",
    value: props.display_by_simulated_time
  }, /* @__PURE__ */ h(Button, {
    onClick: () => props.set_display_by_simulated_time(true),
    "aria-label": "Display by simulated time",
    className: invert_classes.inverse_disabled,
    disabled: props.display_by_simulated_time
  }, "Time"), /* @__PURE__ */ h(Button, {
    onClick: () => props.set_display_by_simulated_time(false),
    "aria-label": "Display by relationships",
    className: invert_classes.inverse_disabled,
    disabled: !props.display_by_simulated_time
  }, "Relationships")))));
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
function calculate_if_nodes_on_screen(state) {
  let nodes_on_screen = void 0;
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (composed_kv) {
    const {composed_wc_id_map, wc_ids_by_type} = composed_kv;
    const {x, y, zoom} = state.routing.args;
    const max_x = x + screen_width() * (zoom / SCALE_BY);
    const max_y = y - screen_height() * (zoom / SCALE_BY);
    nodes_on_screen = !!Array.from(wc_ids_by_type.any_node).find((id) => {
      const position = composed_wc_id_map[id];
      if (!position)
        return false;
      const {left, top} = position;
      return left >= x && left <= max_x && -top <= y && -top >= max_y;
    });
    if (!nodes_on_screen)
      debugger;
  }
  return nodes_on_screen;
}
