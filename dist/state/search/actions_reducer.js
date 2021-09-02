import {update_substate} from "../../utils/update_state.js";
export const search_reducer = (state, action) => {
  if (is_update_search_fields(action)) {
    state = update_substate(state, "search", "search_fields", action.search_fields);
  }
  if (is_update_search_type(action)) {
    state = update_substate(state, "search", "search_type", action.search_type);
  }
  return state;
};
const update_search_fields_type = "update_search_fields";
const update_search_type_type = "update_search_type";
export const update_search_fields = (args) => {
  return {type: update_search_fields_type, ...args};
};
const is_update_search_fields = (action) => {
  return action.type === update_search_fields_type;
};
export const update_search_type = (args) => {
  return {type: update_search_fields_type, ...args};
};
const is_update_search_type = (action) => {
  return action.type === update_search_type_type;
};
export const search_actions = {
  update_search_fields,
  update_search_type
};
