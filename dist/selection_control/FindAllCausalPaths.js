import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../state/derived/accessor.js";
const map_state = (state) => ({
  composed_kv: state.derived.current_composed_knowledge_view,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state),
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms,
  selected_wcomponent_ids_list: state.meta_wcomponents.selected_wcomponent_ids_list,
  from_ids: state.meta_wcomponents.find_all_causal_paths_from_wcomponent_ids,
  to_ids: state.meta_wcomponents.find_all_causal_paths_to_wcomponent_ids
});
const map_dispatch = {
  set_ids: ACTIONS.meta_wcomponents.set_find_all_causal_paths_wcomponent_ids
};
const connector = connect(map_state, map_dispatch);
function _FindAllCausalPaths(props) {
  const {composed_kv} = props;
  const node_options = useMemo(() => {
    const wc_ids_by_type = composed_kv?.wc_ids_by_type;
    if (!wc_ids_by_type)
      return [];
    return get_wcomponent_search_options({
      allowed_wcomponent_ids: wc_ids_by_type.any_node,
      wcomponents_by_id: props.wcomponents_by_id,
      knowledge_views_by_id: props.knowledge_views_by_id,
      wc_id_to_counterfactuals_map: props.wc_id_to_counterfactuals_map,
      created_at_ms: props.created_at_ms,
      sim_ms: props.sim_ms
    });
  }, [composed_kv?.wc_ids_by_type]);
  if (!composed_kv)
    return /* @__PURE__ */ h("div", null, "Loading...");
  return /* @__PURE__ */ h("div", null, "From...", /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "From...",
    allow_none: true,
    selected_option_ids: props.from_ids,
    options: node_options,
    force_editable: true,
    on_change: (new_from_ids) => props.set_ids({direction: "from", ids: new_from_ids})
  }), props.selected_wcomponent_ids_list.length > 0 && /* @__PURE__ */ h(Button, {
    value: "Use current selection",
    onClick: () => {
      props.set_ids({direction: "from", ids: props.selected_wcomponent_ids_list});
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), "To...", /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "To...",
    allow_none: true,
    selected_option_ids: props.to_ids,
    options: node_options,
    force_editable: true,
    on_change: (new_to_ids) => props.set_ids({direction: "to", ids: new_to_ids})
  }), props.selected_wcomponent_ids_list.length > 0 && /* @__PURE__ */ h(Button, {
    value: "Use current selection",
    onClick: () => {
      props.set_ids({direction: "to", ids: props.selected_wcomponent_ids_list});
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null));
}
export const FindAllCausalPaths = connector(_FindAllCausalPaths);
