export function needs_save(state) {
  const {wcomponent_ids, knowledge_view_ids} = state.sync.specialised_object_ids_pending_save;
  return wcomponent_ids.size + knowledge_view_ids.size > 0;
}
export function get_next_specialised_state_id_to_save(state) {
  const {wcomponent_ids, knowledge_view_ids} = state.sync.specialised_object_ids_pending_save;
  const wcomponent_ids_iterator = wcomponent_ids.values();
  const wcomponent_id = wcomponent_ids_iterator.next();
  if (!wcomponent_id.done) {
    const id = wcomponent_id.value;
    return {id, object_type: "wcomponent"};
  }
  const knowledge_view_ids_iterator = knowledge_view_ids.values();
  const knowledge_view_id = knowledge_view_ids_iterator.next();
  if (!knowledge_view_id.done) {
    const id = knowledge_view_id.value;
    return {id, object_type: "knowledge_view"};
  }
  return void 0;
}
