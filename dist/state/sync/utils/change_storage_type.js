import {getDefaultSession} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {ACTIONS} from "../../actions.js";
import {get_store} from "../../store.js";
import {optionally_copy_then_load_data} from "./optionally_copy_then_load_data.js";
import {throttled_save_state} from "./save_state.js";
export async function change_storage_type({new_storage_type, copy_from}) {
  const store = get_store();
  const promise_flush = throttled_save_state.flush();
  store.dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: void 0}));
  if (promise_flush)
    await promise_flush;
  store.dispatch(ACTIONS.sync.update_sync_status({status: "LOADING"}));
  store.dispatch(ACTIONS.specialised_object.delete_all_specialised_objects());
  store.dispatch(ACTIONS.sync.update_storage_type({storage_type: new_storage_type, copy_from}));
  if (new_storage_type === "solid" && !getDefaultSession().info.isLoggedIn) {
    return;
  }
  optionally_copy_then_load_data(store);
}
