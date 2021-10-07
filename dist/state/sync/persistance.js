import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function sync_persist(state) {
  const to_persist = pick([], state.sync);
  persist_state_object("sync", to_persist);
}
export function sync_starting_state() {
  const obj = get_persisted_state_object("sync");
  const default_sync_state_for_one_data_type = {
    status: void 0,
    error_message: "",
    retry_attempt: void 0
  };
  const state = {
    storage_type: "supabase",
    last_source_of_truth_specialised_objects_by_id: {
      wcomponents: {},
      knowledge_views: {}
    },
    specialised_object_ids_pending_save: {
      wcomponent_ids: new Set(),
      knowledge_view_ids: new Set()
    },
    specialised_objects_save_conflicts: {
      wcomponent_conflicts_by_id: {},
      knowledge_view_conflicts_by_id: {}
    },
    ready_for_reading: false,
    ready_for_writing: false,
    network_functional: true,
    network_function_last_checked: void 0,
    bases: {...default_sync_state_for_one_data_type},
    specialised_objects: {...default_sync_state_for_one_data_type},
    ...obj
  };
  return state;
}
