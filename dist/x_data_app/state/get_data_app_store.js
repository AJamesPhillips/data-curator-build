import {createStore} from "../../../snowpack/pkg/redux.js";
import {root_reducer} from "./reducer.js";
import {get_starting_state} from "./starting_state.js";
let cached_store;
export function get_data_app_store(args = {}) {
  const {
    use_cache = true,
    override_preloaded_state = {},
    load_state_from_storage = false
  } = args;
  if (cached_store && use_cache)
    return cached_store;
  const preloaded_state = {
    ...get_starting_state(load_state_from_storage),
    ...override_preloaded_state
  };
  const store = createStore(root_reducer, preloaded_state);
  store.load_state_from_storage = load_state_from_storage;
  cached_store = store;
  return store;
}
