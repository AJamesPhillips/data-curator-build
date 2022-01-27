import {ACTIONS} from "../actions.js";
import {pub_sub} from "../pub_sub/pub_sub.js";
export function record_keyupdown_activity(store) {
  document.onkeydown = (e) => {
    const user_is_editing_text = store.getState().user_activity.is_editing_text;
    const action_args = {
      event: e,
      time_stamp: e.timeStamp,
      alt_key: e.altKey,
      code: e.code,
      ctrl_key: e.ctrlKey,
      key: e.key,
      meta_key: e.metaKey,
      shift_key: e.shiftKey,
      user_is_editing_text
    };
    if (user_is_editing_text && e.ctrlKey && e.key === "k")
      e.preventDefault();
    store.dispatch(ACTIONS.global_keys.key_down(action_args));
    pub_sub.global_keys.pub("key_down", action_args);
  };
  document.onkeyup = (e) => {
    const user_is_editing_text = store.getState().user_activity.is_editing_text;
    const action_args = {
      event: e,
      time_stamp: e.timeStamp,
      alt_key: e.altKey,
      code: e.code,
      ctrl_key: e.ctrlKey,
      key: e.key,
      meta_key: e.metaKey,
      shift_key: e.shiftKey,
      user_is_editing_text
    };
    store.dispatch(ACTIONS.global_keys.key_up(action_args));
    pub_sub.global_keys.pub("key_up", action_args);
  };
  window.onfocus = () => {
    if (store.getState().global_keys.keys_down.size === 0)
      return;
    store.dispatch(ACTIONS.global_keys.clear_all_keys());
  };
}
