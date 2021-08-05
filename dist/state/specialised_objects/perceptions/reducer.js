import {update_substate} from "../../../utils/update_state.js";
import {is_upsert_perception, is_delete_perception} from "./actions.js";
export const perceptions_reducer = (state, action) => {
  if (is_upsert_perception(action)) {
    const map = {...state.specialised_objects.perceptions_by_id, [action.perception.id]: action.perception};
    state = update_substate(state, "specialised_objects", "perceptions_by_id", map);
  }
  if (is_delete_perception(action)) {
    const map = {...state.specialised_objects.perceptions_by_id};
    delete map[action.perception_id];
    state = update_substate(state, "specialised_objects", "perceptions_by_id", map);
  }
  return state;
};
