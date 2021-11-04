import {get_all_bases} from "../../supabase/bases.js";
import {ACTIONS} from "../actions.js";
import {get_store} from "../store.js";
export async function refresh_bases_for_current_user(store) {
  if (!store)
    store = get_store();
  const {user} = store.getState().user_info;
  if (!user) {
    store.dispatch(ACTIONS.user_info.update_bases({bases: void 0}));
    return {error: void 0};
  }
  store.dispatch(ACTIONS.sync.update_sync_status({status: "LOADING", data_type: "bases"}));
  const {data, error} = await get_all_bases(user.id);
  store.dispatch(ACTIONS.user_info.update_bases({bases: data}));
  const status = error ? "FAILED" : "LOADED";
  store.dispatch(ACTIONS.sync.update_sync_status({status, data_type: "bases"}));
  return {error: error || void 0};
}
