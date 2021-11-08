import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {ExternalLinkIcon} from "../sharedf/icons/ExternalLinkIcon.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
import {
  wcomponent_is_plain_connection
} from "../wcomponent/interfaces/SpecialisedObjects.js";
import "./WComponentFromTo.css.proxy.js";
const map_state = (state) => ({
  wcomponents: state.derived.wcomponents,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state),
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms
});
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _WComponentFromTo(props) {
  const {
    connection_terminal_description,
    wcomponent_id,
    connection_terminal_type,
    wcomponents,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map,
    on_update_id,
    on_update_type,
    set_highlighted_wcomponent
  } = props;
  const wcomponent = wcomponent_id ? wcomponents_by_id[wcomponent_id] : void 0;
  const filtered_wcomponents = wcomponents.filter((wc) => !wcomponent_is_plain_connection(wc));
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: filtered_wcomponents,
    wcomponents_by_id,
    wc_id_to_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  const wcomponent_terminal_type_options = [
    {id: "validity", title: "Validity"},
    {id: "state", title: "State"},
    {id: "meta", title: "Meta"}
  ];
  return /* @__PURE__ */ h("div", {
    title: wcomponent && wcomponent.title,
    className: "wcomponent_from_to"
  }, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, connection_terminal_description, "  "), /* @__PURE__ */ h(AutocompleteText, {
    placeholder: connection_terminal_description + "...",
    selected_option_id: wcomponent_id,
    options: wcomponent_id_options,
    allow_none: true,
    on_change: (option_id) => on_update_id(option_id),
    on_mouse_over_option: (id) => set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => set_highlighted_wcomponent({id, highlighted: false})
  }), wcomponent_id && /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: wcomponent_id,
    args: void 0
  }, /* @__PURE__ */ h(ExternalLinkIcon, null)), on_update_type && /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "attribute...",
    selected_option_id: connection_terminal_type,
    options: wcomponent_terminal_type_options,
    allow_none: false,
    on_change: (type) => on_update_type(type),
    on_mouse_over_option: (type) => set_highlighted_wcomponent({id: wcomponent_id, highlighted: true}),
    on_mouse_leave_option: (type) => set_highlighted_wcomponent({id: wcomponent_id, highlighted: false})
  }));
}
export const WComponentFromTo = connector(_WComponentFromTo);
