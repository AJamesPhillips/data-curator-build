const replace_all_specialised_objects_type = "replace_all_specialised_objects";
const replace_all_specialised_objects = (args) => ({type: replace_all_specialised_objects_type, ...args});
export const is_replace_all_specialised_objects = (action) => {
  return action.type === replace_all_specialised_objects_type;
};
const delete_all_specialised_objects_type = "delete_all_specialised_objects";
const delete_all_specialised_objects = () => ({type: delete_all_specialised_objects_type});
export const is_delete_all_specialised_objects = (action) => {
  return action.type === delete_all_specialised_objects_type;
};
export const syncing_actions = {
  replace_all_specialised_objects,
  delete_all_specialised_objects
};
