import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {get_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_composed_wc_id_map} from "../state/specialised_objects/knowledge_views/derived_reducer.js";
const map_state = (state, own_props) => {
  const knowledge_view = get_knowledge_view_from_state(state, own_props.knowledge_view_id);
  const {wcomponents_by_id, knowledge_views_by_id} = state.specialised_objects;
  return {
    knowledge_view,
    wcomponents_by_id,
    knowledge_views_by_id,
    editing: !state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
function _KnowledgeViewActiveCounterFactuals(props) {
  const {editing, knowledge_view, wcomponents_by_id, knowledge_views_by_id, on_change} = props;
  if (!knowledge_view)
    return /* @__PURE__ */ h("div", null);
  const selected_option_ids = knowledge_view.active_counterfactual_v2_ids || [];
  const wc_id_map = get_composed_wc_id_map(knowledge_view, knowledge_views_by_id);
  const options = Object.keys(wc_id_map).map((id) => wcomponents_by_id[id]).filter(is_defined).filter(({type}) => type === "counterfactualv2").map(({id, title}) => ({id, title}));
  if (editing) {
    if (options.length === 0)
      return /* @__PURE__ */ h("div", null, "No counterfactuals in composed knowledge view (includes foundational knowledge views)");
  } else {
    if (selected_option_ids.length === 0)
      return /* @__PURE__ */ h("div", null, "No assumptions set");
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "...",
    allow_none: true,
    selected_option_ids,
    options,
    on_change
  }));
}
export const KnowledgeViewActiveCounterFactuals = connector(_KnowledgeViewActiveCounterFactuals);
