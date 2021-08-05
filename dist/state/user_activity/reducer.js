import {update_substate} from "../../utils/update_state.js";
import {is_set_editing_text_flag} from "./actions.js";
export const user_activity_reducer = (state, action) => {
  if (is_set_editing_text_flag(action)) {
    state = update_substate(state, "user_activity", "is_editing_text", action.editing_text);
  }
  return state;
};
