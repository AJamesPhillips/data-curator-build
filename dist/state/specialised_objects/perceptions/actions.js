const upsert_perception_type = "upsert_perception";
const upsert_perception = (args) => ({type: upsert_perception_type, ...args});
export const is_upsert_perception = (action) => {
  return action.type === upsert_perception_type;
};
const delete_perception_type = "delete_perception";
const delete_perception = (args) => ({type: delete_perception_type, ...args});
export const is_delete_perception = (action) => {
  return action.type === delete_perception_type;
};
export const perception_actions = {
  upsert_perception,
  delete_perception
};
