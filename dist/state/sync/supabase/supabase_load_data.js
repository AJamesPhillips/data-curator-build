import {get_supabase} from "../../../supabase/get_supabase.js";
import {supabase_get_knowledge_views} from "./knowledge_view.js";
import {supabase_get_wcomponents} from "./wcomponent.js";
import {local_data} from "../local/data.js";
export async function supabase_load_data(load_state_from_storage, base_id) {
  if (!load_state_from_storage) {
    return Promise.resolve(local_data);
  }
  const supabase = get_supabase();
  const knowledge_views_response = await supabase_get_knowledge_views({supabase, base_id});
  if (knowledge_views_response.error)
    return Promise.reject(knowledge_views_response.error);
  const wcomponents_response = await supabase_get_wcomponents({supabase, base_id});
  if (wcomponents_response.error)
    return Promise.reject(wcomponents_response.error);
  return Promise.resolve({
    knowledge_views: knowledge_views_response.items,
    wcomponents: wcomponents_response.items
  });
}
