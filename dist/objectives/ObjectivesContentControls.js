import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {TimeSlider} from "../time_control/TimeSlider.js";
const map_state = (state) => ({
  events: []
});
const map_dispatch = {
  change_display_at_created_datetime: ACTIONS.display_at_created_datetime.change_display_at_created_datetime
};
const connector = connect(map_state, map_dispatch);
function _ObjectivesContentControls(props) {
  return /* @__PURE__ */ h(TimeSlider, {
    title: "Created at datetimes",
    get_handle_ms: (state) => state.routing.args.created_at_ms,
    change_handle_ms: (ms) => props.change_display_at_created_datetime({ms}),
    events: props.events,
    data_set_name: "objectives"
  });
}
export const ObjectivesContentControls = connector(_ObjectivesContentControls);
