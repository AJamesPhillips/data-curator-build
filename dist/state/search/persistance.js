import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function search_persist(state) {
  const to_persist = pick([
    "search_fields",
    "search_type"
  ], state.search);
  persist_state_object("search", to_persist);
}
export function search_starting_state() {
  const obj = get_persisted_state_object("search");
  const state = {
    search_fields: "all",
    search_type: "best",
    ...obj
  };
  return state;
}
