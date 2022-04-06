import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {uncertain_date_to_string} from "../form/datetime_utils.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {wcomponent_should_have_state_VAP_sets} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {make_valid_selector} from "../wcomponent/interfaces/substate.js";
import {ExternalLinkIcon} from "../sharedf/icons/ExternalLinkIcon.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {
  convert_VAP_sets_to_visual_sub_state_value_possibilities
} from "../wcomponent_derived/sub_state/convert_VAP_sets_to_visual_sub_state_value_possibilities.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {
  prune_items_by_created_at_and_versions_and_sort_by_datetimes
} from "../wcomponent_derived/value_and_prediction/partition_and_prune_items_by_datetimes_and_versions.js";
const map_state = (state, own_props) => {
  const {target_wcomponent_id} = own_props.wcomponent;
  const maybe_target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wcomponent_id || ""];
  const target_wcomponent = wcomponent_should_have_state_VAP_sets(maybe_target_wcomponent) && maybe_target_wcomponent;
  return {
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    wcomponent_ids_with_state_VAPs: state.derived.wcomponent_ids_by_type.any_state_VAPs,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    editing: !state.display_options.consumption_formatting,
    target_wcomponent,
    wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state)
  };
};
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent,
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _WComponentSubStateForm(props) {
  const {
    wcomponents_by_id,
    knowledge_views_by_id,
    wcomponent,
    upsert_wcomponent,
    target_wcomponent,
    wc_id_to_counterfactuals_map
  } = props;
  const wcomponents_with_state_VAP_sets = Array.from(props.wcomponent_ids_with_state_VAPs).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(wcomponent_should_have_state_VAP_sets);
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: wcomponents_with_state_VAP_sets,
    wcomponents_by_id,
    knowledge_views_by_id,
    wc_id_to_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  const selector = wcomponent.selector || {};
  let target_VAP_sets = [];
  let VAP_set_id_options = [];
  let simple_possibilities = [];
  if (target_wcomponent) {
    target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
    target_VAP_sets = prune_items_by_created_at_and_versions_and_sort_by_datetimes(target_VAP_sets, props.created_at_ms);
    VAP_set_id_options = target_VAP_sets.map(({id, datetime}) => {
      const title = uncertain_date_to_string(datetime, "minute");
      return {id, title};
    });
    simple_possibilities = convert_VAP_sets_to_visual_sub_state_value_possibilities({selector: wcomponent.selector, target_wcomponent});
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Target component"), "  ", wcomponent.target_wcomponent_id && /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: wcomponent.target_wcomponent_id,
    args: void 0
  }, /* @__PURE__ */ h(ExternalLinkIcon, null), "  "), /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: true,
    selected_option_id: wcomponent.target_wcomponent_id,
    options: wcomponent_id_options,
    on_change: (target_wcomponent_id) => upsert_wcomponent({
      target_wcomponent_id,
      selector: void 0
    }),
    on_mouse_over_option: (id) => props.set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => props.set_highlighted_wcomponent({id, highlighted: false})
  }))), target_wcomponent && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Select value and prediction set timepoint of interest to display"), "  ", /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: true,
    selected_option_id: selector.target_VAP_set_id,
    options: VAP_set_id_options,
    on_change: (new_target_VAP_set_id) => {
      const new_selector = make_valid_selector({
        ...selector,
        target_VAP_set_id: new_target_VAP_set_id
      });
      upsert_wcomponent({selector: new_selector});
    },
    retain_options_order: true
  }))), target_wcomponent && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Select value possibility of interest to limit display by"), "  ", /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "radio",
    disabled: !props.editing,
    id: "not_set_target_value",
    checked: selector.target_value === void 0 || selector.target_value_id_type === void 0,
    onChange: () => {
      const new_selector = make_valid_selector({
        ...selector,
        target_value: void 0,
        target_value_id_type: void 0
      });
      upsert_wcomponent({selector: new_selector});
    }
  }), /* @__PURE__ */ h("label", {
    for: "not_set_target_value"
  }, "Not set")), simple_possibilities.map((value_possibility) => {
    const {value, id, selected} = value_possibility;
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
      type: "radio",
      disabled: !props.editing,
      id,
      checked: selected || false,
      onChange: () => {
        const new_selector = make_valid_selector({
          ...selector,
          target_value: id || value,
          target_value_id_type: id ? "id" : "value_string"
        });
        upsert_wcomponent({selector: new_selector});
      }
    }), /* @__PURE__ */ h("label", {
      for: id
    }, value));
  })));
}
export const WComponentSubStateForm = connector(_WComponentSubStateForm);
