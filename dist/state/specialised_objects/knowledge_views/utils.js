import {update_substate} from "../../../utils/update_state.js";
import {update_specialised_object_ids_pending_save} from "../../sync/utils.js";
import {update_modified_by} from "../update_modified_by.js";
export function handle_upsert_knowledge_view(state, knowledge_view, source_of_truth) {
  const map = {...state.specialised_objects.knowledge_views_by_id};
  knowledge_view = source_of_truth ? knowledge_view : update_modified_by(knowledge_view, state);
  map[knowledge_view.id] = knowledge_view;
  state = update_substate(state, "specialised_objects", "knowledge_views_by_id", map);
  state = update_specialised_object_ids_pending_save(state, "knowledge_view", knowledge_view.id, !!knowledge_view.needs_save);
  return state;
}
