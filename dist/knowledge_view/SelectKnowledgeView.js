import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  knowledge_views: state.derived.knowledge_views,
  nested_knowledge_view_ids_map: state.derived.nested_knowledge_view_ids.map
});
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _SelectKnowledgeView(props) {
  const {
    placeholder,
    selected_option_id = void 0,
    exclude_ids = new Set(),
    on_change,
    knowledge_views,
    nested_knowledge_view_ids_map
  } = props;
  const options = knowledge_views.filter(({id}) => !exclude_ids.has(id)).map(({id, title}) => {
    let subtitle = "";
    let entry = nested_knowledge_view_ids_map[id];
    while (entry) {
      subtitle = " / " + entry.title + subtitle;
      entry = nested_knowledge_view_ids_map[entry?.parent_id || ""];
    }
    return {id, title, subtitle};
  }).sort((kv1, kv2) => kv1.title < kv2.title ? -1 : 1);
  return /* @__PURE__ */ h(AutocompleteText, {
    placeholder: placeholder || "Select knowledge view...",
    allow_none: true,
    selected_option_id,
    options,
    on_change
  });
}
export const SelectKnowledgeView = connector(_SelectKnowledgeView);
