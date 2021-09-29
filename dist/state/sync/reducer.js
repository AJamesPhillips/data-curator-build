import {get_items_by_id} from "../../shared/utils/get_items.js";
import {update_substate} from "../../utils/update_state.js";
import {is_upsert_knowledge_view} from "../specialised_objects/knowledge_views/actions.js";
import {
  is_clear_from_mem_all_specialised_objects,
  is_replace_all_specialised_objects
} from "../specialised_objects/syncing/actions.js";
import {is_upsert_wcomponent} from "../specialised_objects/wcomponents/actions.js";
import {is_update_sync_status, is_debug_refresh_all_specialised_object_ids_pending_save} from "./actions.js";
import {update_knowledge_view_last_source_of_truth, update_wcomponent_last_source_of_truth} from "./utils.js";
export const sync_reducer = (state, action) => {
  if (is_update_sync_status(action)) {
    const {status, error_message = "", attempt: retry_attempt} = action;
    const sync_state_for_data_type = {
      ...state.sync[action.data_type],
      status,
      error_message,
      retry_attempt
    };
    state = update_substate(state, "sync", action.data_type, sync_state_for_data_type);
    state = update_ready_for_fields(state);
  }
  if (is_debug_refresh_all_specialised_object_ids_pending_save(action)) {
    const wcomponents = Object.values(state.specialised_objects.wcomponents_by_id);
    const knowledge_views = Object.values(state.specialised_objects.knowledge_views_by_id);
    const ids_pending_save = prepare_specialised_object_ids_pending_save({wcomponents, knowledge_views});
    state = update_specialised_object_ids_pending_save(state, ids_pending_save);
  }
  if (is_clear_from_mem_all_specialised_objects(action)) {
    state = update_specialised_object_ids_pending_save(state, {knowledge_view_ids: new Set(), wcomponent_ids: new Set()});
    const last = {wcomponents: {}, knowledge_views: {}};
    state = update_substate(state, "sync", "last_source_of_truth_specialised_objects_by_id", last);
  }
  if (is_replace_all_specialised_objects(action)) {
    const {wcomponents, knowledge_views} = action.specialised_objects;
    const ids_pending_save = prepare_specialised_object_ids_pending_save({wcomponents, knowledge_views});
    state = update_specialised_object_ids_pending_save(state, ids_pending_save);
    const last = {
      wcomponents: get_items_by_id(wcomponents, "wcomponents"),
      knowledge_views: get_items_by_id(knowledge_views, "knowledge_views")
    };
    state = update_substate(state, "sync", "last_source_of_truth_specialised_objects_by_id", last);
  }
  if (is_upsert_wcomponent(action) && action.source_of_truth) {
    state = update_wcomponent_last_source_of_truth(state, action.wcomponent);
  }
  if (is_upsert_knowledge_view(action) && action.source_of_truth) {
    state = update_knowledge_view_last_source_of_truth(state, action.knowledge_view);
  }
  return state;
};
function update_ready_for_fields(state) {
  const {bases, specialised_objects} = state.sync;
  const specialised_objects_ready = get_ready_for_fields_for_data_type(specialised_objects);
  state = update_substate(state, "sync", "ready_for_reading", specialised_objects_ready.ready_for_reading);
  state = update_substate(state, "sync", "ready_for_writing", specialised_objects_ready.ready_for_writing);
  return state;
}
function get_ready_for_fields_for_data_type(state) {
  const {status} = state;
  const saved = status === "SAVED";
  const loaded = status === "LOADED";
  const failed = status === "FAILED";
  const ready_for_reading = status !== void 0 && status !== "LOADING";
  const ready_for_writing = saved || loaded || failed;
  return {ready_for_reading, ready_for_writing};
}
function prepare_specialised_object_ids_pending_save(args) {
  const wcomponent_ids = new Set(args.wcomponents.filter((wc) => wc.needs_save).map(({id}) => id));
  const knowledge_view_ids = new Set(args.knowledge_views.filter((wc) => wc.needs_save).map(({id}) => id));
  return {wcomponent_ids, knowledge_view_ids};
}
function update_specialised_object_ids_pending_save(state, ids_pending_save) {
  return update_substate(state, "sync", "specialised_object_ids_pending_save", ids_pending_save);
}