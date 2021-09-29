import {parse_wcomponent} from "../../../shared/wcomponent/parse_json/parse_wcomponent.js";
import {supabase_create_item} from "./create_items.js";
import {supabase_get_items} from "./get_items.js";
import {app_item_to_supabase, supabase_item_to_app} from "./item_convertion.js";
const TABLE_NAME = "wcomponents";
export function supabase_get_wcomponents(args) {
  return supabase_get_items({
    ...args,
    table: TABLE_NAME,
    converter: wcomponent_supabase_to_app
  });
}
export async function supabase_upsert_wcomponent(args) {
  return args.wcomponent.modified_at ? supabase_update_wcomponent(args) : supabase_create_wcomponent(args);
}
async function supabase_create_wcomponent(args) {
  return supabase_create_item({
    supabase: args.supabase,
    table: TABLE_NAME,
    item: args.wcomponent,
    converter_app_to_supabase: wcomponent_app_to_supabase,
    converter_supabase_to_app: wcomponent_supabase_to_app
  });
}
async function supabase_update_wcomponent(args) {
  const item = wcomponent_app_to_supabase(args.wcomponent);
  const result = await args.supabase.rpc("update_wcomponent", {item});
  let new_item = void 0;
  let error = result.error || void 0;
  try {
    let new_supabase_item = result.data;
    if (result.status === 409)
      new_supabase_item = JSON.parse(result.error.details);
    new_item = wcomponent_supabase_to_app(new_supabase_item);
  } catch (err) {
    console.error("Exception whilst handling rpc update_wcomponent response", err);
    error = err;
  }
  return {status: result.status, error, item: new_item};
}
export function wcomponent_app_to_supabase(item, base_id) {
  return app_item_to_supabase(item, base_id);
}
export function wcomponent_supabase_to_app(item) {
  let wc = supabase_item_to_app(item);
  wc = parse_wcomponent(wc);
  return wc;
}
