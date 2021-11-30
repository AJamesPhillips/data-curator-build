import {update_substate} from "../../utils/update_state.js";
import {is_toggle_use_creation_context, is_set_custom_created_at, is_set_label_ids, is_set_replace_text} from "./actions.js";
export const creation_context_reducer = (state, action) => {
  if (is_toggle_use_creation_context(action)) {
    const use_creation_context = !state.creation_context.use_creation_context;
    state = update_substate(state, "creation_context", "use_creation_context", use_creation_context);
  }
  let auto_set_use_to_true = false;
  if (is_set_custom_created_at(action)) {
    const creation_context = {
      label_ids: [],
      ...state.creation_context.creation_context,
      custom_created_at: action.custom_created_at
    };
    state = update_substate(state, "creation_context", "creation_context", creation_context);
    auto_set_use_to_true = auto_set_use_to_true || !!action.custom_created_at;
  }
  if (is_set_label_ids(action)) {
    const creation_context = {
      ...state.creation_context.creation_context,
      label_ids: action.label_ids
    };
    state = update_substate(state, "creation_context", "creation_context", creation_context);
    auto_set_use_to_true = auto_set_use_to_true || action.label_ids.length > 0;
  }
  if (is_set_replace_text(action)) {
    const creation_context = {
      label_ids: [],
      ...state.creation_context.creation_context
    };
    if (action.value_type === "target") {
      creation_context.replace_text_target = action.value;
    } else {
      creation_context.replace_text_replacement = action.value;
    }
    state = update_substate(state, "creation_context", "creation_context", creation_context);
  }
  if (auto_set_use_to_true) {
    state = update_substate(state, "creation_context", "use_creation_context", true);
  }
  return state;
};
