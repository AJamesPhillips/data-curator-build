import {equal_sets} from "../utils/set.js";
export const objectives_reducer = (state, action) => {
  if (is_select_objectives(action)) {
    state = {
      ...state,
      objectives: {
        ...state.objectives,
        selected_objective_ids: new Set(action.ids)
      }
    };
  }
  if (is_add_to_selected_objectives(action)) {
    const existing_ids = state.objectives.selected_objective_ids;
    const new_ids = new Set([
      ...existing_ids,
      ...action.ids
    ]);
    const different = !equal_sets(new_ids, existing_ids);
    if (different) {
      state = {
        ...state,
        objectives: {
          ...state.objectives,
          selected_objective_ids: new_ids
        }
      };
    }
  }
  if (is_remove_from_selected_objectives(action)) {
    const existing_ids = state.objectives.selected_objective_ids;
    const new_ids = new Set([...existing_ids].filter((i) => !action.ids.includes(i)));
    const different = !equal_sets(new_ids, existing_ids);
    if (different) {
      state = {
        ...state,
        objectives: {
          ...state.objectives,
          selected_objective_ids: new_ids
        }
      };
    }
  }
  if (is_select_priority_objectives(action)) {
    state = {
      ...state,
      objectives: {
        ...state.objectives,
        priority_selected_objective_ids: new Set(action.ids)
      }
    };
  }
  return state;
};
const select_objectives_type = "select_objectives";
const select_objectives = (ids) => {
  return {
    type: select_objectives_type,
    ids
  };
};
export const is_select_objectives = (action) => {
  return action.type === select_objectives_type;
};
const add_to_selected_objectives_type = "add_to_selected_objectives";
const add_to_selected_objectives = (ids) => {
  return {
    type: add_to_selected_objectives_type,
    ids
  };
};
export const is_add_to_selected_objectives = (action) => {
  return action.type === add_to_selected_objectives_type;
};
const remove_from_selected_objectives_type = "remove_from_selected_objectives";
const remove_from_selected_objectives = (ids) => {
  return {
    type: remove_from_selected_objectives_type,
    ids
  };
};
export const is_remove_from_selected_objectives = (action) => {
  return action.type === remove_from_selected_objectives_type;
};
const select_priority_objectives_type = "select_priority_objectives";
const select_priority_objectives = (ids) => {
  return {
    type: select_priority_objectives_type,
    ids
  };
};
export const is_select_priority_objectives = (action) => {
  return action.type === select_priority_objectives_type;
};
export const objectives_actions = {
  select_objectives,
  add_to_selected_objectives,
  remove_from_selected_objectives,
  select_priority_objectives
};
