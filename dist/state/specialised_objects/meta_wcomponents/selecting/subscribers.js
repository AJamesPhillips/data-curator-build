import {ACTIONS} from "../../../actions.js";
import {pub_sub} from "../../../pub_sub/pub_sub.js";
import {get_current_composed_knowledge_view_from_state} from "../../accessors.js";
import {conditionally_select_all_components} from "./helpers.js";
export function meta_wcomponents_selecting_subscribers(store) {
  handle_canvas_area_select(store);
}
export function handle_ctrl_a(store, e) {
  const select_all = e.key === "a" && e.ctrl_key;
  if (!select_all)
    return;
  e.event.preventDefault();
  conditionally_select_all_components(store);
}
function handle_canvas_area_select(store) {
  pub_sub.canvas.sub("canvas_area_select", (area_select) => {
    const state = store.getState();
    const kv = get_current_composed_knowledge_view_from_state(state);
    if (!kv)
      return;
    const viewing_knowledge = state.routing.args.view === "knowledge";
    if (!viewing_knowledge)
      return;
    const {start_x, start_y, end_x, end_y} = area_select;
    const start_top = -start_y;
    const end_top = -end_y;
    const ids = Object.entries(kv.composed_visible_wc_id_map).filter(([id, entry]) => {
      return entry.left >= start_x && entry.left <= end_x && entry.top <= start_top && entry.top >= end_top;
    }).map(([id]) => id).filter((id) => !kv.wc_ids_by_type.any_link.has(id));
    const remove_ids = state.global_keys.keys_down.has("Control");
    const new_selected_ids = calculate_new_selected_ids(remove_ids, state, ids);
    store.dispatch(ACTIONS.meta_wcomponents.set_selected_wcomponents({ids: new_selected_ids}));
    store.dispatch(ACTIONS.routing.change_route({sub_route: "wcomponents_edit_multiple", item_id: null}));
  });
}
function calculate_new_selected_ids(remove_ids, state, ids) {
  let all_selected_ids = [];
  if (remove_ids) {
    const current_ids = new Set(state.meta_wcomponents.selected_wcomponent_ids_set);
    ids.forEach((id) => current_ids.delete(id));
    all_selected_ids = Array.from(current_ids);
  } else {
    all_selected_ids = state.meta_wcomponents.selected_wcomponent_ids_list.concat(ids);
  }
  return all_selected_ids;
}
