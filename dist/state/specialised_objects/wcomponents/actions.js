import {bulk_editing_wcomponents_actions} from "./bulk_edit/actions.js";
const upsert_wcomponent_type = "upsert_wcomponent";
const upsert_wcomponent = (args) => ({type: upsert_wcomponent_type, ...args});
export const is_upsert_wcomponent = (action) => {
  return action.type === upsert_wcomponent_type;
};
const delete_wcomponent_type = "delete_wcomponent";
const delete_wcomponent = (args) => ({type: delete_wcomponent_type, ...args});
export const is_delete_wcomponent = (action) => {
  return action.type === delete_wcomponent_type;
};
export const wcomponent_actions = {
  upsert_wcomponent,
  delete_wcomponent,
  ...bulk_editing_wcomponents_actions
};
