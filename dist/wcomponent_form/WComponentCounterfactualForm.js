import Warning from "../../snowpack/pkg/@material-ui/icons/Warning.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {uncertain_date_to_string} from "../form/datetime_utils.js";
import {EditableCheckbox} from "../form/EditableCheckbox.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {
  convert_VAP_set_to_VAP_visuals
} from "../wcomponent_derived/value_and_prediction/convert_VAP_set_to_VAP_visuals.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {wcomponent_should_have_state_VAP_sets} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_VAPs_represent} from "../wcomponent/get_wcomponent_VAPs_represent.js";
import {ExternalLinkIcon} from "../sharedf/icons/ExternalLinkIcon.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_current_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {toggle_item_in_list} from "../utils/list.js";
const map_state = (state) => {
  const knowledge_view = get_current_knowledge_view_from_state(state);
  const composed_kv = get_current_composed_knowledge_view_from_state(state);
  return {
    knowledge_view,
    editing: !state.display_options.consumption_formatting,
    composed_wc_id_map: composed_kv && composed_kv.composed_wc_id_map,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent,
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _WComponentCounterfactualForm(props) {
  const {
    wcomponent,
    upsert_wcomponent,
    wcomponents_by_id,
    knowledge_views_by_id,
    composed_wc_id_map,
    knowledge_view
  } = props;
  if (!composed_wc_id_map)
    return /* @__PURE__ */ h("div", null, "Counterfactual form can not render: No current knowledge view");
  const wcomponent_statev2s_in_current_kv = Object.keys(composed_wc_id_map).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(wcomponent_should_have_state_VAP_sets);
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: wcomponent_statev2s_in_current_kv,
    wcomponents_by_id,
    knowledge_views_by_id,
    wc_id_to_counterfactuals_map: void 0,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  const target_wcomponent = wcomponents_by_id[wcomponent.target_wcomponent_id || ""];
  let target_VAP_sets = [];
  let VAP_set_id_options = [];
  if (wcomponent_should_have_state_VAP_sets(target_wcomponent)) {
    target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
    VAP_set_id_options = target_VAP_sets.map(({id, datetime}) => {
      const title = uncertain_date_to_string(datetime, "minute");
      return {id, title};
    });
  }
  const VAPs_represent = get_wcomponent_VAPs_represent(target_wcomponent, wcomponents_by_id);
  const target_VAP_set = target_VAP_sets.find(({id}) => id === wcomponent.target_VAP_set_id);
  let counterfactual_active_for_current_knowledge_view = false;
  if (knowledge_view) {
    const ids = knowledge_view.active_counterfactual_v2_ids || [];
    counterfactual_active_for_current_knowledge_view = ids.includes(wcomponent.id);
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
      target_VAP_set_id: void 0,
      target_VAP_id: void 0
    }),
    on_mouse_over_option: (id) => props.set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => props.set_highlighted_wcomponent({id, highlighted: false})
  }))), wcomponent.target_wcomponent_id && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Target value and prediction set to override"), "  ", /* @__PURE__ */ h("div", {
    style: {width: "60%", display: "inline-block"}
  }, /* @__PURE__ */ h(AutocompleteText, {
    allow_none: true,
    selected_option_id: wcomponent.target_VAP_set_id,
    options: VAP_set_id_options,
    on_change: (new_target_VAP_set_id) => {
      upsert_wcomponent({
        target_VAP_set_id: new_target_VAP_set_id,
        target_VAP_id: void 0
      });
    }
  }))), target_wcomponent && target_VAP_set && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Counterfactual value"), "  ", convert_VAP_set_to_VAP_visuals({
    VAP_set: target_VAP_set,
    VAPs_represent,
    wcomponent: target_wcomponent,
    sort: false
  }).map((visual_VAP) => {
    const {VAP_id, value_text} = visual_VAP;
    const checked = VAP_id === wcomponent.target_VAP_id;
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
      type: "radio",
      disabled: !props.editing,
      id: VAP_id,
      value: value_text,
      checked,
      onChange: () => upsert_wcomponent({target_VAP_id: VAP_id})
    }), /* @__PURE__ */ h("label", {
      for: VAP_id
    }, value_text));
  })), knowledge_view && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Apply counterfactual in this knowledge view"), "  ", /* @__PURE__ */ h(EditableCheckbox, {
    value: counterfactual_active_for_current_knowledge_view,
    on_change: () => {
      const {id} = wcomponent;
      const active_counterfactual_v2_ids = toggle_item_in_list(knowledge_view.active_counterfactual_v2_ids || [], id);
      const kv = {
        ...knowledge_view,
        active_counterfactual_v2_ids
      };
      props.upsert_knowledge_view({knowledge_view: kv});
    }
  }), !target_VAP_set && counterfactual_active_for_current_knowledge_view && /* @__PURE__ */ h("span", {
    title: "Will not be applied yet, you need to target a component and one of its value sets"
  }, /* @__PURE__ */ h(Warning, null))));
}
export const WComponentCounterfactualForm = connector(_WComponentCounterfactualForm);
