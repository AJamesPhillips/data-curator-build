import {bulk_editing_knowledge_view_entries_actions} from "./bulk_edit/actions.js";
const upsert_knowledge_view_entry_type = "upsert_knowledge_view_entry";
const upsert_knowledge_view_entry = (args) => ({type: upsert_knowledge_view_entry_type, ...args});
export const is_upsert_knowledge_view_entry = (action) => {
  return action.type === upsert_knowledge_view_entry_type;
};
const upsert_knowledge_view_type = "upsert_knowledge_view";
const upsert_knowledge_view = (args) => ({type: upsert_knowledge_view_type, ...args});
export const is_upsert_knowledge_view = (action) => {
  return action.type === upsert_knowledge_view_type;
};
export const knowledge_view_actions = {
  upsert_knowledge_view_entry,
  upsert_knowledge_view,
  ...bulk_editing_knowledge_view_entries_actions
};
