import {get_supabase} from "../../supabase/get_supabase.js";
import {ACTIONS} from "../actions.js";
import {pub_sub} from "../pub_sub/pub_sub.js";
import {refresh_bases_for_current_user} from "./utils.js";
export function user_info_subscribers(store) {
  const starting_state = store.getState();
  if (!store.load_state_from_storage)
    return;
  const {user, users_by_id, bases_by_id: bases} = starting_state.user_info;
  if (user && !users_by_id)
    get_users(store);
  if (user && !bases)
    refresh_bases_for_current_user(store);
  pub_sub.user.sub("changed_user", () => {
    get_users(store);
    refresh_bases_for_current_user(store);
  });
  pub_sub.user.sub("stale_users_by_id", () => get_users(store));
  pub_sub.user.sub("stale_bases", () => refresh_bases_for_current_user(store));
}
async function get_users(store) {
  const {user} = store.getState().user_info;
  if (!user) {
    store.dispatch(ACTIONS.user_info.set_users({users: void 0}));
    return;
  }
  const supabase = get_supabase();
  const {data, error} = await supabase.from("users").select("*");
  if (data)
    store.dispatch(ACTIONS.user_info.set_users({users: data}));
}
