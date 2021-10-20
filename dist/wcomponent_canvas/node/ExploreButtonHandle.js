import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {
  get_new_knowledge_view_object,
  navigate_to_knowledge_view_or_kvwcomponent
} from "../../knowledge_view/create_new_knowledge_view.js";
import {get_today_str} from "../../shared/utils/date_helpers.js";
import {get_title} from "../../wcomponent_derived/rich_text/get_rich_text.js";
import {ACTIONS} from "../../state/actions.js";
import {get_wc_id_to_counterfactuals_v2_map} from "../../state/derived/accessor.js";
import {get_current_composed_knowledge_view_from_state, get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {get_store} from "../../state/store.js";
const map_state = (state, own_props) => {
  const wcomponent = get_wcomponent_from_state(state, own_props.wcomponent_id);
  const kvwc_id = own_props.wcomponent_id;
  return {
    wcomponent,
    kvwc_id,
    kvwc: state.specialised_objects.knowledge_views_by_id[kvwc_id],
    subview_id: state.routing.args.subview_id,
    nested_knowledge_view_ids_entry: state.derived.nested_knowledge_view_ids.map[kvwc_id],
    presenting: state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _ExploreButtonHandle(props) {
  let {kvwc, is_highlighted, nested_knowledge_view_ids_entry: nested_map} = props;
  const hidden = !kvwc && (props.presenting || !props.presenting && !is_highlighted);
  const is_current_knowledge_view = props.subview_id === props.kvwc_id;
  const parent_knowledge_view_id = nested_map && nested_map.parent_id;
  const current_but_no_parent = is_current_knowledge_view && !parent_knowledge_view_id;
  const class_name = `node_handle explore ` + (hidden ? " hidden " : "") + (kvwc ? " has_nested_knowledge_view " : "") + (current_but_no_parent ? " current_but_no_parent " : "");
  return /* @__PURE__ */ h("span", {
    className: class_name,
    onClick: (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      const store = get_store();
      if (is_current_knowledge_view) {
        if (parent_knowledge_view_id) {
          navigate_to_knowledge_view_or_kvwcomponent(parent_knowledge_view_id, store);
        }
      } else {
        if (!kvwc) {
          const success = prepare_wcomponent_knowledge_view(props, store);
          if (!success)
            return;
          kvwc = success;
          store.dispatch(ACTIONS.specialised_object.upsert_knowledge_view({knowledge_view: kvwc}));
        }
        navigate_to_knowledge_view_or_kvwcomponent(kvwc.id, store);
      }
    }
  }, is_current_knowledge_view ? /* @__PURE__ */ h("span", null, "↑") : /* @__PURE__ */ h("span", null, "🔍"));
}
export const ExploreButtonHandle = connector(_ExploreButtonHandle);
function prepare_wcomponent_knowledge_view(props, store) {
  if (!props.wcomponent_current_kv_entry || !props.wcomponent)
    return false;
  const wc_id_map = {
    [props.wcomponent.id]: props.wcomponent_current_kv_entry
  };
  const state = store.getState();
  const rendered_title = get_title({
    wcomponent: props.wcomponent,
    wc_id_to_counterfactuals_map: get_wc_id_to_counterfactuals_v2_map(state),
    rich_text: true,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  });
  const title = rendered_title || `World Component ${props.wcomponent.id} created: ${get_today_str()}`;
  const current_kv = get_current_composed_knowledge_view_from_state(state);
  const current_kv_id = current_kv && current_kv.id;
  const partial_knowledge_view_wcomponent = {
    id: props.kvwc_id,
    base_id: props.wcomponent.base_id,
    wc_id_map,
    title,
    sort_type: current_kv_id ? "normal" : "hidden",
    parent_knowledge_view_id: current_kv_id
  };
  const {creation_context} = state;
  return get_new_knowledge_view_object(partial_knowledge_view_wcomponent, creation_context);
}
