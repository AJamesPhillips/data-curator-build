import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function creation_context_persist(state) {
  const to_persist = pick([
    "use_creation_context",
    "creation_context"
  ], state.creation_context);
  persist_state_object("creation_context", to_persist);
}
export function creation_context_starting_state() {
  const obj = get_persisted_state_object("creation_context");
  const {
    use_creation_context = false,
    creation_context = {custom_created_at: void 0, label_ids: []}
  } = obj;
  let {custom_created_at, label_ids = []} = creation_context;
  custom_created_at = custom_created_at && new Date(custom_created_at);
  const state = {
    use_creation_context,
    creation_context: {custom_created_at, label_ids}
  };
  return state;
}
