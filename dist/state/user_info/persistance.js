import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
import {random_animal} from "../../utils/list_of_animals.js";
import {get_supabase} from "../../supabase/get_supabase.js";
export function user_info_persist(state) {
  const to_persist = pick([
    "chosen_base_id"
  ], state.user_info);
  persist_state_object("user_info", to_persist);
}
export function user_info_starting_state(storage_location) {
  const obj = get_persisted_state_object("user_info");
  const need_to_handle_password_recovery = document.location.hash.includes("type=recovery");
  const chosen_base_id = storage_location !== void 0 ? storage_location : obj.chosen_base_id;
  let state = {
    user: get_supabase().auth.user(),
    need_to_handle_password_recovery,
    users_by_id: void 0,
    bases_by_id: void 0,
    ...obj,
    user_name: void 0,
    chosen_base_id
  };
  return state;
}
const get_anonymous_user_name = () => "Anonymous " + random_animal();
export const ensure_user_name = (user_name = "") => user_name.trim() || get_anonymous_user_name();
