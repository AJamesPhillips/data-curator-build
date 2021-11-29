import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
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
    allowed_ids,
    exclude_ids = new Set(),
    on_change,
    knowledge_views,
    nested_knowledge_view_ids_map
  } = props;
  const options = useMemo(() => {
    const filtered_knowledge_views = filter_knowledge_views(knowledge_views, allowed_ids, exclude_ids);
    return filtered_knowledge_views.map(({id, title}) => {
      let subtitle = "";
      let entry = nested_knowledge_view_ids_map[id];
      while (entry) {
        subtitle = " / " + entry.title + subtitle;
        entry = nested_knowledge_view_ids_map[entry?.parent_id || ""];
      }
      return {id, title, subtitle};
    }).sort((kv1, kv2) => kv1.title < kv2.title ? -1 : 1);
  }, [knowledge_views, allowed_ids, exclude_ids, nested_knowledge_view_ids_map]);
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
function filter_knowledge_views(knowledge_views, allowed_ids, exclude_ids) {
  let filtered_knowledge_views = knowledge_views;
  if (allowed_ids) {
    filtered_knowledge_views = filtered_knowledge_views.filter(({id}) => allowed_ids.has(id));
  }
  if (exclude_ids.size) {
    filtered_knowledge_views = filtered_knowledge_views.filter(({id}) => !exclude_ids.has(id));
  }
  return filtered_knowledge_views;
}
