export function get_global_keys_starting_state() {
  return {
    last_key: void 0,
    last_key_time_stamp: void 0,
    keys_down: new Set(),
    derived: {
      shift_down: false,
      control_down: false,
      shift_or_control_down: false
    }
  };
}
