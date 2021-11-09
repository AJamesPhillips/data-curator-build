import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "./WComponentCanvasConnection.css.proxy.js";
import {CanvasConnnection} from "../../canvas/connections/CanvasConnnection.js";
import {ConnectionEndType} from "../../canvas/connections/ConnectionEnd.js";
import {convert_VAP_set_to_VAP_visuals} from "../../wcomponent_derived/value_and_prediction/convert_VAP_set_to_VAP_visuals.js";
import {bounded} from "../../shared/utils/bounded.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {
  wcomponent_is_plain_connection,
  wcomponent_is_judgement_or_objective,
  wcomponent_can_render_connection,
  wcomponent_is_causal_link,
  wcomponent_is_statev2
} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {
  apply_counterfactuals_v2_to_VAP_set
} from "../../wcomponent_derived/value_and_prediction/apply_counterfactuals_v2_to_VAP_set.js";
import {get_current_VAP_set} from "../../wcomponent_derived/value_and_prediction/get_current_v2_VAP_set.js";
import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {ACTIONS} from "../../state/actions.js";
import {get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {
  calc_connection_wcomponent_should_display,
  calc_judgement_connection_wcomponent_should_display,
  calc_display_opacity
} from "../calc_should_display.js";
import {factory_on_click} from "../canvas_common.js";
import {get_VAP_set_id_to_counterfactual_v2_map} from "../../state/derived/accessor.js";
const map_state = (state, own_props) => {
  const {id: wcomponent_id} = own_props;
  const wcomponent = get_wcomponent_from_state(state, wcomponent_id);
  const {force_display: force_displaying} = state.filter_context;
  const is_selected = state.meta_wcomponents.selected_wcomponent_ids_set.has(wcomponent_id);
  const {current_composed_knowledge_view: composed_kv} = state.derived;
  const {created_at_ms, sim_ms} = state.routing.args;
  const {derived_validity_filter: validity_filter} = state.display_options;
  const is_editing = !state.display_options.consumption_formatting;
  let validity_value = false;
  let from_wc = void 0;
  let to_wc = void 0;
  let connection_effect = void 0;
  if (!wcomponent || !composed_kv)
    "";
  else {
    const {wc_ids_excluded_by_filters} = composed_kv.filters;
    const kv_entry = composed_kv.composed_wc_id_map[wcomponent.id];
    if (wcomponent_is_plain_connection(wcomponent)) {
      from_wc = get_wcomponent_from_state(state, wcomponent.from_id);
      to_wc = get_wcomponent_from_state(state, wcomponent.to_id);
      const from_wc__kv_entry = composed_kv.composed_wc_id_map[wcomponent.from_id];
      const to_wc__kv_entry = composed_kv.composed_wc_id_map[wcomponent.to_id];
      validity_value = calc_connection_wcomponent_should_display({
        is_editing,
        force_displaying,
        is_selected,
        wcomponent,
        kv_entry,
        validity_filter,
        from_wc,
        to_wc,
        from_wc__kv_entry,
        to_wc__kv_entry,
        created_at_ms,
        sim_ms,
        wc_ids_excluded_by_filters
      });
      connection_effect = calculate_effect(wcomponent, from_wc, state);
    } else if (wcomponent_is_judgement_or_objective(wcomponent)) {
      const target_id = wcomponent.judgement_target_wcomponent_id;
      const target_wc = get_wcomponent_from_state(state, target_id);
      const target_wc__kv_entry = composed_kv.composed_wc_id_map[target_id];
      validity_value = calc_judgement_connection_wcomponent_should_display({
        is_editing,
        force_displaying,
        is_selected,
        wcomponent,
        kv_entry,
        validity_filter,
        target_wc,
        target_wc__kv_entry,
        created_at_ms,
        sim_ms,
        wc_ids_excluded_by_filters
      });
    }
  }
  const shift_or_control_keys_are_down = state.global_keys.derived.shift_or_control_down;
  return {
    current_composed_knowledge_view: composed_kv,
    wcomponent,
    connection_effect,
    validity_value,
    is_current_item: state.routing.item_id === wcomponent_id,
    is_selected,
    is_highlighted: state.meta_wcomponents.highlighted_wcomponent_ids.has(wcomponent_id),
    is_editing,
    certainty_formatting: state.display_options.derived_certainty_formatting,
    shift_or_control_keys_are_down,
    focused_mode: state.display_options.focused_mode,
    connected_neighbour_is_highlighted: state.meta_wcomponents.neighbour_ids_of_highlighted_wcomponent.has(wcomponent_id)
  };
};
const map_dispatch = {
  clicked_wcomponent: ACTIONS.specialised_object.clicked_wcomponent,
  clear_selected_wcomponents: ACTIONS.specialised_object.clear_selected_wcomponents,
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _WComponentCanvasConnection(props) {
  const {
    id,
    current_composed_knowledge_view,
    wcomponent,
    is_current_item,
    is_highlighted,
    is_selected,
    validity_value,
    connection_effect,
    shift_or_control_keys_are_down,
    change_route,
    clicked_wcomponent,
    clear_selected_wcomponents
  } = props;
  if (!wcomponent) {
    console.error(`Tried to render a WComponentCanvasConnection of world component id: "${id}" but could not find it`);
    return null;
  }
  if (!wcomponent_can_render_connection(wcomponent)) {
    console.error(`Tried to render a WComponentCanvasConnection of world component id: "${id}" but was not a causal link`);
    return null;
  }
  if (!validity_value)
    return null;
  if (!current_composed_knowledge_view) {
    console.error(`Tried to render a WComponentCanvasConnection of world component id: "${id}" but no current_composed_knowledge_view`);
    return null;
  }
  const on_click = factory_on_click({wcomponent_id: id, clicked_wcomponent, clear_selected_wcomponents, shift_or_control_keys_are_down, change_route, is_current_item});
  const {
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type
  } = get_connection_terminal_positions({wcomponent, wc_id_map: current_composed_knowledge_view.composed_wc_id_map});
  const validity_opacity = calc_display_opacity({
    is_editing: props.is_editing,
    certainty: validity_value.display_certainty,
    is_current_item,
    connected_neighbour_is_highlighted: props.connected_neighbour_is_highlighted,
    certainty_formatting: props.certainty_formatting,
    focused_mode: props.focused_mode
  });
  let thickness = 2;
  let connection_end_type = ConnectionEndType.positive;
  let effect = "";
  if (connection_effect !== void 0) {
    thickness = bounded(Math.abs(connection_effect), 2, 15);
    if (connection_effect < 0) {
      connection_end_type = ConnectionEndType.negative;
      effect = "negative_connection_effect";
    } else if (connection_effect === 0) {
      connection_end_type = ConnectionEndType.noop;
      effect = "no_connection_effect";
    }
  }
  let line_behaviour = void 0;
  if (wcomponent_is_plain_connection(wcomponent))
    line_behaviour = wcomponent.line_behaviour;
  return /* @__PURE__ */ h(CanvasConnnection, {
    from_node_position,
    to_node_position,
    from_connection_type,
    to_connection_type,
    on_click,
    on_pointer_over_out: (over) => props.set_highlighted_wcomponent({id, highlighted: over}),
    line_behaviour,
    thickness,
    connection_end_type,
    intensity: validity_opacity,
    is_highlighted: is_current_item || is_highlighted || is_selected,
    extra_css_classes: "connection_type_" + wcomponent.type + " " + effect
  });
}
export const WComponentCanvasConnection = connector(_WComponentCanvasConnection);
function get_connection_terminal_positions({wcomponent, wc_id_map}) {
  let from_node_position = void 0;
  let to_node_position = void 0;
  let from_connection_type;
  let to_connection_type;
  if (wcomponent_is_plain_connection(wcomponent)) {
    from_node_position = wc_id_map[wcomponent.from_id];
    to_node_position = wc_id_map[wcomponent.to_id];
    from_connection_type = {direction: "from", attribute: wcomponent.from_type};
    to_connection_type = {direction: "to", attribute: wcomponent.to_type};
  } else {
    from_node_position = wc_id_map[wcomponent.id];
    to_node_position = wc_id_map[wcomponent.judgement_target_wcomponent_id];
    from_connection_type = {direction: "from", attribute: "meta"};
    to_connection_type = {direction: "to", attribute: "meta"};
  }
  return {from_node_position, to_node_position, from_connection_type, to_connection_type};
}
function calculate_effect(wcomponent, from_wc, state) {
  let connection_effect = void 0;
  if (wcomponent_is_causal_link(wcomponent)) {
    connection_effect = wcomponent.effect_when_true;
    if (wcomponent_is_statev2(from_wc)) {
      const VAP_set = get_current_VAP_set({
        values_and_prediction_sets: from_wc.values_and_prediction_sets,
        created_at_ms: state.routing.args.created_at_ms,
        sim_ms: state.routing.args.sim_ms
      });
      if (VAP_set) {
        const VAP_set_id_to_counterfactual_v2_map = get_VAP_set_id_to_counterfactual_v2_map(state, from_wc.id);
        const counterfactual_VAP_set = apply_counterfactuals_v2_to_VAP_set({
          VAP_set,
          VAP_set_id_to_counterfactual_v2_map
        });
        const VAPs_represent = get_wcomponent_VAPs_represent(from_wc);
        const visual_VAPs = convert_VAP_set_to_VAP_visuals({
          wcomponent: from_wc,
          VAP_set: counterfactual_VAP_set,
          VAPs_represent
        });
        const value = visual_VAPs[0]?.parsed_value;
        if (value !== void 0 && value !== null) {
          if (VAPs_represent === VAPsType.boolean) {
            connection_effect = value === true ? wcomponent.effect_when_true : wcomponent.effect_when_false;
          } else {
            connection_effect = typeof value === "number" ? wcomponent.effect_when_true !== void 0 ? value * wcomponent.effect_when_true : void 0 : wcomponent.effect_when_true;
          }
        }
      }
    }
  }
  return connection_effect !== void 0 ? bounded(connection_effect, -100, 100) : void 0;
}
