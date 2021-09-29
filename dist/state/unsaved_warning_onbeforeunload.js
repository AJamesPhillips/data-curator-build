import {conditionally_warn_unsaved_exit} from "./sync/utils/conditionally_warn_unsaved_exit.js";
export function setup_warning_of_unsaved_data_beforeunload(load_state_from_storage, store) {
  let last_unload_warning = performance.now();
  const development_warning_threshold_ms = 30 * 1e3;
  window.onbeforeunload = () => {
    const state = store.getState();
    let warn = conditionally_warn_unsaved_exit(load_state_from_storage, state);
    if (warn) {
      const outside_threshold = performance.now() - last_unload_warning > development_warning_threshold_ms;
      warn = outside_threshold;
    }
    if (warn)
      last_unload_warning = performance.now();
    return warn;
  };
}
