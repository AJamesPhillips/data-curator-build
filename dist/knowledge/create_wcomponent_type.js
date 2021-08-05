import {round_canvas_point} from "../canvas/position_utils.js";
import {get_new_wcomponent_object} from "../shared/wcomponent/get_new_wcomponent_object.js";
import {
  wcomponent_is_judgement_or_objective,
  wcomponent_is_state,
  wcomponent_is_statev2
} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_created_at_ms} from "../shared/wcomponent/utils_datetime.js";
import {ACTIONS} from "../state/actions.js";
import {get_middle_of_screen} from "../state/display_options/display.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../state/specialised_objects/accessors.js";
import {get_store} from "../state/store.js";
export function create_wcomponent(args) {
  const store = args.store || get_store();
  const state = store.getState();
  let wcomponent = get_new_wcomponent_object(args.wcomponent, args.creation_context);
  wcomponent = set_judgement_or_objective_target(wcomponent, state);
  const current_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  let {add_to_knowledge_view} = args;
  if (!add_to_knowledge_view && current_knowledge_view) {
    const position = round_canvas_point(get_middle_of_screen(state), "large");
    add_to_knowledge_view = {id: current_knowledge_view.id, position};
  }
  const {must_add_to_knowledge_view = true} = args;
  if (must_add_to_knowledge_view && !add_to_knowledge_view) {
    console.error("No knowledge view to add new wcomponent too");
    return false;
  }
  const created_at_ms = Math.max(get_created_at_ms(wcomponent) + 6e4, state.routing.args.created_at_ms);
  const datetime = new Date(created_at_ms);
  store.dispatch(ACTIONS.specialised_object.upsert_wcomponent({wcomponent, add_to_knowledge_view}));
  store.dispatch(ACTIONS.specialised_object.clear_selected_wcomponents({}));
  store.dispatch(ACTIONS.display_at_created_datetime.change_display_at_created_datetime({datetime}));
  store.dispatch(ACTIONS.routing.change_route({route: "wcomponents", item_id: wcomponent.id}));
  return true;
}
function set_judgement_or_objective_target(wcomponent, state) {
  if (wcomponent_is_judgement_or_objective(wcomponent)) {
    const selected_wcomponents = state.meta_wcomponents.selected_wcomponent_ids_list;
    if (selected_wcomponents.length === 1) {
      const selected_wcomponent = get_wcomponent_from_state(state, selected_wcomponents[0]);
      if (wcomponent_is_state(selected_wcomponent)) {
        wcomponent = {
          ...wcomponent,
          judgement_target_wcomponent_id: selected_wcomponent.id
        };
        if (wcomponent_is_statev2(selected_wcomponent) && selected_wcomponent.subtype === "boolean") {
          wcomponent.judgement_operator = "==";
          wcomponent.judgement_comparator_value = "True";
        }
      }
    }
  }
  return wcomponent;
}
