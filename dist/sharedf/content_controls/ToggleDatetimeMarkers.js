import {Box, ButtonGroup, Button} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {get_middle_of_screen} from "../../state/display_options/display.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_current_knowledge_view_from_state
} from "../../state/specialised_objects/accessors.js";
import {get_store} from "../../state/store.js";
const map_state = (state) => {
  const current_composed_kv = get_current_composed_knowledge_view_from_state(state);
  const time_origin_ms_present = (current_composed_kv && current_composed_kv.composed_datetime_line_config.time_origin_ms) !== void 0;
  const current_kv = get_current_knowledge_view_from_state(state);
  return {
    display_time_marks: state.display_options.display_time_marks,
    sim_ms: state.routing.args.sim_ms,
    time_origin_ms_present,
    current_kv
  };
};
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view,
  set_display_time_marks: ACTIONS.display.set_display_time_marks
};
const connector = connect(map_state, map_dispatch);
function _ToggleDatetimeMarkers(props) {
  const {display_time_marks, time_origin_ms_present, current_kv} = props;
  return /* @__PURE__ */ h(Box, {
    component: "label"
  }, /* @__PURE__ */ h(ButtonGroup, {
    disableElevation: true,
    variant: "contained",
    value: display_time_marks
  }, /* @__PURE__ */ h(Button, {
    onClick: () => {
      const new_display_time_marks = !display_time_marks;
      if (new_display_time_marks && !time_origin_ms_present && current_kv) {
        const store = get_store();
        const left = get_middle_of_screen(store.getState()).left;
        const new_knowledge_view = {
          ...current_kv,
          datetime_line_config: {
            ...current_kv.datetime_line_config,
            time_origin_ms: props.sim_ms,
            time_origin_x: left
          }
        };
        props.upsert_knowledge_view({knowledge_view: new_knowledge_view});
      }
      props.set_display_time_marks(new_display_time_marks);
    },
    "aria-label": "Toggle displaying time markers"
  }, display_time_marks ? "Hide" : "Show" + (time_origin_ms_present ? "" : " (Set)"), " time")));
}
export const ToggleDatetimeMarkers = connector(_ToggleDatetimeMarkers);
