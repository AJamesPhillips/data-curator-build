import {update_substate} from "../../../../utils/update_state.js";
import {
  is_set_find_all_causal_paths_wcomponent_ids
} from "./actions.js";
export const find_all_causal_paths_reducer = (state, action) => {
  if (is_set_find_all_causal_paths_wcomponent_ids(action)) {
    const key = action.direction === "from" ? "find_all_causal_paths_from_wcomponent_ids" : "find_all_causal_paths_to_wcomponent_ids";
    state = update_substate(state, "meta_wcomponents", key, action.ids);
  }
  return state;
};
