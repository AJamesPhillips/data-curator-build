import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MoveToItemButton} from "../canvas/MoveToWComponentButton.js";
import {ACTIONS} from "../state/actions.js";
import {TimeSlider} from "../time_control/TimeSlider.js";
const map_state = (state) => ({
  events: []
});
const map_dispatch = {
  change_display_at_created_datetime: ACTIONS.display_at_created_datetime.change_display_at_created_datetime,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _PrioritiesContentControls(props) {
  const [allow_drawing_attention, set_allow_drawing_attention] = useState(true);
  const position = {x: 0, y: 0, zoom: 100};
  const components_on_screen = true;
  const draw_attention = allow_drawing_attention && position && !components_on_screen;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(MoveToItemButton, {
    move: () => props.change_route({args: position}),
    draw_attention,
    have_finished_drawing_attention: () => set_allow_drawing_attention(false)
  }), /* @__PURE__ */ h(TimeSlider, {
    title: "Created at datetimes",
    get_handle_ms: (state) => state.routing.args.created_at_ms,
    change_handle_ms: (ms) => props.change_display_at_created_datetime({ms}),
    events: props.events,
    data_set_name: "priorities"
  }));
}
export const PrioritiesContentControls = connector(_PrioritiesContentControls);
