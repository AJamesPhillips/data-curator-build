export function parse_knowledge_view(knowledge_view, wcomponent_ids) {
  knowledge_view = {
    ...knowledge_view,
    created_at: new Date(knowledge_view.created_at),
    wc_id_map: remove_invalid_wc_ids(knowledge_view, wcomponent_ids),
    sort_type: knowledge_view.sort_type || "normal"
  };
  return upgrade_2021_05_24_knowledge_view(knowledge_view);
}
function remove_invalid_wc_ids(kv, wcomponent_ids) {
  const new_wc_id_map = {};
  const dropped_ids = [];
  Object.entries(kv.wc_id_map).forEach(([id, value]) => {
    if (wcomponent_ids.has(id))
      new_wc_id_map[id] = value;
    else
      dropped_ids.push(id);
  });
  if (dropped_ids.length > 0)
    console.warn(`Dropped ${dropped_ids.length} invalid ids from KnowledgeView: ${kv.id}`);
  return new_wc_id_map;
}
function upgrade_2021_05_24_knowledge_view(knowledge_view) {
  const goal_ids = knowledge_view.goal_ids || [];
  return {...knowledge_view, goal_ids};
}
