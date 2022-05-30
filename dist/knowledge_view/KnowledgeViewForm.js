import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {get_current_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {factory_get_kv_details, get_all_parent_knowledge_view_ids} from "./common.js";
const map_state = (state) => {
  const knowledge_view = get_current_knowledge_view_from_state(state);
  return {
    ready_for_reading: state.sync.ready_for_reading,
    knowledge_view,
    knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
    knowledge_views: state.derived.knowledge_views,
    nested_knowledge_view_ids: state.derived.nested_knowledge_view_ids,
    creation_context: state.creation_context,
    editing: !state.display_options.consumption_formatting,
    current_view: state.routing.args.view,
    current_subview_id: state.routing.args.subview_id,
    wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
    chosen_base_id: state.user_info.chosen_base_id,
    bases_by_id: state.user_info.bases_by_id
  };
};
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view,
  update_chosen_base_id: ACTIONS.user_info.update_chosen_base_id
};
const connector = connect(map_state, map_dispatch);
function _KnowledgeViewForm(props) {
  const {knowledge_view, upsert_knowledge_view} = props;
  if (!props.ready_for_reading)
    return /* @__PURE__ */ h("div", null, "Loading...");
  if (!knowledge_view)
    return /* @__PURE__ */ h("div", null, "No knowledge view selected");
  const possible_parent_knowledge_view_ids = useMemo(() => props.knowledge_views.filter((kv) => kv.base_id === props.chosen_base_id).map((kv) => kv.id), [props.knowledge_views]);
  const current_kv_parent_ids = get_all_parent_knowledge_view_ids(props.nested_knowledge_view_ids.map, props.current_subview_id);
  const update_item = (knowledge_view2) => upsert_knowledge_view({knowledge_view: knowledge_view2});
  const crud = {
    create_item: () => {
      throw new Error("Not implemented create knowledge view");
    },
    update_item,
    delete_item: () => {
      throw new Error("Not implemented delete knowledge view");
    }
  };
  return factory_get_kv_details({
    ...props,
    possible_parent_knowledge_view_ids,
    current_kv_parent_ids,
    chosen_base_id: props.chosen_base_id,
    bases_by_id: props.bases_by_id,
    update_chosen_base_id: props.update_chosen_base_id
  })(knowledge_view, crud);
}
export const KnowledgeViewForm = connector(_KnowledgeViewForm);
