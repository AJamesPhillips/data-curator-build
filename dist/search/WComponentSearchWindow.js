import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {get_wcomponent_search_options} from "./get_wcomponent_search_options.js";
import {SearchWindow} from "./SearchWindow.js";
const map_state = (state) => ({
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  wc_id_counterfactuals_map: get_current_composed_knowledge_view_from_state(state)?.wc_id_counterfactuals_map,
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms
});
const connector = connect(map_state);
function _WComponentSearchWindow(props) {
  const options = get_wcomponent_search_options(props);
  return /* @__PURE__ */ h(SearchWindow, {
    search_window_title: "Search for Component",
    placeholder: "WComponent...",
    selected_option_id: "",
    initial_search_term: props.initial_search_term,
    allow_none: true,
    options,
    on_change: (option_id) => props.on_change(option_id),
    on_blur: props.on_blur
  });
}
export const WComponentSearchWindow = connector(_WComponentSearchWindow);
