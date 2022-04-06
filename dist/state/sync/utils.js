import {ensure_item_in_set, ensure_item_not_in_set} from "../../utils/set.js";
import {update_subsubstate, update_subsubsubstate} from "../../utils/update_state.js";
import {tidy_wcomponent} from "../specialised_objects/wcomponents/tidy_wcomponent.js";
import {clean_base_object_of_sync_meta_fields} from "./supabase/clean_base_object_for_supabase.js";
export function update_specialised_object_ids_pending_save(state, object_type, id, pending_save) {
  let {wcomponent_ids, knowledge_view_ids} = state.sync.specialised_object_ids_pending_save;
  const wcomponents = object_type === "wcomponent";
  let ids = wcomponents ? wcomponent_ids : knowledge_view_ids;
  ids = pending_save ? ensure_item_in_set(ids, id) : ensure_item_not_in_set(ids, id);
  const key = wcomponents ? "wcomponent_ids" : "knowledge_view_ids";
  state = update_subsubstate(state, "sync", "specialised_object_ids_pending_save", key, ids);
  return state;
}
export function update_wcomponent_last_source_of_truth(state, item) {
  item = tidy_wcomponent(item, state.specialised_objects.wcomponents_by_id);
  item = clean_base_object_of_sync_meta_fields(item);
  state = update_subsubsubstate(state, "sync", "last_source_of_truth_specialised_objects_by_id", "wcomponents", item.id, item);
  return state;
}
export function update_knowledge_view_last_source_of_truth(state, item) {
  item = clean_base_object_of_sync_meta_fields(item);
  state = update_subsubsubstate(state, "sync", "last_source_of_truth_specialised_objects_by_id", "knowledge_views", item.id, item);
  return state;
}
