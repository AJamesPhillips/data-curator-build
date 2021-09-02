export function needs_save(state, last_attempted_state_to_save) {
  return !last_attempted_state_to_save || last_attempted_state_to_save.specialised_objects !== state.specialised_objects;
}
export function get_specialised_state_to_save(state) {
  const specialised_state = {
    perceptions: state.derived.perceptions,
    wcomponents: state.derived.wcomponents,
    knowledge_views: state.derived.knowledge_views
  };
  return specialised_state;
}
