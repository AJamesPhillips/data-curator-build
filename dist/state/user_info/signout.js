import {get_store} from "../store.js";
import {conditionally_save_state} from "../sync/utils/conditionally_save_state.js";
export async function signout() {
  const store = get_store();
  const load_state_from_storage = store.load_state_from_storage;
  await conditionally_save_state(load_state_from_storage, store);
}
