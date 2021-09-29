import {clean_base_object_of_sync_meta_fields} from "./clean_base_object_for_supabase.js";
export function app_item_to_supabase(item, base_id) {
  base_id = item.base_id || base_id;
  if (!base_id)
    throw new Error("Must provide base_id for app_item_to_supabase");
  const json = clean_base_object_of_sync_meta_fields(item);
  return {
    id: item.id,
    modified_at: item.modified_at ? item.modified_at.toISOString() : void 0,
    base_id,
    title: item.title,
    json
  };
}
export function supabase_item_to_app(item) {
  let {json, id, base_id, modified_at} = item;
  const modified_at_date = modified_at ? new Date(modified_at + "Z") : void 0;
  json = {...json, id, base_id, modified_at: modified_at_date};
  json = clean_base_object_of_sync_meta_fields(json);
  json.created_at = json.created_at && new Date(json.created_at);
  json.custom_created_at = json.custom_created_at && new Date(json.custom_created_at);
  json.deleted_at = json.deleted_at && new Date(json.deleted_at);
  return json;
}
