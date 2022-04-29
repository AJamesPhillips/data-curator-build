import {get_new_knowledge_view_object} from "../../../knowledge_view/create_new_knowledge_view.js";
import {ACTIONS} from "../../actions.js";
import {ensure_any_knowledge_view_displayed} from "../../routing/utils/ensure_any_knowledge_view_displayed.js";
import {selector_chosen_base_id} from "../../user_info/selector.js";
export function ensure_a_knowledge_view_subscriber(store) {
  return () => {
    const state = store.getState();
    if (!state.sync.ready_for_reading)
      return;
    if (state.derived.knowledge_views.length)
      return;
    const base_id = selector_chosen_base_id(state);
    if (base_id === void 0) {
      console.error("Can not create knowledge view without chosen_base_id");
      return;
    }
    const knowledge_view = get_new_knowledge_view_object({title: "All", base_id}, state.creation_context);
    store.dispatch(ACTIONS.specialised_object.upsert_knowledge_view({knowledge_view}));
    ensure_any_knowledge_view_displayed(store);
  };
}
