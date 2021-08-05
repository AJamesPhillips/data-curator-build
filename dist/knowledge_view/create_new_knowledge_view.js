import {get_new_knowledge_view_id, is_wc_knowledge_view_id} from "../shared/utils/ids.js";
import {get_new_created_ats} from "../shared/utils/datetime.js";
import {get_store} from "../state/store.js";
import {ACTIONS} from "../state/actions.js";
export function get_new_knowledge_view_object(args = {}, creation_context) {
  const knowledge_view = {
    id: get_new_knowledge_view_id(),
    ...get_new_created_ats(creation_context),
    title: "",
    description: "",
    wc_id_map: {},
    goal_ids: [],
    sort_type: "normal",
    ...args
  };
  return knowledge_view;
}
export function create_new_knowledge_view(args) {
  const store = args.store || get_store();
  const knowledge_view = get_new_knowledge_view_object(args.knowledge_view, args.creation_context);
  store.dispatch(ACTIONS.specialised_object.upsert_knowledge_view({knowledge_view}));
}
export function navigate_to_knowledge_view_or_kvwcomponent(kv_or_kvwc_id, store) {
  let wc_id = void 0;
  if (is_wc_knowledge_view_id(kv_or_kvwc_id)) {
    wc_id = kv_or_kvwc_id.replace("kv", "");
  }
  store.dispatch(ACTIONS.routing.change_route({
    route: "wcomponents",
    args: {subview_id: kv_or_kvwc_id}
  }));
}
