import {APP_DETAILS} from "../shared/constants.js";
import {get_current_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {set_window_title} from "./set_window_title.js";
export function register_window_title_updater_subscriber(store) {
  let current_kv_title = "";
  store.subscribe(() => {
    const state = store.getState();
    const kv = get_current_knowledge_view_from_state(state);
    if (kv && kv.title !== current_kv_title) {
      current_kv_title = kv.title;
      const title = APP_DETAILS.NAME + (current_kv_title ? " | " + current_kv_title : "");
      set_window_title(title);
    }
  });
}
