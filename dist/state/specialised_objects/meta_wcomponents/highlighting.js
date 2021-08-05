import {update_substate} from "../../../utils/update_state.js";
export const highlighting_reducer = (state, action) => {
  if (is_set_highlighted_wcomponent(action)) {
    const {id, highlighted} = action;
    let highlighted_wcomponent_ids = new Set(state.meta_wcomponents.highlighted_wcomponent_ids);
    if (id === void 0)
      highlighted_wcomponent_ids = new Set();
    else {
      if (highlighted)
        highlighted_wcomponent_ids.add(id);
      else
        highlighted_wcomponent_ids.delete(id);
    }
    state = update_substate(state, "meta_wcomponents", "highlighted_wcomponent_ids", highlighted_wcomponent_ids);
  }
  return state;
};
const set_highlighted_wcomponent_type = "set_highlighted_wcomponent";
const set_highlighted_wcomponent = (args) => {
  return {
    type: set_highlighted_wcomponent_type,
    id: args.id,
    highlighted: args.highlighted
  };
};
const is_set_highlighted_wcomponent = (action) => {
  return action.type === set_highlighted_wcomponent_type;
};
export const highlighting_actions = {
  set_highlighted_wcomponent
};
