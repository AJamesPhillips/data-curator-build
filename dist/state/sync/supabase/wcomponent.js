import {wcomponent_is_action, wcomponent_is_state_value} from "../../../wcomponent/interfaces/SpecialisedObjects.js";
import {parse_wcomponent} from "../../../wcomponent/parse_json/parse_wcomponent.js";
import {supabase_create_item} from "./create_items.js";
import {supabase_get_items} from "./get_items.js";
import {app_item_to_supabase, supabase_item_to_app} from "./item_convertion.js";
import {get_ids_from_text} from "../../../wcomponent_derived/rich_text/replace_normal_ids.js";
import {is_valid_uuid} from "../../../wcomponent_derived/rich_text/id_regexs.js";
const TABLE_NAME = "wcomponents";
export function supabase_get_wcomponents(args) {
  return supabase_get_items({
    ...args,
    table: TABLE_NAME,
    converter: wcomponent_supabase_to_app
  });
}
export async function supabase_get_wcomponents_from_any_base(args) {
  const result = await supabase_get_items({
    supabase: args.supabase,
    all_bases: true,
    base_id: void 0,
    specific_ids: args.ids,
    table: TABLE_NAME,
    converter: wcomponent_supabase_to_app
  });
  return {
    error: result.error,
    wcomponents: result.items
  };
}
export async function supabase_get_wcomponents_from_other_bases(args) {
  const downloaded_wcomponent_ids = new Set(args.wcomponents.map((wc) => wc.id));
  const missing_wcomponent_ids = new Set();
  function determine_if_missing_ids(ids2, owner_wcomponent_id) {
    ids2.forEach((id) => {
      if (!is_valid_uuid(id)) {
        console.trace(`Found invalid UUID "${id}".  Owned by wcomponent_id: "${owner_wcomponent_id}"`);
        return;
      }
      if (!downloaded_wcomponent_ids.has(id))
        missing_wcomponent_ids.add(id);
    });
  }
  args.knowledge_views.forEach((kv) => determine_if_missing_ids(Object.keys(kv.wc_id_map)));
  args.wcomponents.forEach((wc) => {
    determine_if_missing_ids(wc.label_ids || [], wc.id);
    let ids2 = get_ids_from_text(wc.title);
    determine_if_missing_ids(ids2);
    ids2 = get_ids_from_text(wc.description);
    determine_if_missing_ids(ids2);
    if (wcomponent_is_action(wc))
      determine_if_missing_ids(wc.parent_goal_or_action_ids || []);
  });
  const ids = Array.from(missing_wcomponent_ids);
  return await supabase_get_wcomponents_from_any_base({supabase: args.supabase, ids});
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
  if (result.status === 401) {
    return {status: result.status, error: {message: "JWT expired"}, item: void 0};
  }
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
function wcomponent_app_to_supabase(item, base_id) {
  return {
    ...app_item_to_supabase(item, base_id),
    type: item.type,
    attribute_id: wcomponent_is_state_value(item) ? item.attribute_wcomponent_id : void 0
  };
}
export function wcomponent_supabase_to_app(item) {
  let wc = supabase_item_to_app(item);
  wc = parse_wcomponent(wc);
  return wc;
}
