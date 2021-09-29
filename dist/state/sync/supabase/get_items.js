import {SUPABASE_MAX_ROWS} from "./constants.js";
export async function supabase_get_items(args) {
  const offset = args.offset || 0;
  let query = args.supabase.from(args.table).select("*").order("id", {ascending: true}).range(offset, offset + SUPABASE_MAX_ROWS - 1);
  if (args.base_id !== void 0)
    query = query.eq("base_id", args.base_id);
  const res1 = await query;
  let error = res1.error || void 0;
  let items = (res1.data || []).map(args.converter);
  if (!error && items.length === SUPABASE_MAX_ROWS) {
    const res2 = await supabase_get_items({...args, offset: offset + SUPABASE_MAX_ROWS});
    if (!res2.error)
      items = items.concat(res2.items);
    else
      error = res2.error;
  }
  return {error, items};
}
