import {Box, Typography} from "../../_snowpack/pkg/@material-ui/core.js";
import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {get_wcomponent_search_options} from "../search/get_wcomponent_search_options.js";
import {ACTIONS} from "../state/actions.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
const map_state = (state, {}) => {
  return {
    ready: state.sync.ready,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    wc_id_counterfactuals_map: get_current_composed_knowledge_view_from_state(state)?.wc_id_counterfactuals_map,
    created_at_ms: state.routing.args.created_at_ms,
    sim_ms: state.routing.args.sim_ms
  };
};
const map_dispatch = {
  set_highlighted_wcomponent: ACTIONS.specialised_object.set_highlighted_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _LabelsEditor(props) {
  const {ready, label_ids = []} = props;
  if (!ready)
    return /* @__PURE__ */ h("div", null, "Loading labels...");
  const wcomponent_id_options = get_wcomponent_search_options({
    wcomponents_by_id: props.wcomponents_by_id,
    wc_id_counterfactuals_map: props.wc_id_counterfactuals_map,
    created_at_ms: props.created_at_ms,
    sim_ms: props.sim_ms
  });
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Typography, {
    component: "h3"
  }, "Labels"), /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "Labels...",
    selected_option_ids: label_ids || [],
    options: wcomponent_id_options,
    allow_none: true,
    on_change: (labels_ids) => {
      props.on_change(labels_ids.filter((id) => !!id));
    },
    on_mouse_over_option: (id) => props.set_highlighted_wcomponent({id, highlighted: true}),
    on_mouse_leave_option: (id) => props.set_highlighted_wcomponent({id, highlighted: false}),
    always_allow_editing: props.always_allow_editing
  }));
}
export const LabelsEditor = connector(_LabelsEditor);
