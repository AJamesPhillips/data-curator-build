import {is_defined} from "../../../../shared/utils/is_defined.js";
import {
  get_wcomponents_from_state
} from "../../accessors.js";
import {tidy_wcomponent} from "../tidy_wcomponent.js";
import {handle_upsert_wcomponent} from "../utils.js";
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
  const {wcomponent_ids, change, remove_label_ids, add_label_ids} = action;
  const wcomponents = get_wcomponents_from_state(state, wcomponent_ids).filter(is_defined);
  if (wcomponents.length) {
    wcomponents.forEach((wcomponent) => {
      const wcomponent_with_change = {...wcomponent, ...change};
      const edited_wcomponent = modify_label_ids(wcomponent_with_change, remove_label_ids, add_label_ids);
      const tidied = tidy_wcomponent(edited_wcomponent, state.specialised_objects.wcomponents_by_id);
      state = handle_upsert_wcomponent(state, tidied, false);
    });
  }
  return state;
}
function modify_label_ids(wcomponent, remove_label_ids, add_label_ids) {
  let {label_ids} = wcomponent;
  if (label_ids && remove_label_ids) {
    label_ids = label_ids.filter((id) => !remove_label_ids.has(id));
  }
  if (add_label_ids) {
    const new_label_ids = label_ids || [];
    const existing_ids = new Set(new_label_ids);
    Array.from(add_label_ids).forEach((id) => {
      if (!existing_ids.has(id))
        new_label_ids.push(id);
    });
    label_ids = new_label_ids;
  }
  return {...wcomponent, label_ids};
}
