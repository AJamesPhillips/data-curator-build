import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
const map_state = (state) => ({
  knowledge_views: state.derived.knowledge_views,
  nested_knowledge_view_ids_map: state.derived.nested_knowledge_view_ids.map
});
const connector = connect(map_state);
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
    on_change,
    force_editable: props.force_editable
  });
}
export const SelectKnowledgeView = connector(_SelectKnowledgeView);
