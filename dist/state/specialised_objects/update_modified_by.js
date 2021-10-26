import {selector_user_name} from "../user_info/selector.js";
export function update_modified_by(item, state) {
  return update_modified_or_deleted_by(item, state, false);
}
export function mark_as_deleted(item, state) {
  return update_modified_or_deleted_by(item, state, true);
}
export function update_modified_or_deleted_by(item, state, deleting) {
  item = {
    ...item,
    needs_save: true,
    modified_by_username: selector_user_name(state)
  };
  if (deleting)
    item.deleted_at = new Date();
  return item;
}
