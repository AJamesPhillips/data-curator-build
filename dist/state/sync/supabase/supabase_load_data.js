import {get_supabase} from "../../../supabase/get_supabase.js";
import {supabase_get_knowledge_views, supabase_get_knowledge_views_from_other_bases} from "./knowledge_view.js";
import {supabase_get_wcomponents, supabase_get_wcomponents_from_other_bases} from "./wcomponent.js";
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
  const wcomponents_other_bases_response = await supabase_get_wcomponents_from_other_bases({
    supabase,
    base_id,
    knowledge_views: knowledge_views_response.items,
    wcomponents: wcomponents_response.items
  });
  if (wcomponents_other_bases_response.error)
    return Promise.reject(wcomponents_other_bases_response.error);
  const knowledge_views_other_bases_response = await supabase_get_knowledge_views_from_other_bases({
    supabase,
    knowledge_views: knowledge_views_response.items,
    wcomponents_from_other_bases: wcomponents_other_bases_response.wcomponents
  });
  if (knowledge_views_other_bases_response.error)
    return Promise.reject(knowledge_views_other_bases_response.error);
  const wcomponents = [
    ...wcomponents_response.items,
    ...wcomponents_other_bases_response.wcomponents
  ];
  const knowledge_views = [
    ...knowledge_views_response.items,
    ...knowledge_views_other_bases_response.items
  ];
  return Promise.resolve({
    knowledge_views,
    wcomponents
  });
}
