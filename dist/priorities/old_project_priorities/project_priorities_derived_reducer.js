import {update_substate} from "../../utils/update_state.js";
import {get_project_priorities_meta} from "./get_project_priorities_meta.js";
export function project_priorities_derived_reducer(initial_state, state) {
  const should_update_project_priorities_meta = initial_state.objects !== state.objects;
  if (should_update_project_priorities_meta)
    state = update_derived_project_priorities_meta(state);
  return state;
}
const PATTERN_PROJECT_PRIORITY = "p10";
function update_derived_project_priorities_meta(state) {
  const objects = filter_objects_by_pattern_id(state.objects, PATTERN_PROJECT_PRIORITY);
  const project_priorities_meta = get_project_priorities_meta(objects, state.objects);
  state = update_substate(state, "derived", "project_priorities_meta", project_priorities_meta);
  return state;
}
function filter_objects_by_pattern_id(objects, find_pattern_id) {
  return objects.filter(({pattern_id}) => pattern_id === find_pattern_id);
}
