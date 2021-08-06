import {createStore} from "../../snowpack/pkg/redux.js";
import {display_options_subscribers} from "./display_options/subscribers.js";
import {record_keyupdown_activity} from "./global_keys/record_keyupdown_activity.js";
import {render_all_objects, render_all_objects_and_update_store} from "./objects/rendering.js";
import {root_reducer} from "./reducer.js";
import {periodically_change_display_at_created_datetime} from "./routing/datetime/display_at_created.js";
import {factory_location_hash} from "./routing/factory_location_hash.js";
import {meta_wcomponents_selecting_subscribers} from "./specialised_objects/meta_wcomponents/selecting/subscribers.js";
import {specialised_objects_subscribers} from "./specialised_objects/subscribers/subscribers.js";
import {get_starting_state} from "./starting_state.js";
import {load_state} from "./sync_utils/load_state.js";
import {save_state} from "./sync_utils/save_state.js";
import {persist_all_state} from "./utils/persistence.js";
let cached_store;
export function get_store(args = {}) {
  const {
    use_cache = true,
    override_preloaded_state = {},
    load_state_from_server = false
  } = args;
  if (cached_store && use_cache)
    return cached_store;
  const preloaded_state = render_all_objects({
    ...get_starting_state(),
    ...override_preloaded_state
  });
  const store = createStore(root_reducer, preloaded_state);
  cached_store = store;
  if (load_state_from_server)
    load_state(store.dispatch);
  const save = () => {
    const state = store.getState();
    persist_all_state(state);
    window.debug_state = state;
    if (!state.sync.ready || !load_state_from_server)
      return;
    save_state(store.dispatch, state);
  };
  store.subscribe(save);
  window.onbeforeunload = save;
  store.subscribe(render_all_objects_and_update_store(store));
  store.subscribe(factory_location_hash(store));
  store.subscribe(specialised_objects_subscribers(store));
  display_options_subscribers(store);
  meta_wcomponents_selecting_subscribers(store);
  periodically_change_display_at_created_datetime(store);
  record_keyupdown_activity(store);
  return store;
}
