import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {remove_from_list_by_predicate} from "../utils/list.js";
import {SelectKnowledgeView} from "./SelectKnowledgeView.js";
const map_state = (state) => ({
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _FoundationKnowledgeViewsList(props) {
  const {owner_knowledge_view, knowledge_views_by_id, on_change, editing} = props;
  const foundation_knowledge_view_ids = owner_knowledge_view.foundation_knowledge_view_ids || [];
  const foundation_knowledge_view_ids_set = new Set(foundation_knowledge_view_ids);
  const foundation_knowledge_views = [];
  const unfound_ids = [];
  foundation_knowledge_view_ids.forEach((id) => {
    const kv = knowledge_views_by_id[id];
    if (kv)
      foundation_knowledge_views.push(kv);
    else
      unfound_ids.push(id);
  });
  if (unfound_ids.length)
    console.warn(`Unfounded foundational knowledge view ids: ${unfound_ids.join(", ")}`);
  const exclude_ids = new Set(foundation_knowledge_view_ids_set);
  exclude_ids.add(owner_knowledge_view.id);
  const total = foundation_knowledge_views.length;
  return /* @__PURE__ */ h("div", null, editing ? "Foundational Views" : foundation_knowledge_views.length > 0 && "Foundations", editing && /* @__PURE__ */ h("span", null, "(", total, ")"), editing && /* @__PURE__ */ h(SelectKnowledgeView, {
    placeholder: "Search for knowledge view to add...",
    exclude_ids,
    on_change: (id) => {
      if (!id)
        return;
      on_change([id, ...foundation_knowledge_view_ids]);
    }
  }), foundation_knowledge_views.map((foundation_knowledge_view, index) => {
    return /* @__PURE__ */ h("div", {
      style: {display: "flex", flexDirection: "row"},
      key: foundation_knowledge_view.id
    }, /* @__PURE__ */ h("div", {
      style: {flex: "1"}
    }, total - index), /* @__PURE__ */ h("div", {
      style: {flex: "9"}
    }, foundation_knowledge_view.title), /* @__PURE__ */ h("div", {
      style: {flex: "3"}
    }, editing && /* @__PURE__ */ h(Button, {
      value: "remove",
      onClick: () => {
        on_change(remove_from_list_by_predicate(foundation_knowledge_view_ids, (id) => id === foundation_knowledge_view.id));
      }
    })));
  }), unfound_ids.length > 0 && /* @__PURE__ */ h("div", null, "Could not find ", unfound_ids.length, " knowledge views"));
}
export const FoundationKnowledgeViewsList = connector(_FoundationKnowledgeViewsList);
