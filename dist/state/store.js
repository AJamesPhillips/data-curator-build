import {createStore} from "../../snowpack/pkg/redux.js";
import {display_options_subscribers} from "./display_options/subscribers.js";
import {record_keyupdown_activity} from "./global_keys/record_keyupdown_activity.js";
import {persist_all_state} from "./persistence/persistence.js";
import {root_reducer} from "./reducer.js";
import {periodically_change_display_at_created_datetime} from "./routing/datetime/display_at_created.js";
import {factory_location_hash} from "./routing/factory_location_hash.js";
import routing_subscribers from "./routing/subscribers/index.js";
import {conditional_ctrl_f_search} from "./search/conditional_ctrl_f_search.js";
import {meta_wcomponents_selecting_subscribers} from "./specialised_objects/meta_wcomponents/selecting/subscribers.js";
import {specialised_objects_subscribers} from "./specialised_objects/subscribers/subscribers.js";
import {get_starting_state} from "./starting_state.js";
import {periodically_backup_solid_data} from "./sync/backup/periodically_backup_solid_data.js";
import {optionally_copy_then_load_data} from "./sync/utils/optionally_copy_then_load_data.js";
import {conditionally_save_state, conditional_ctrl_s_save} from "./sync/utils/conditional_save_state.js";
let cached_store;
export function get_store(args = {}) {
  const {
    use_cache = true,
    override_preloaded_state = {},
    load_state_from_storage = false
  } = args;
  if (cached_store && use_cache)
    return cached_store;
  const preloaded_state = {
    ...get_starting_state(),
    ...override_preloaded_state
  };
  const store = createStore(root_reducer, preloaded_state);
  cached_store = store;
  if (load_state_from_storage) {
    optionally_copy_then_load_data(store);
  }
  const save = () => {
    const state = store.getState();
    persist_all_state(state);
    window.debug_state = state;
    conditionally_save_state(load_state_from_storage, store.dispatch, state);
    conditional_ctrl_s_save(load_state_from_storage, store.dispatch, state);
  };
  store.subscribe(save);
  window.onbeforeunload = save;
  store.subscribe(factory_location_hash(store));
  store.subscribe(specialised_objects_subscribers(store));
  display_options_subscribers(store);
  meta_wcomponents_selecting_subscribers(store);
  periodically_change_display_at_created_datetime(store);
  record_keyupdown_activity(store);
  periodically_backup_solid_data(store);
  conditional_ctrl_f_search(store);
  routing_subscribers.sync_storage_location_subscriber(store);
  return store;
}
