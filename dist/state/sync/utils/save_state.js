import {ACTIONS} from "../../actions.js";
import {get_next_specialised_state_id_to_save} from "./needs_save.js";
import {get_knowledge_view_from_state, get_wcomponent_from_state} from "../../specialised_objects/accessors.js";
import {get_supabase} from "../../../supabase/get_supabase.js";
import {supabase_upsert_wcomponent} from "../supabase/wcomponent.js";
import {merge_wcomponent} from "../merge/merge_wcomponents.js";
import {
  get_last_source_of_truth_knowledge_view_from_state,
  get_last_source_of_truth_wcomponent_from_state
} from "../selector.js";
import {supabase_upsert_knowledge_view} from "../supabase/knowledge_view.js";
import {merge_knowledge_view} from "../merge/merge_knowledge_views.js";
let global_attempts = 0;
export async function save_state(store) {
  const state = store.getState();
  if (!state.sync.ready_for_writing) {
    console.error(`Inconsistent state violation.  Save state called whilst state.sync.status: "${state.sync.specialised_objects.status}", ready_for_writing: ${state.sync.ready_for_writing}`);
    return Promise.reject();
  }
  const next_id_to_save = get_next_specialised_state_id_to_save(state);
  if (!next_id_to_save) {
    const {wcomponent_ids, knowledge_view_ids} = state.sync.specialised_object_ids_pending_save;
    const wc_ids = JSON.stringify(Array.from(wcomponent_ids));
    const kv_ids = JSON.stringify(Array.from(knowledge_view_ids));
    console.error(`Inconsistent state violation.  No ids need to be saved: "${wc_ids}", "${kv_ids}"`);
    return Promise.reject();
  }
  store.dispatch(ACTIONS.sync.update_sync_status({status: "SAVING", data_type: "specialised_objects"}));
  let promise_response;
  if (next_id_to_save.object_type === "knowledge_view") {
    promise_response = save_knowledge_view(next_id_to_save.id, store);
  } else {
    promise_response = save_wcomponent(next_id_to_save.id, store);
  }
  try {
    global_attempts += 1;
    const successfully_finished_upsert = await promise_response;
    if (successfully_finished_upsert)
      global_attempts = 0;
    if (global_attempts < 10) {
      store.dispatch(ACTIONS.sync.update_sync_status({status: "SAVED", data_type: "specialised_objects"}));
    } else {
      store.dispatch(ACTIONS.sync.update_sync_status({
        status: "FAILED",
        data_type: "specialised_objects",
        error_message: `Try manually saving or refresh the page.  Failing that contact the team.`,
        attempt: global_attempts
      }));
    }
  } catch (err) {
    console.error(`Got error saving ${next_id_to_save.object_type} ${next_id_to_save.id}.  Error: ${err}`);
    store.dispatch(ACTIONS.sync.update_sync_status({
      status: "FAILED",
      data_type: "specialised_objects",
      error_message: `${err}`,
      attempt: global_attempts
    }));
  }
  return Promise.resolve();
}
async function save_knowledge_view(id, store) {
  const object_type = "knowledge_view";
  const maybe_initial_item = get_knowledge_view_from_state(store.getState(), id);
  const pre_upsert_check_result = pre_upsert_check(id, store, object_type, maybe_initial_item);
  if (pre_upsert_check_result.error)
    return pre_upsert_check_result.error;
  const initial_item = pre_upsert_check_result.initial_item;
  const supabase = get_supabase();
  const response = await supabase_upsert_knowledge_view({supabase, knowledge_view: initial_item});
  const post_upsert_check_result = post_upsert_check(id, store, object_type, response);
  if (post_upsert_check_result.error)
    return post_upsert_check_result.error;
  const {create_successful, update_successful, latest_source_of_truth} = post_upsert_check_result;
  const last_source_of_truth = get_last_source_of_truth_knowledge_view_from_state(store.getState(), id);
  const current_value = get_knowledge_view_from_state(store.getState(), id);
  store.dispatch(ACTIONS.specialised_object.upsert_knowledge_view({
    knowledge_view: latest_source_of_truth,
    source_of_truth: true
  }));
  const check_merge_args_result = check_merge_args({
    object_type,
    initial_item,
    last_source_of_truth,
    current_value
  });
  if (check_merge_args_result.error)
    return check_merge_args_result.error;
  if (check_merge_args_result.merge_args) {
    const merge = merge_knowledge_view({
      ...check_merge_args_result.merge_args,
      source_of_truth: latest_source_of_truth,
      update_successful
    });
    if (merge.needs_save) {
      store.dispatch(ACTIONS.specialised_object.upsert_knowledge_view({
        knowledge_view: {
          ...merge.value
        },
        source_of_truth: false
      }));
    }
    if (merge.unresolvable_conflicted_fields.length) {
    }
  }
  return Promise.resolve(create_successful || update_successful);
}
async function save_wcomponent(id, store) {
  const object_type = "wcomponent";
  const maybe_initial_item = get_wcomponent_from_state(store.getState(), id);
  const pre_upsert_check_result = pre_upsert_check(id, store, object_type, maybe_initial_item);
  if (pre_upsert_check_result.error)
    return pre_upsert_check_result.error;
  const initial_item = pre_upsert_check_result.initial_item;
  const supabase = get_supabase();
  const response = await supabase_upsert_wcomponent({supabase, wcomponent: initial_item});
  const post_upsert_check_result = post_upsert_check(id, store, object_type, response);
  if (post_upsert_check_result.error)
    return post_upsert_check_result.error;
  const {create_successful, update_successful, latest_source_of_truth} = post_upsert_check_result;
  const last_source_of_truth = get_last_source_of_truth_wcomponent_from_state(store.getState(), id);
  const current_value = get_wcomponent_from_state(store.getState(), id);
  store.dispatch(ACTIONS.specialised_object.upsert_wcomponent({
    wcomponent: latest_source_of_truth,
    source_of_truth: true
  }));
  const check_merge_args_result = check_merge_args({
    object_type,
    initial_item,
    last_source_of_truth,
    current_value
  });
  if (check_merge_args_result.error)
    return check_merge_args_result.error;
  if (check_merge_args_result.merge_args) {
    const merge = merge_wcomponent({
      ...check_merge_args_result.merge_args,
      source_of_truth: latest_source_of_truth,
      update_successful
    });
    if (merge.needs_save) {
      store.dispatch(ACTIONS.specialised_object.upsert_wcomponent({
        wcomponent: {
          ...merge.value
        },
        source_of_truth: false
      }));
    }
    if (merge.unresolvable_conflicted_fields.length) {
    }
  }
  return Promise.resolve(create_successful || update_successful);
}
function pre_upsert_check(id, store, object_type, initial_item) {
  if (!initial_item) {
    store.dispatch(ACTIONS.sync.debug_refresh_all_specialised_object_ids_pending_save());
    const error = Promise.reject(`Inconsistent state violation.  save_"${object_type}" but no item for id: "${id}".  Updating all specialised_object_ids_pending_save.`);
    return {error, initial_item: void 0};
  }
  store.dispatch(ACTIONS.sync.update_specialised_object_sync_info({
    id: initial_item.id,
    object_type,
    saving: true
  }));
  return {error: void 0, initial_item};
}
function post_upsert_check(id, store, object_type, response) {
  const create_successful = response.status === 201;
  const update_successful = response.status === 200;
  if (!create_successful && !update_successful && response.status !== 409) {
    const error = Promise.reject(`save_"${object_type}" got "${response.status}" error: "${response.error}"`);
    return {error, create_successful, update_successful, latest_source_of_truth: void 0};
  }
  const latest_source_of_truth = response.item;
  if (!latest_source_of_truth) {
    const error = Promise.reject(`Inconsistent state violation.  save_"${object_type}" got "${response.status}" but no latest_source_of_truth item.  Error: "${response.error}".`);
    return {error, create_successful, update_successful, latest_source_of_truth};
  }
  return {error: void 0, create_successful, update_successful, latest_source_of_truth};
}
function check_merge_args(args) {
  const {object_type, initial_item, last_source_of_truth, current_value} = args;
  if (!last_source_of_truth) {
    if (initial_item.modified_at) {
      const error = Promise.reject(`Inconsistent state violation.  save_"${object_type}" found no last_source_of_truth "${object_type}" for id: "${initial_item.id}" but "${object_type}" had a modified_at already set`);
      return {error, merge_args: void 0};
    } else {
    }
  } else {
    if (!current_value) {
      const error = Promise.reject(`Inconsistent state violation.  save_"${object_type}" found "${object_type}" last_source_of_truth but no current_value for id "${initial_item.id}".`);
      return {error, merge_args: void 0};
    }
    return {error: void 0, merge_args: {last_source_of_truth, current_value}};
  }
  return {error: void 0, merge_args: void 0};
}
