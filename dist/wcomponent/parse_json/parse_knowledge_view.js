import {
  clean_base_object_of_sync_meta_fields
} from "../../state/sync/supabase/clean_base_object_for_supabase.js";
import {parse_base_dates} from "./parse_dates.js";
export function parse_knowledge_view(knowledge_view, wcomponent_ids) {
  knowledge_view = clean_base_object_of_sync_meta_fields(knowledge_view);
  knowledge_view = {
    ...knowledge_view,
    ...parse_base_dates(knowledge_view),
    wc_id_map: optionally_remove_invalid_wc_ids(knowledge_view, false, wcomponent_ids),
    sort_type: knowledge_view.sort_type || "normal"
  };
  return upgrade_2021_05_24_knowledge_view(knowledge_view);
}
function optionally_remove_invalid_wc_ids(kv, remove_missing, wcomponent_ids) {
  if (!wcomponent_ids)
    return kv.wc_id_map;
  const new_wc_id_map = {};
  const missing_ids = [];
  Object.entries(kv.wc_id_map).forEach(([id, value]) => {
    if (remove_missing) {
      if (wcomponent_ids.has(id))
        new_wc_id_map[id] = value;
      else
        missing_ids.push(id);
    } else {
      new_wc_id_map[id] = value;
      if (!wcomponent_ids.has(id))
        missing_ids.push(id);
    }
  });
  if (missing_ids.length > 0) {
    if (remove_missing)
      console.warn(`Dropped ${missing_ids.length} invalid ids from KnowledgeView: ${kv.id}`);
    else
      console.warn(`${missing_ids.length} invalid ids in KnowledgeView: ${kv.id}`);
  }
  return new_wc_id_map;
}
function upgrade_2021_05_24_knowledge_view(knowledge_view) {
  const goal_ids = knowledge_view.goal_ids || [];
  return {...knowledge_view, goal_ids};
}
