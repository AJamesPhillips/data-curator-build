import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {ACTIONS} from "../state/actions.js";
import {get_all_parent_knowledge_view_ids} from "./common.js";
import {KnowledgeViewListsSet} from "./KnowledgeViewListsSet.js";
const map_state = (state) => ({
  ready: state.sync.ready_for_reading,
  knowledge_views: state.derived.knowledge_views,
  nested_knowledge_view_ids: state.derived.nested_knowledge_view_ids,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  creation_context: state.creation_context,
  current_view: state.routing.args.view,
  current_subview_id: state.routing.args.subview_id,
  editing: !state.display_options.consumption_formatting,
  chosen_base_id: state.user_info.chosen_base_id,
  bases_by_id: state.user_info.bases_by_id
});
const map_dispatch = {
  upsert_knowledge_view: ACTIONS.specialised_object.upsert_knowledge_view,
  update_chosen_base_id: ACTIONS.user_info.update_chosen_base_id
};
const connector = connect(map_state, map_dispatch);
function _TopLevelKnowledgeViewListsSet(props) {
  if (props.knowledge_views.length === 0) {
    return /* @__PURE__ */ h("div", {
      style: {cursor: "progress"}
    }, props.ready ? "Automatically creating a knowledge view..." : "Loading...");
  }
  const possible_parent_knowledge_view_ids = useMemo(() => props.knowledge_views.filter((kv) => kv.base_id === props.chosen_base_id).map((kv) => kv.id), [props.knowledge_views]);
  const knowledge_views = props.nested_knowledge_view_ids.top_ids.map((id) => props.knowledge_views_by_id[id]).filter(is_defined);
  const current_kv_parent_ids = get_all_parent_knowledge_view_ids(props.nested_knowledge_view_ids.map, props.current_subview_id);
  return /* @__PURE__ */ h(KnowledgeViewListsSet, {
    ...props,
    parent_knowledge_view_id: void 0,
    knowledge_views,
    possible_parent_knowledge_view_ids,
    upsert_knowledge_view: props.upsert_knowledge_view,
    current_kv_parent_ids,
    chosen_base_id: props.chosen_base_id,
    bases_by_id: props.bases_by_id,
    update_chosen_base_id: props.update_chosen_base_id
  });
}
export const TopLevelKnowledgeViewListsSet = connector(_TopLevelKnowledgeViewListsSet);
