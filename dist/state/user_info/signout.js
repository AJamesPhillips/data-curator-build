import {get_supabase} from "../../supabase/get_supabase.js";
import {get_store} from "../store.js";
import {conditionally_save_state} from "../sync/utils/conditionally_save_state.js";
export async function save_and_signout() {
  const store = get_store();
  const supabase = get_supabase();
  try {
    await conditionally_save_state(store);
  } catch (err) {
  }
  try {
    const {error} = await supabase.auth.signOut();
  } catch (err) {
  }
  window.location.reload();
}
