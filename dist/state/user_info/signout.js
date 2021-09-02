import {getDefaultSession} from "../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {ACTIONS} from "../actions.js";
import {get_store} from "../store.js";
import {throttled_save_state} from "../sync/utils/save_state.js";
export async function signout() {
  const solid_session = getDefaultSession();
  const store = get_store();
  await solid_session.logout();
  store.dispatch(ACTIONS.user_info.update_users_name_and_solid_pod_URL({user_name: "", default_solid_pod_URL: ""}));
  store.dispatch(ACTIONS.sync.set_next_sync_ms({next_save_ms: void 0}));
  throttled_save_state.cancel();
}
