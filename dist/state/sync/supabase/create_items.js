export async function supabase_create_item(args) {
  const item_to_insert = args.converter_app_to_supabase(args.item);
  const result = await args.supabase.from(args.table).insert(item_to_insert).eq("id", item_to_insert.id);
  const items = (result.data || []).map(args.converter_supabase_to_app);
  const item = items[0];
  return {status: result.status, item, error: result.error || void 0};
}
