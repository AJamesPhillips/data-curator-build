import {update_substate} from "../../../utils/update_state.js";
import {get_datetime_and_ms} from "./routing_datetime.js";
export const display_at_sim_datetime_reducer = (state, action) => {
  if (is_change_display_at_sim_datetime(action)) {
    const {ms, datetime} = get_datetime_and_ms(action);
    const args = {
      ...state.routing.args,
      sim_datetime: datetime,
      sim_ms: ms
    };
    if (state.controls.linked_datetime_sliders) {
      args.created_at_datetime = datetime;
      args.created_at_ms = ms;
    }
    state = update_substate(state, "routing", "args", args);
  }
  return state;
};
const change_display_at_sim_datetime_type = "change_display_at_sim_datetime";
const change_display_at_sim_datetime = (args) => {
  return {type: change_display_at_sim_datetime_type, ...args};
};
const is_change_display_at_sim_datetime = (action) => {
  return action.type === change_display_at_sim_datetime_type;
};
export const display_at_sim_datetime_actions = {
  change_display_at_sim_datetime
};
