import {SUPABASE_MAX_ROWS} from "./constants.js";
export async function supabase_get_items(args) {
  const offset = args.offset || 0;
  const MAX_ROWS = args.specific_ids ? 100 : SUPABASE_MAX_ROWS;
  const offset_max_inclusive = offset + MAX_ROWS - 1;
  let query = args.supabase.from(args.table).select("*").order("id", {ascending: true}).range(offset, offset_max_inclusive);
  if (args.base_id !== void 0)
    query = query.eq("base_id", args.base_id);
  if (args.specific_ids !== void 0) {
    const specific_ids = args.specific_ids.slice(offset, offset_max_inclusive + 1);
    console.trace("specific_ids", offset, offset_max_inclusive + 1, specific_ids.slice(0, 3));
    query = query.in("id", specific_ids);
  }
  const res1 = await query;
  let error = res1.error || void 0;
  let items = (res1.data || []).map(args.converter);
  if (!error && items.length === MAX_ROWS) {
    const res2 = await supabase_get_items({...args, offset: offset + MAX_ROWS});
    if (!res2.error)
      items = items.concat(res2.items);
    else
      error = res2.error;
  }
  return {error, items};
}
