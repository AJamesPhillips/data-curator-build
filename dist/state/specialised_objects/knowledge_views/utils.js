import {update_substate} from "../../../utils/update_state.js";
export function handle_upsert_knowledge_view(state, knowledge_view) {
  const map = {...state.specialised_objects.knowledge_views_by_id};
  map[knowledge_view.id] = knowledge_view;
  return update_substate(state, "specialised_objects", "knowledge_views_by_id", map);
}
