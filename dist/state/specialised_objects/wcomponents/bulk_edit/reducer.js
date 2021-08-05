import {is_defined} from "../../../../shared/utils/is_defined.js";
import {update_substate} from "../../../../utils/update_state.js";
import {
  get_wcomponents_from_state
} from "../../accessors.js";
import {tidy_wcomponent} from "../tidy_wcomponent.js";
import {
  is_bulk_edit_wcomponents
} from "./actions.js";
export const bulk_editing_wcomponents_reducer = (state, action) => {
  if (is_bulk_edit_wcomponents(action)) {
    state = handle_bulk_edit_wcomponents(state, action);
  }
  return state;
};
function handle_bulk_edit_wcomponents(state, action) {
  const {wcomponent_ids, change} = action;
  const wcomponents = get_wcomponents_from_state(state, wcomponent_ids).filter(is_defined);
  if (wcomponents.length) {
    const wcomponents_by_id = {...state.specialised_objects.wcomponents_by_id};
    wcomponents.forEach((wcomponent) => {
      const edited_wcomponent = {...wcomponent, ...change};
      const updated = tidy_wcomponent(edited_wcomponent);
      wcomponents_by_id[wcomponent.id] = updated;
    });
    state = update_substate(state, "specialised_objects", "wcomponents_by_id", wcomponents_by_id);
  }
  return state;
}
