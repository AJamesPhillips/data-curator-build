import {update_substate} from "../../../utils/update_state.js";
import {update_specialised_object_ids_pending_save} from "../../sync/utils.js";
import {update_modified_or_deleted_by} from "../update_modified_by.js";
export function handle_upsert_wcomponent(state, wcomponent, is_source_of_truth, mark_as_deleted = false) {
  if (state.user_info.chosen_base_id !== wcomponent.base_id) {
    console.error(`Trying to save wcomponent "${wcomponent.id}" but its base_id "${wcomponent.base_id}" || ${state.user_info.chosen_base_id}`);
    return state;
  }
  const map = {...state.specialised_objects.wcomponents_by_id};
  wcomponent = is_source_of_truth ? wcomponent : update_modified_or_deleted_by(wcomponent, state, mark_as_deleted);
  map[wcomponent.id] = wcomponent;
  state = update_substate(state, "specialised_objects", "wcomponents_by_id", map);
  state = update_specialised_object_ids_pending_save(state, "wcomponent", wcomponent.id, !!wcomponent.needs_save);
  return state;
}
export function handle_add_wcomponent_to_store(state, wcomponent) {
  const map = {...state.specialised_objects.wcomponents_by_id};
  map[wcomponent.id] = wcomponent;
  state = update_substate(state, "specialised_objects", "wcomponents_by_id", map);
  return state;
}
