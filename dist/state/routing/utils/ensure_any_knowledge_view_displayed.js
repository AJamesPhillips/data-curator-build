import {ACTIONS} from "../../actions.js";
export function ensure_any_knowledge_view_displayed(store) {
  const state = store.getState();
  if (!current_knowledge_view_is_valid(state)) {
    const a_knowledge_view = state.derived.knowledge_views[0];
    const a_knowledge_view_id = a_knowledge_view?.id;
    store.dispatch(ACTIONS.routing.change_route({args: {subview_id: a_knowledge_view_id}}));
  }
}
function current_knowledge_view_is_valid(state) {
  const {subview_id} = state.routing.args;
  return !!state.specialised_objects.knowledge_views_by_id[subview_id];
}
