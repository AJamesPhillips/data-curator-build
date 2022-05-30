import {parse_knowledge_view} from "../../../wcomponent/parse_json/parse_knowledge_view.js";
import {supabase_create_item} from "./create_items.js";
import {supabase_get_items} from "./get_items.js";
import {app_item_to_supabase, supabase_item_to_app} from "./item_convertion.js";
import {is_defined} from "../../../shared/utils/is_defined.js";
const TABLE_NAME = "knowledge_views";
export function supabase_get_knowledge_views(args) {
  return supabase_get_items({
    ...args,
    table: TABLE_NAME,
    converter: knowledge_view_supabase_to_app,
    specific_ids: args.ids
  });
}
export async function supabase_get_knowledge_views_from_other_bases(args) {
  const wcomponents_from_other_bases = args.wcomponents_from_other_bases.filter((wc) => !wc.deleted_at);
  const wcomponent_ids = Array.from(new Set(wcomponents_from_other_bases.map((wc) => wc.id)));
  const downloaded_knowledge_view_ids = new Set(args.knowledge_views.map((kv) => kv.id));
  const parent_kv_ids = args.knowledge_views.map((kv) => kv.parent_knowledge_view_id).filter(is_defined).filter((id) => !downloaded_knowledge_view_ids.has(id));
  let kv_ids = wcomponent_ids.concat(parent_kv_ids);
  args.knowledge_views.map((kv) => kv.foundation_knowledge_view_ids).forEach((ids) => {
    ids?.filter((id) => !downloaded_knowledge_view_ids.has(id)).forEach((id) => kv_ids.push(id));
  });
  kv_ids = Array.from(new Set(kv_ids));
  return await supabase_get_knowledge_views({supabase: args.supabase, ids: kv_ids, all_bases: true});
}
export async function supabase_upsert_knowledge_view(args) {
  return args.knowledge_view.modified_at ? supabase_update_knowledge_view(args) : supabase_create_knowledge_view(args);
}
async function supabase_create_knowledge_view(args) {
  return supabase_create_item({
    supabase: args.supabase,
    table: TABLE_NAME,
    item: args.knowledge_view,
    converter_app_to_supabase: knowledge_view_app_to_supabase,
    converter_supabase_to_app: knowledge_view_supabase_to_app
  });
}
async function supabase_update_knowledge_view(args) {
  const item = knowledge_view_app_to_supabase(args.knowledge_view);
  const result = await args.supabase.rpc("update_knowledge_view", {item});
  if (result.status === 401) {
    return {status: result.status, error: {message: "JWT expired"}, item: void 0};
  }
  let new_item = void 0;
  let error = result.error || void 0;
  try {
    let new_supabase_item = result.data;
    if (result.status === 409)
      new_supabase_item = JSON.parse(result.error.details);
    new_item = knowledge_view_supabase_to_app(new_supabase_item);
  } catch (err) {
    console.error("Exception whilst handling rpc update_knowledge_view response", err);
    error = err;
  }
  return {status: result.status, error, item: new_item};
}
export function knowledge_view_app_to_supabase(item, base_id) {
  return app_item_to_supabase(item, base_id);
}
export function knowledge_view_supabase_to_app(item) {
  let kv = supabase_item_to_app(item);
  kv = parse_knowledge_view(kv);
  return kv;
}
