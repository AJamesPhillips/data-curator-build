import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {wcomponent_is_statev2, wcomponent_should_have_state_VAP_sets} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {ExternalLinkIcon} from "../sharedf/icons/ExternalLinkIcon.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {SortDirection, sort_list} from "../shared/utils/sort.js";
import {get_possibilities_from_VAP_sets} from "../wcomponent/value_possibilities/get_possibilities_from_VAP_sets.js";
import {get_wcomponent_VAPs_represent} from "../wcomponent/get_wcomponent_VAPs_represent.js";
import {get_items_by_id} from "../shared/utils/get_items.js";
import {square_distance_between_kv_entries} from "../canvas/position_utils.js";
const map_state = (state) => {
  return {
    current_knowledge_view: get_current_composed_knowledge_view_from_state(state),
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    wcomponent_ids_with_state_VAPs: state.derived.wcomponent_ids_by_type.any_state_VAPs,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    editing: !state.display_options.consumption_formatting,
    wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state)
  };
};
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent,
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _WComponentStateValueForm(props) {
  const {
    current_knowledge_view,
    wcomponents_by_id,
    knowledge_views_by_id,
    wcomponent,
    upsert_wcomponent,
    wc_id_to_counterfactuals_map
  } = props;
  const get_key = (wc) => wc.id === current_knowledge_view?.id ? new Date().getTime() : wc.created_at.getTime();
  let possible_owner_wcomponents = Object.values(wcomponents_by_id);
  possible_owner_wcomponents = sort_list(possible_owner_wcomponents, get_key, SortDirection.descending);
  const owner_wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: possible_owner_wcomponents,
    wcomponents_by_id,
    knowledge_views_by_id,
    wc_id_to_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  const wcomponents_with_state_VAP_sets = Array.from(props.wcomponent_ids_with_state_VAPs).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(wcomponent_should_have_state_VAP_sets);
  const position = current_knowledge_view?.composed_wc_id_map[wcomponent.id];
  function get_distance(other_wcomponent) {
    const other_position = current_knowledge_view?.composed_wc_id_map[other_wcomponent.id];
    return square_distance_between_kv_entries(position, other_position);
  }
  const sorted_wcomponents_with_state_VAP_sets = sort_list(wcomponents_with_state_VAP_sets, get_distance, SortDirection.ascending);
  const attribute_wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: sorted_wcomponents_with_state_VAP_sets,
    wcomponents_by_id,
    knowledge_views_by_id,
    wc_id_to_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Owner component"), "  ", wcomponent.owner_wcomponent_id && /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: wcomponent.owner_wcomponent_id,
    args: void 0
  }, /* @__PURE__ */ h(ExternalLinkIcon, null), "  "), /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: true,
    selected_option_id: wcomponent.owner_wcomponent_id,
    options: owner_wcomponent_id_options,
    on_change: (owner_wcomponent_id) => upsert_wcomponent({owner_wcomponent_id}),
    on_mouse_over_option: (id) => props.set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => props.set_highlighted_wcomponent({id, highlighted: false})
  }))), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Attribute component"), "  ", wcomponent.attribute_wcomponent_id && /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: wcomponent.attribute_wcomponent_id,
    args: void 0
  }, /* @__PURE__ */ h(ExternalLinkIcon, null), "  "), /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: true,
    selected_option_id: wcomponent.attribute_wcomponent_id,
    options: attribute_wcomponent_id_options,
    on_change: (attribute_wcomponent_id) => {
      const attribute_wcomponent = wcomponents_by_id[attribute_wcomponent_id || ""];
      let {value_possibilities} = wcomponent;
      if ((!value_possibilities || !Object.keys(value_possibilities)) && wcomponent_is_statev2(attribute_wcomponent)) {
        const VAPs_represent = get_wcomponent_VAPs_represent(attribute_wcomponent, wcomponents_by_id);
        const possible_values = get_possibilities_from_VAP_sets(VAPs_represent, attribute_wcomponent.value_possibilities, attribute_wcomponent.values_and_prediction_sets || []);
        value_possibilities = get_items_by_id(possible_values, "attribute's possible_values");
      }
      upsert_wcomponent({attribute_wcomponent_id, value_possibilities});
    },
    on_mouse_over_option: (id) => props.set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => props.set_highlighted_wcomponent({id, highlighted: false})
  }))));
}
export const WComponentStateValueForm = connector(_WComponentStateValueForm);
