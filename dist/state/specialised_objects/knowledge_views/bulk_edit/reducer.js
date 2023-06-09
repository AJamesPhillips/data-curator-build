import {round_canvas_point} from "../../../../canvas/position_utils.js";
import {
  get_current_knowledge_view_from_state,
  get_current_composed_knowledge_view_from_state
} from "../../accessors.js";
import {handle_upsert_knowledge_view} from "../utils.js";
import {
  is_bulk_add_to_knowledge_view,
  is_bulk_edit_knowledge_view_entries,
  is_bulk_remove_from_knowledge_view,
  is_change_current_knowledge_view_entries_order,
  is_snap_to_grid_knowledge_view_entries
} from "./actions.js";
export const bulk_editing_knowledge_view_entries_reducer = (state, action) => {
  if (is_bulk_edit_knowledge_view_entries(action)) {
    state = handle_bulk_edit_knowledge_view_entries(state, action);
  }
  if (is_snap_to_grid_knowledge_view_entries(action)) {
    state = handle_snap_to_grid_knowledge_view_entries(state, action);
  }
  if (is_change_current_knowledge_view_entries_order(action)) {
    state = handle_change_current_knowledge_view_entries_order(state, action);
  }
  if (is_bulk_add_to_knowledge_view(action)) {
    state = handle_bulk_add_to_knowledge_view(state, action);
  }
  if (is_bulk_remove_from_knowledge_view(action)) {
    state = handle_bulk_remove_from_knowledge_view(state, action);
  }
  return state;
};
function handle_bulk_add_to_knowledge_view(state, action) {
  const {knowledge_view_id, wcomponent_ids, override_entry, default_entry} = action;
  const kv = state.specialised_objects.knowledge_views_by_id[knowledge_view_id];
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (!kv) {
    console.error(`Could not find knowledge view for bulk_add_to_knowledge_view by id: "${knowledge_view_id}"`);
  } else if (!composed_kv) {
    console.error("There should always be a current knowledge view if bulk editing position of world components");
  } else {
    let new_wc_id_map = {};
    wcomponent_ids.forEach((id) => {
      let entry = {
        ...default_entry,
        ...composed_kv.composed_wc_id_map[id],
        ...override_entry,
        blocked: void 0,
        passthrough: void 0
      };
      if (entry.left === void 0 || entry.top === void 0) {
        console.error(`we should always have an entry but no bulk_entry provided and wcomponent "${id}" lacking entry in composed_kv composed_wc_id_map for "${knowledge_view_id}"`);
        return;
      }
      new_wc_id_map[id] = entry;
    });
    new_wc_id_map = {...kv.wc_id_map, ...new_wc_id_map};
    const new_kv = {...kv, wc_id_map: new_wc_id_map};
    state = handle_upsert_knowledge_view(state, new_kv);
  }
  return state;
}
function handle_bulk_remove_from_knowledge_view(state, action) {
  const {wcomponent_ids, remove_type} = action;
  const blocked = remove_type === "block";
  const kv = get_current_knowledge_view_from_state(state);
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (!kv || !composed_kv) {
    console.error("There should always be a current and current composed knowledge view if bulk editing (removing) positions of world components");
  } else {
    const new_wc_id_map = {...kv.wc_id_map};
    wcomponent_ids.forEach((id) => {
      const entry = blocked ? composed_kv.composed_wc_id_map[id] : kv.wc_id_map[id];
      if (!entry)
        return;
      const new_entry = blocked ? {...entry, blocked: true, passthrough: void 0} : {...entry, blocked: void 0, passthrough: true};
      new_wc_id_map[id] = new_entry;
    });
    const new_kv = {...kv, wc_id_map: new_wc_id_map};
    state = handle_upsert_knowledge_view(state, new_kv);
  }
  return state;
}
function handle_snap_to_grid_knowledge_view_entries(state, action) {
  const {wcomponent_ids, knowledge_view_id} = action;
  const kv = state.specialised_objects.knowledge_views_by_id[knowledge_view_id];
  if (kv) {
    const new_wc_id_map = {...kv.wc_id_map};
    wcomponent_ids.forEach((wcomponent_id) => {
      const entry = kv.wc_id_map[wcomponent_id];
      if (!entry)
        return;
      const new_entry = round_canvas_point(entry, "large");
      new_wc_id_map[wcomponent_id] = new_entry;
    });
    const new_kv = {...kv, wc_id_map: new_wc_id_map};
    state = handle_upsert_knowledge_view(state, new_kv);
  }
  return state;
}
function handle_change_current_knowledge_view_entries_order(state, action) {
  const {wcomponent_ids, order} = action;
  const kv = get_current_knowledge_view_from_state(state);
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (!kv || !composed_kv) {
    console.error("There should always be a current knowledge view and current composed knowledge view if bulk editing (moving to top) world components");
    return state;
  }
  let new_wc_id_map = {};
  if (order === "front") {
    new_wc_id_map = {...kv.wc_id_map};
    wcomponent_ids.forEach((wcomponent_id) => {
      const existing_entry = composed_kv.composed_wc_id_map[wcomponent_id];
      if (!existing_entry)
        return;
      delete new_wc_id_map[wcomponent_id];
      new_wc_id_map[wcomponent_id] = existing_entry;
    });
  } else if (order === "back") {
    wcomponent_ids.forEach((wcomponent_id) => {
      const existing_entry = composed_kv.composed_wc_id_map[wcomponent_id];
      if (!existing_entry)
        return;
      new_wc_id_map[wcomponent_id] = existing_entry;
    });
    new_wc_id_map = {...new_wc_id_map, ...kv.wc_id_map};
  }
  const new_kv = {...kv, wc_id_map: new_wc_id_map};
  state = handle_upsert_knowledge_view(state, new_kv);
  return state;
}
function handle_bulk_edit_knowledge_view_entries(state, action) {
  const {wcomponent_ids, change_left, change_top} = action;
  const kv = get_current_knowledge_view_from_state(state);
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  if (kv && composed_kv) {
    const new_wc_id_map = {...kv.wc_id_map};
    wcomponent_ids.forEach((id) => {
      const existing_entry = composed_kv.composed_wc_id_map[id];
      const new_entry = {...existing_entry};
      new_entry.left += change_left;
      new_entry.top += change_top;
      new_wc_id_map[id] = new_entry;
    });
    const new_kv = {...kv, wc_id_map: new_wc_id_map};
    state = handle_upsert_knowledge_view(state, new_kv);
  } else {
    console.error("There should always be a current knowledge view if bulk editing position of world components");
  }
  return state;
}
