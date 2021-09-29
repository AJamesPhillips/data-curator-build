import {update_substate} from "../../utils/update_state.js";
import {is_set_display_time_sliders, is_toggle_linked_datetime_sliders} from "./actions.js";
export const controls_reducer = (state, action) => {
  if (is_toggle_linked_datetime_sliders(action)) {
    const linked_datetime_sliders = !state.controls.linked_datetime_sliders;
    state = update_substate(state, "controls", "linked_datetime_sliders", linked_datetime_sliders);
  }
  if (is_set_display_time_sliders(action)) {
    const {display_time_sliders} = action;
    state = update_substate(state, "controls", "display_time_sliders", display_time_sliders);
    if (!display_time_sliders) {
      state = update_substate(state, "controls", "linked_datetime_sliders", false);
    }
  }
  return state;
};
