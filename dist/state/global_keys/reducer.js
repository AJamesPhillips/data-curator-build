import {update_substate} from "../../utils/update_state.js";
import {is_clear_all_keys, is_key_down, is_key_up} from "./actions.js";
export const global_keys_reducer = (state, action) => {
  let should_update_derived = false;
  if (is_key_down(action)) {
    should_update_derived = true;
    const keys_down = new Set([...state.global_keys.keys_down]);
    keys_down.add(action.key);
    state = {
      ...state,
      global_keys: {
        ...state.global_keys,
        last_key: action.key,
        last_key_time_stamp: action.time_stamp,
        keys_down
      }
    };
  }
  if (is_key_up(action)) {
    should_update_derived = true;
    let keys_down = new Set([...state.global_keys.keys_down]);
    keys_down.delete(action.key);
    state = {
      ...state,
      global_keys: {
        ...state.global_keys,
        last_key: action.key,
        last_key_time_stamp: action.time_stamp,
        keys_down
      }
    };
  }
  if (is_clear_all_keys(action)) {
    should_update_derived = true;
    state = update_substate(state, "global_keys", "keys_down", new Set());
  }
  if (should_update_derived)
    state = set_derived_state(state);
  return state;
};
function set_derived_state(state) {
  const {keys_down} = state.global_keys;
  const control_down = keys_down.has("Control");
  const shift_down = keys_down.has("Shift");
  const global_keys = {
    ...state.global_keys,
    derived: {
      shift_down,
      control_down,
      shift_or_control_down: control_down || shift_down
    }
  };
  return {...state, global_keys};
}
