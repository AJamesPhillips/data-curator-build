import {wcomponent_is_action, wcomponent_is_goal} from "../../wcomponent/interfaces/SpecialisedObjects.js";
export function get_default_parent_goal_or_action_ids(knowledge_view_id, knowledge_views_by_id, wcomponents_by_id) {
  let kv = knowledge_view_id ? knowledge_views_by_id[knowledge_view_id] : void 0;
  while (kv) {
    const wc = wcomponents_by_id[kv.id];
    if (wcomponent_is_action(wc) || wcomponent_is_goal(wc))
      return [wc.id];
    kv = kv.parent_knowledge_view_id ? knowledge_views_by_id[kv.parent_knowledge_view_id] : void 0;
  }
  return [];
}
