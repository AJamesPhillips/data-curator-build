import {offset_by_half_node, round_canvas_point} from "../../../canvas/position_utils.js";
import {prepare_new_wcomponent_object} from "../../../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {
  wcomponent_is_judgement_or_objective
} from "../../../wcomponent/interfaces/SpecialisedObjects.js";
import {get_created_at_ms} from "../../../shared/utils_datetime/utils_datetime.js";
import {ACTIONS} from "../../actions.js";
import {get_middle_of_screen} from "../../display_options/display.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../accessors.js";
import {get_store} from "../../store.js";
export function create_wcomponent(args) {
  const store = args.store || get_store();
  const state = store.getState();
  const creation_context = state.creation_context;
  let wcomponent = prepare_new_wcomponent_object(args.wcomponent, creation_context);
  wcomponent = set_judgement_or_objective_target(wcomponent, state);
  const add_to_knowledge_view = get_knowledge_view_entry(args.add_to_knowledge_view, wcomponent, state);
  const add_to_top = !wcomponent_is_judgement_or_objective(wcomponent);
  const one_minute = 60 * 1e3;
  const created_at_ms = Math.max(get_created_at_ms(wcomponent) + one_minute, state.routing.args.created_at_ms);
  const datetime = new Date(created_at_ms);
  store.dispatch(ACTIONS.specialised_object.upsert_wcomponent({wcomponent, add_to_knowledge_view, add_to_top}));
  store.dispatch(ACTIONS.specialised_object.clear_selected_wcomponents({}));
  store.dispatch(ACTIONS.display_at_created_datetime.change_display_at_created_datetime({datetime}));
  store.dispatch(ACTIONS.routing.change_route({route: "wcomponents", item_id: wcomponent.id}));
  return true;
}
function set_judgement_or_objective_target(wcomponent, state) {
  if (wcomponent_is_judgement_or_objective(wcomponent)) {
    const selected_wcomponent_ids = state.meta_wcomponents.selected_wcomponent_ids_list;
    const selected_wcomponent_id = selected_wcomponent_ids[0];
    if (selected_wcomponent_ids.length === 1 && selected_wcomponent_id) {
      const selected_wcomponent = get_wcomponent_from_state(state, selected_wcomponent_id);
      if (selected_wcomponent) {
        wcomponent = {
          ...wcomponent,
          judgement_target_wcomponent_id: selected_wcomponent.id
        };
      }
    }
  }
  return wcomponent;
}
function get_knowledge_view_entry(add_to_knowledge_view, wcomponent, state) {
  const current_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  if (!add_to_knowledge_view && current_knowledge_view) {
    let position;
    if (wcomponent_is_judgement_or_objective(wcomponent)) {
      position = current_knowledge_view.composed_wc_id_map[wcomponent.judgement_target_wcomponent_id];
    }
    if (!position) {
      const point = offset_by_half_node(get_middle_of_screen(state));
      position = round_canvas_point(point, "large");
    }
    add_to_knowledge_view = {id: current_knowledge_view.id, position};
  }
  return add_to_knowledge_view;
}
