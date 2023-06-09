import {get_supabase} from "../../supabase/get_supabase.js";
import {ACTIONS} from "../actions.js";
import {pub_sub} from "../pub_sub/pub_sub.js";
import {selector_chosen_base} from "./selector.js";
import {refresh_bases_for_current_user} from "./refresh_bases_for_current_user.js";
export function user_info_subscribers(store) {
  if (!store.load_state_from_storage)
    return;
  const starting_state = store.getState();
  const {users_by_id, bases_by_id} = starting_state.user_info;
  if (!users_by_id)
    get_users(store);
  if (!bases_by_id)
    refresh_bases_for_current_user(store);
  pub_sub.user.sub("changed_user", () => {
    if (!selector_chosen_base(store.getState())?.public_read) {
      store.dispatch(ACTIONS.specialised_object.clear_from_mem_all_specialised_objects());
    }
    pub_sub.user.pub("stale_users_by_id", true);
    pub_sub.user.pub("stale_bases", true);
  });
  pub_sub.user.sub("stale_users_by_id", (full_reload_required) => {
    if (full_reload_required)
      store.dispatch(ACTIONS.user_info.set_users({users: void 0}));
    get_users(store);
  });
  pub_sub.user.sub("stale_bases", (full_reload_required) => {
    refresh_bases_for_current_user(store, full_reload_required);
  });
  const supabase = get_supabase();
  supabase.auth.onAuthStateChange(() => {
    const current_user = store.getState().user_info.user;
    const user = supabase.auth.user() || void 0;
    const diff_user = current_user?.id !== user?.id;
    if (diff_user)
      store.dispatch(ACTIONS.user_info.set_user({user}));
  });
}
async function get_users(store) {
  const supabase = get_supabase();
  const {data, error} = await supabase.from("users").select("*");
  if (data)
    store.dispatch(ACTIONS.user_info.set_users({users: data}));
}
