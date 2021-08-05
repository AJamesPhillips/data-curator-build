import {get_new_created_ats} from "../../shared/utils/datetime.js";
import {get_new_object_id} from "../../shared/utils/ids.js";
const add_object_type = "add_object";
const add_object = (args, creation_context) => {
  const {created_at: datetime_created} = get_new_created_ats(creation_context);
  const id = get_new_object_id();
  return {
    type: add_object_type,
    id,
    datetime_created,
    pattern_id: args.pattern_id,
    attributes: args.attributes,
    labels: args.labels,
    external_ids: args.external_ids
  };
};
export const is_add_object = (action) => {
  return action.type === add_object_type;
};
const delete_object_type = "delete_object";
const delete_object = (id) => {
  return {type: delete_object_type, id};
};
export const is_delete_object = (action) => {
  return action.type === delete_object_type;
};
const update_object_type = "update_object";
const update_object = (args) => {
  return {
    type: update_object_type,
    id: args.id,
    datetime_created: args.datetime_created,
    pattern_id: args.pattern_id,
    attributes: args.attributes,
    labels: args.labels,
    external_ids: args.external_ids
  };
};
export const is_update_object = (action) => {
  return action.type === update_object_type;
};
const upsert_objects_type = "upsert_objects";
const upsert_objects = (args) => {
  return {
    type: upsert_objects_type,
    objects: args.objects.map((o) => ({
      ...o,
      id: o.id || get_new_object_id()
    }))
  };
};
export const is_upsert_objects = (action) => {
  return action.type === upsert_objects_type;
};
const replace_all_core_objects_type = "replace_all_core_objects";
const replace_all_core_objects = (args) => {
  return {
    type: replace_all_core_objects_type,
    objects: args.objects
  };
};
export const is_replace_all_core_objects = (action) => {
  return action.type === replace_all_core_objects_type;
};
const replace_all_objects_with_cache_type = "replace_all_objects_with_cache";
const replace_all_objects_with_cache = (args) => {
  return {
    type: replace_all_objects_with_cache_type,
    objects: args.objects
  };
};
export const is_replace_all_objects_with_cache = (action) => {
  return action.type === replace_all_objects_with_cache_type;
};
export const object_actions = {
  add_object,
  delete_object,
  update_object,
  upsert_objects,
  replace_all_core_objects,
  replace_all_objects_with_cache
};
