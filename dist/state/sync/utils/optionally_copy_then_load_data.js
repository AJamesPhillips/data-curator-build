import {load_state} from "./load_state.js";
import {swap_storage_type} from "./swap_storage.js";
export function optionally_copy_then_load_data(store) {
  swap_storage_type(store.dispatch, store.getState()).then(() => load_state(store));
}
