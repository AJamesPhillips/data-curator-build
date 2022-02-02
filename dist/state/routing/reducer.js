import {update_subsubstate} from "../../utils/update_state.js";
import {is_upsert_wcomponent} from "../specialised_objects/wcomponents/actions.js";
import {is_change_route} from "./actions.js";
import {merge_routing_state} from "./merge_routing_state.js";
import {routing_args_to_string} from "./routing.js";
import {get_latest_sim_ms_for_routing} from "./utils/get_latest_sim_ms_for_routing.js";
export const routing_reducer = (state, action) => {
  if (is_change_route(action)) {
    const {
      route,
      sub_route,
      item_id,
      args
    } = state.routing;
    const merged = merge_routing_state(state.routing, action);
    const changed = route !== merged.route || sub_route !== merged.sub_route || item_id !== merged.item_id || routing_args_to_string(args) !== routing_args_to_string(merged.args);
    if (changed) {
      state = {...state, routing: merged};
    }
  }
  if (is_upsert_wcomponent(action)) {
    const sim_ms = get_latest_sim_ms_for_routing(action.wcomponent, state);
    if (sim_ms !== state.routing.args.sim_ms) {
      state = update_subsubstate(state, "routing", "args", "sim_ms", sim_ms);
    }
  }
  return state;
};
