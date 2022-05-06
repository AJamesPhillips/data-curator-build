import {get_supabase} from "../../supabase/get_supabase.js";
import {min_throttle} from "../../utils/throttle.js";
import {ACTIONS} from "../actions.js";
import {pub_sub} from "../pub_sub/pub_sub.js";
import {supabase_get_wcomponents_from_any_base} from "./supabase/wcomponent.js";
import {load_state} from "./utils/load_state.js";
export function sync_subscribers(store) {
  pub_sub.user.sub("changed_bases", () => {
    const {ready_for_reading} = store.getState().sync;
    if (ready_for_reading)
      return;
    load_state(store);
  });
  pub_sub.user.sub("changed_chosen_base_id", () => load_state(store));
  const starting_state = store.getState();
  const {user, chosen_base_id} = starting_state.user_info;
  if (user && chosen_base_id !== void 0) {
    load_state(store);
  }
  subscribe_search_for_requested_wcomponents_in_any_base(store);
}
function subscribe_search_for_requested_wcomponents_in_any_base(store) {
  const supabase = get_supabase();
  const throttled_search_for_requested_wcomponents_in_any_base = min_throttle(async () => {
    const state = store.getState();
    if (!state.sync.wcomponent_ids_to_search_for_in_any_base.size)
      return;
    const ids_to_search_for = Array.from(state.sync.wcomponent_ids_to_search_for_in_any_base);
    store.dispatch(ACTIONS.sync.searching_for_wcomponents_by_id_in_any_base());
    const result = await supabase_get_wcomponents_from_any_base({supabase, ids: ids_to_search_for});
    store.dispatch(ACTIONS.sync.searched_for_wcomponents_by_id_in_any_base({ids: ids_to_search_for}));
    store.dispatch(ACTIONS.specialised_object.add_wcomponents_to_store({wcomponents: result.wcomponents}));
  }, 50);
  store.subscribe(async () => {
    const state = store.getState();
    if (!state.sync.ready_for_reading)
      return;
    if (state.sync.wcomponent_ids_to_search_for_in_any_base.size) {
      throttled_search_for_requested_wcomponents_in_any_base.throttled();
    }
  });
  pub_sub.user.sub("changed_chosen_base_id", () => {
    throttled_search_for_requested_wcomponents_in_any_base.cancel();
  });
}
