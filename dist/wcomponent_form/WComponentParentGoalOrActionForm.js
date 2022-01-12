import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {FormControl, FormLabel} from "../../snowpack/pkg/@material-ui/core.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
const map_state = (state) => {
  return {
    allowed_wcomponent_ids: state.derived.wcomponent_ids_by_type.goal_or_action,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    is_editing: !state.display_options.consumption_formatting,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const connector = connect(map_state);
function _WComponentParentGoalOrActionForm(props) {
  const {wcomponent, upsert_wcomponent} = props;
  const wcomponent_id_options = get_wcomponent_search_options({
    allowed_wcomponent_ids: props.allowed_wcomponent_ids,
    wcomponents_by_id: props.wcomponents_by_id,
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
