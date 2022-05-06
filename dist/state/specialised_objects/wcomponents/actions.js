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
const add_wcomponents_to_store_type = "add_wcomponents_to_store";
const add_wcomponents_to_store = (args) => ({type: add_wcomponents_to_store_type, ...args});
export const is_add_wcomponents_to_store = (action) => {
  return action.type === add_wcomponents_to_store_type;
};
export const wcomponent_actions = {
  upsert_wcomponent,
  delete_wcomponent,
  add_wcomponents_to_store,
  ...bulk_editing_wcomponents_actions
};
