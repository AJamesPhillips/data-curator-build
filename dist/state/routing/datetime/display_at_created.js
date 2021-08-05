import {update_substate} from "../../../utils/update_state.js";
import {get_datetime_and_ms} from "./routing_datetime.js";
export const display_at_created_datetime_reducer = (state, action) => {
  if (is_change_display_at_created_datetime(action)) {
    const {ms, datetime} = get_datetime_and_ms(action);
    const args = {
      ...state.routing.args,
      created_at_datetime: datetime,
      created_at_ms: ms
    };
    if (state.controls.linked_datetime_sliders) {
      args.sim_datetime = datetime;
      args.sim_ms = ms;
    }
    state = update_substate(state, "routing", "args", args);
  }
  return state;
};
const change_display_at_created_datetime_type = "change_display_at_created_datetime";
const change_display_at_created_datetime = (args) => {
  return {type: change_display_at_created_datetime_type, ...args};
};
const is_change_display_at_created_datetime = (action) => {
  return action.type === change_display_at_created_datetime_type;
};
export const display_at_created_datetime_actions = {
  change_display_at_created_datetime
};
const one_hour = 3600 * 1e3;
export function periodically_change_display_at_created_datetime(store) {
  setTimeout(() => {
    store.dispatch(change_display_at_created_datetime({datetime: new Date()}));
  }, one_hour);
}
