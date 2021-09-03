const replace_all_specialised_objects_type = "replace_all_specialised_objects";
const replace_all_specialised_objects = (args) => ({type: replace_all_specialised_objects_type, ...args});
export const is_replace_all_specialised_objects = (action) => {
  return action.type === replace_all_specialised_objects_type;
};
const clear_from_mem_all_specialised_objects_type = "clear_from_mem_all_specialised_objects";
const clear_from_mem_all_specialised_objects = () => ({type: clear_from_mem_all_specialised_objects_type});
export const is_clear_from_mem_all_specialised_objects = (action) => {
  return action.type === clear_from_mem_all_specialised_objects_type;
};
export const syncing_actions = {
  replace_all_specialised_objects,
  clear_from_mem_all_specialised_objects
};
