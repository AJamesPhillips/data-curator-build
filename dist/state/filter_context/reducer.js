import {update_substate} from "../../utils/update_state.js";
import {is_set_apply_filter, is_set_filters} from "./actions.js";
export const filter_context_reducer = (state, action) => {
  if (is_set_apply_filter(action)) {
    state = update_substate(state, "filter_context", "apply_filter", action.apply_filter);
  }
  if (is_set_filters(action)) {
    state = update_substate(state, "filter_context", "filters", action.filters);
    const {
      exclude_by_label_ids: e_l,
      include_by_label_ids: i_l,
      exclude_by_component_types: e_t,
      include_by_component_types: i_t
    } = action.filters;
    const any_filters = e_l.length + i_l.length + e_t.length + i_t.length > 0;
    state = update_substate(state, "filter_context", "apply_filter", any_filters);
  }
  return state;
};
