import {pub_sub} from "../pub_sub/pub_sub.js";
import {load_state} from "./utils/load_state.js";
export function sync_subscribers(store) {
  pub_sub.user.sub("changed_bases", () => {
    if (store.getState().user_info.user)
      return;
    load_state(store);
  });
  pub_sub.user.sub("changed_user", () => load_state(store));
  pub_sub.user.sub("changed_chosen_base_id", () => load_state(store));
  const starting_state = store.getState();
  const {user, chosen_base_id} = starting_state.user_info;
  if (user && chosen_base_id !== void 0)
    load_state(store);
}
