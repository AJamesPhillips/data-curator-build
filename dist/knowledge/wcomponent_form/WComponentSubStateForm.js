import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {uncertain_date_to_string} from "../../form/datetime_utils.js";
import {get_wcomponent_search_options} from "../../search/get_wcomponent_search_options.js";
import {is_defined} from "../../shared/utils/is_defined.js";
import {wcomponent_is_statev2} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {make_valid_selector} from "../../shared/wcomponent/interfaces/substate.js";
import {ExternalLinkIcon} from "../../sharedf/icons/ExternalLinkIcon.js";
import {Link} from "../../sharedf/Link.js";
import {ACTIONS} from "../../state/actions.js";
const map_state = (state, own_props) => {
  const {target_wcomponent_id} = own_props.wcomponent;
  const maybe_target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wcomponent_id || ""];
  const target_wcomponent = wcomponent_is_statev2(maybe_target_wcomponent) && maybe_target_wcomponent;
  return {
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    statev2_wcomponent_ids: state.derived.wcomponent_ids_by_type.statev2,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms,
    editing: !state.display_options.consumption_formatting,
    target_wcomponent
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
    wcomponent,
    upsert_wcomponent,
    target_wcomponent
  } = props;
  const wcomponent_statev2s = Array.from(props.statev2_wcomponent_ids).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(wcomponent_is_statev2);
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: wcomponent_statev2s,
    wcomponents_by_id,
    wc_id_counterfactuals_map: {},
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  let target_VAP_sets = [];
  let VAP_set_id_options = [];
  if (target_wcomponent) {
    target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
    VAP_set_id_options = target_VAP_sets.map(({id, datetime}) => {
      const title = uncertain_date_to_string(datetime, "minute");
      return {id, title};
    });
  }
  const selector = wcomponent.selector || {};
  const target_VAP_set = target_VAP_sets.find(({id}) => id === selector.target_VAP_set_id);
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
    }
  }))));
}
export const WComponentSubStateForm = connector(_WComponentSubStateForm);
