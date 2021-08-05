import {get_new_created_ats} from "../shared/utils/datetime.js";
import {get_new_pattern_id} from "../shared/utils/ids.js";
const add_pattern_type = "add_pattern";
const add_pattern = (args, creation_context) => {
  const id = get_new_pattern_id();
  const {created_at: datetime_created} = get_new_created_ats(creation_context);
  return {
    type: add_pattern_type,
    id,
    datetime_created,
    name: args.name,
    content: args.content,
    attributes: args.attributes
  };
};
export const is_add_pattern = (action) => {
  return action.type === add_pattern_type;
};
const update_pattern_type = "update_pattern";
const update_pattern = (args) => {
  return {
    type: update_pattern_type,
    id: args.id,
    name: args.name,
    content: args.content
  };
};
export const is_update_pattern = (action) => {
  return action.type === update_pattern_type;
};
const delete_pattern_type = "delete_pattern";
const delete_pattern = (id) => {
  return {type: delete_pattern_type, id};
};
export const is_delete_pattern = (action) => {
  return action.type === delete_pattern_type;
};
const replace_all_patterns_type = "replace_all_patterns";
const replace_all_patterns = (args) => {
  return {
    type: replace_all_patterns_type,
    patterns: args.patterns
  };
};
export const is_replace_all_patterns = (action) => {
  return action.type === replace_all_patterns_type;
};
export const pattern_actions = {
  add_pattern,
  update_pattern,
  delete_pattern,
  replace_all_patterns
};
