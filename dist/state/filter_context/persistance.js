import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function filter_context_persist(state) {
  const to_persist = pick([
    "apply_filter",
    "filters"
  ], state.filter_context);
  persist_state_object("filter_context", to_persist);
}
export function filter_context_starting_state() {
  const obj = get_persisted_state_object("filter_context");
  if (obj.filters instanceof Array)
    delete obj.filters;
  const {
    apply_filter = false,
    filters = {
      exclude_by_label_ids: [],
      include_by_label_ids: [],
      exclude_by_component_types: [],
      include_by_component_types: []
    }
  } = obj;
  const state = {
    apply_filter,
    filters
  };
  return state;
}
