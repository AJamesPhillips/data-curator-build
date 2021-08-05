import {ACTIONS} from "../actions.js";
import {pub_sub} from "../pub_sub/pub_sub.js";
export function display_options_subscribers(store) {
  toggle_consumption_formatting_on_key_press(store);
}
function toggle_consumption_formatting_on_key_press(store) {
  pub_sub.global_keys.sub("key_down", (e) => {
    if (e.ctrl_key && e.key === "e") {
      store.dispatch(ACTIONS.display.toggle_consumption_formatting({}));
    }
    if (e.ctrl_key && e.key === "d") {
      store.dispatch(ACTIONS.display.toggle_focused_mode({}));
    }
  });
}
