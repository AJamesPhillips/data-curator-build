import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {local_user} from "../sync/local/data.js";
export function user_info_persist(state) {
  const to_persist = pick([
    "chosen_base_id"
  ], state.user_info);
  persist_state_object("user_info", to_persist);
}
export function user_info_starting_state(args) {
  const obj = get_persisted_state_object("user_info");
  const need_to_handle_password_recovery = document.location.hash.includes("type=recovery");
  const chosen_base_id = args.storage_location !== void 0 ? args.storage_location : obj.chosen_base_id;
  const user = args.load_state_from_storage ? get_supabase().auth.user() || void 0 : local_user;
  const state = {
    user,
    need_to_handle_password_recovery,
    users_by_id: void 0,
    bases_by_id: void 0,
    ...obj,
    chosen_base_id
  };
  return state;
}
