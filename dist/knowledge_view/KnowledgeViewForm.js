import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {get_current_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {factory_get_kv_details, get_all_parent_knowledge_view_ids} from "./common.js";
const map_state = (state) => {
  const knowledge_view = get_current_knowledge_view_from_state(state);
  return {
    knowledge_view,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    knowledge_views: state.derived.knowledge_views,
    nested_knowledge_view_ids: state.derived.nested_knowledge_view_ids,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting,
    current_view: state.routing.args.view,
    current_subview_id: state.routing.args.subview_id
  };
};
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _KnowledgeViewForm(props) {
  const {knowledge_view, upsert_knowledge_view} = props;
  if (!knowledge_view)
    return /* @__PURE__ */ h("div", null, "No knowledge view selected");
  const possible_parent_knowledge_view_options = props.knowledge_views.map((kv) => ({id: kv.id, title: kv.title}));
  const current_kv_parent_ids = get_all_parent_knowledge_view_ids(props.nested_knowledge_view_ids.map, props.current_subview_id);
  const on_change = (knowledge_view2) => upsert_knowledge_view({knowledge_view: knowledge_view2});
  return factory_get_kv_details({
    ...props,
    possible_parent_knowledge_view_options,
    current_kv_parent_ids
  })(knowledge_view, on_change);
}
export const KnowledgeViewForm = connector(_KnowledgeViewForm);
