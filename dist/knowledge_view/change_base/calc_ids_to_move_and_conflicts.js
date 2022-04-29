export function calc_ids_to_move_and_conflicts(args) {
  const knowledge_views_to_move = get_knowledge_views_to_move(args);
  const {knowledge_views_by_id, wcomponents_by_id} = args;
  const knowledge_views_to_keep = get_knowledge_views_to_keep({knowledge_views_to_move, knowledge_views_by_id});
  const {ids_to_move, wcomponents_move_conflicts} = get_ids_to_move({knowledge_views_to_move, knowledge_views_to_keep, wcomponents_by_id});
  return {ids_to_move, wcomponents_move_conflicts};
}
function get_knowledge_views_to_move(args) {
  const knowledge_views_to_move = [];
  const knowledge_view_ids_to_move = new Set();
  const knowledge_view_ids_to_assess = [args.knowledge_view.id];
  while (knowledge_view_ids_to_assess.length) {
    const knowledge_view_id_to_assess = knowledge_view_ids_to_assess.pop();
    if (!knowledge_view_id_to_assess)
      break;
    if (knowledge_view_ids_to_move.has(knowledge_view_id_to_assess))
      continue;
    const kv = args.knowledge_views_by_id[knowledge_view_id_to_assess];
    const entry = args.nested_knowledge_view_ids_map[knowledge_view_id_to_assess];
    if (!entry || !kv) {
      const kv_present = kv ? "present" : "absent";
      const nested_kv_entry_present = entry ? "present" : "absent";
      console.error(`kv of id: "${knowledge_view_id_to_assess}" kv is "${kv_present}" but nested kv map entry is "${nested_kv_entry_present}"`);
      continue;
    }
    knowledge_views_to_move.push(kv);
    knowledge_view_ids_to_move.add(knowledge_view_id_to_assess);
    entry.child_ids.forEach((id) => knowledge_view_ids_to_assess.push(id));
  }
  return knowledge_views_to_move;
}
function get_knowledge_views_to_keep(args) {
  const ids_to_move = new Set(args.knowledge_views_to_move.map(({id}) => id));
  return Object.values(args.knowledge_views_by_id).filter((kv) => !ids_to_move.has(kv.id));
}
function get_ids_to_move(args) {
  const conflicted_wc_ids_in_kvs_to_keep = {};
  args.knowledge_views_to_keep.forEach((kv) => {
    Object.entries(kv.wc_id_map).forEach(([wc_id, kv_entry]) => {
      if (kv_entry.blocked || kv_entry.passthrough)
        return;
      const kv_ids = conflicted_wc_ids_in_kvs_to_keep[wc_id] || [];
      kv_ids.push({kv_id: kv.id, left: kv_entry.left, top: kv_entry.top});
      conflicted_wc_ids_in_kvs_to_keep[wc_id] = kv_ids;
    });
  });
  let ids_to_move = args.knowledge_views_to_move.map((kv) => kv.id);
  const wcomponents_move_conflicts = {};
  args.knowledge_views_to_move.forEach((kv) => Object.entries(kv.wc_id_map).forEach(([wc_id, kv_entry]) => {
    if (kv_entry.blocked || kv_entry.passthrough)
      return;
    if (!args.wcomponents_by_id[wc_id])
      return;
    const conflicts = conflicted_wc_ids_in_kvs_to_keep[wc_id];
    if (conflicts)
      wcomponents_move_conflicts[wc_id] = conflicts;
    ids_to_move.push(wc_id);
  }));
  ids_to_move = Array.from(new Set(ids_to_move));
  return {ids_to_move, wcomponents_move_conflicts};
}
