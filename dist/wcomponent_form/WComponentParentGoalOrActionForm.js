import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {FormControl, FormLabel} from "../../snowpack/pkg/@material-ui/core.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {SortDirection, sort_list} from "../shared/utils/sort.js";
import {get_current_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
const map_state = (state) => {
  return {
    current_kv_id: get_current_knowledge_view_from_state(state)?.id,
    goal_or_action_wcomponent_ids: state.derived.wcomponent_ids_by_type.goal_or_action,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    is_editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const connector = connect(map_state);
function _WComponentParentGoalOrActionForm(props) {
  const {wcomponent, wcomponents_by_id, upsert_wcomponent} = props;
  const sorted_goal_or_action_wcomponents = useMemo(() => {
    const goal_or_action_wcomponents = Array.from(props.goal_or_action_wcomponent_ids).map((id) => wcomponents_by_id[id]).filter(is_defined);
    function sort_ids(wc) {
      return wc.id === props.current_kv_id ? new Date().getTime() : wc.created_at.getTime();
    }
    return sort_list(goal_or_action_wcomponents, sort_ids, SortDirection.descending);
  }, [props.goal_or_action_wcomponent_ids, wcomponents_by_id, props.current_kv_id]);
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents: sorted_goal_or_action_wcomponents,
    wcomponents_by_id,
    knowledge_views_by_id: props.knowledge_views_by_id,
    wc_id_to_counterfactuals_map: {},
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h(FormControl, {
    component: "fieldset",
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(FormLabel, {
    component: "legend"
  }, "Parent Goal (or Action)"), /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "Add Label",
    selected_option_ids: wcomponent.parent_goal_or_action_ids || [],
    options: wcomponent_id_options,
    allow_none: true,
    on_change: (labels_ids) => {
      const new_parent_goal_or_action_ids = labels_ids.filter((id) => !!id);
      upsert_wcomponent({
        parent_goal_or_action_ids: new_parent_goal_or_action_ids
      });
    }
  }));
}
export const WComponentParentGoalOrActionForm = connector(_WComponentParentGoalOrActionForm);
