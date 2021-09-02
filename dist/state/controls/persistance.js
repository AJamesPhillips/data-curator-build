import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
export function controls_persist(state) {
  const to_persist = pick([
    "display_created_at_time_slider"
  ], state.controls);
  persist_state_object("controls", to_persist);
}
export function controls_starting_state() {
  const obj = get_persisted_state_object("controls");
  const display_created_at_time_slider = obj.display_created_at_time_slider || false;
  const state = {
    linked_datetime_sliders: false,
    display_created_at_time_slider,
    ...obj
  };
  return state;
}
