export function clean_base_object_of_sync_meta_fields(item) {
  item = {...item};
  delete item.needs_save;
  delete item.saving;
  return item;
}
