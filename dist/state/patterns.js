import {replace_element} from "../utils/list.js";
import {is_add_pattern, is_update_pattern, is_delete_pattern, is_replace_all_patterns} from "./pattern_actions.js";
export const patterns_reducer = (state, action) => {
  if (is_add_pattern(action)) {
    const new_pattern = {
      id: action.id,
      datetime_created: action.datetime_created,
      name: action.name,
      content: action.content,
      attributes: action.attributes
    };
    state = {
      ...state,
      patterns: [...state.patterns, new_pattern]
    };
  }
  if (is_update_pattern(action)) {
    const pattern = state.patterns.find(({id}) => id === action.id);
    if (!pattern) {
      console.error(`No pattern for id: "${action.id}"`);
      return state;
    }
    const replacement_pattern = {
      ...pattern,
      name: action.name,
      content: action.content
    };
    const patterns = replace_element(state.patterns, replacement_pattern, ({id}) => id === action.id);
    state = {
      ...state,
      patterns
    };
  }
  if (is_delete_pattern(action)) {
    state = {
      ...state,
      patterns: state.patterns.filter(({id}) => id !== action.id)
    };
  }
  if (is_replace_all_patterns(action)) {
    state = {
      ...state,
      patterns: action.patterns
    };
  }
  return state;
};
