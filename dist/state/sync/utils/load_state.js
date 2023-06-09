import {ACTIONS} from "../../actions.js";
import {parse_specialised_objects_from_server_data} from "../../specialised_objects/parse_server_data.js";
import {error_to_string} from "./errors.js";
import {supabase_load_data} from "../supabase/supabase_load_data.js";
import {ensure_any_knowledge_view_displayed} from "../../routing/utils/ensure_any_knowledge_view_displayed.js";
export function load_state(store) {
  let state = store.getState();
  const {dispatch} = store;
  const {chosen_base_id} = state.user_info;
  if (chosen_base_id === state.sync.specialised_objects.loading_base_id) {
    return;
  }
  store.dispatch(ACTIONS.specialised_object.clear_from_mem_all_specialised_objects());
  if (chosen_base_id === void 0) {
    return;
  }
  dispatch(ACTIONS.sync.update_sync_status({
    status: "LOADING",
    data_type: "specialised_objects",
    loading_base_id: chosen_base_id
  }));
  supabase_load_data(store.load_state_from_storage, chosen_base_id).then((data) => parse_specialised_objects_from_server_data(data)).then((specialised_objects) => {
    dispatch(ACTIONS.specialised_object.replace_all_specialised_objects({specialised_objects}));
    ensure_any_knowledge_view_displayed(store);
    dispatch(ACTIONS.sync.update_sync_status({status: "LOADED", data_type: "specialised_objects"}));
  }).catch((error) => {
    const error_message = error_to_string(error);
    console.error(error);
    dispatch(ACTIONS.sync.update_sync_status({status: "FAILED", data_type: "specialised_objects", error_message}));
  });
}
