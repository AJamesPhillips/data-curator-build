const replace_all_specialised_objects_type = "replace_all_specialised_objects";
const replace_all_specialised_objects = (args) => {
  return {
    type: replace_all_specialised_objects_type,
    specialised_objects: args.specialised_objects
  };
};
export const is_replace_all_specialised_objects = (action) => {
  return action.type === replace_all_specialised_objects_type;
};
export const syncing_actions = {
  replace_all_specialised_objects
};
