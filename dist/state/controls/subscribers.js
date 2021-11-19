import {ACTIONS} from "../actions.js";
import {is_change_route} from "../routing/actions.js";
export function controls_subscribers(store) {
  show_side_panel_on_change_route(store);
}
function show_side_panel_on_change_route(store) {
  store.subscribe(() => {
    const state = store.getState();
    const current_route = state.routing.route;
    if (should_display_side_panel(state)) {
      store.dispatch(ACTIONS.controls.set_or_toggle_display_side_panel(true));
    }
  });
}
function should_display_side_panel(state) {
  if (!state.last_action)
    return false;
  const should_display = !state.controls.display_side_panel && is_change_route(state.last_action) && state.last_action.route !== void 0 && (state.last_action.route === "search" || state.last_action.route === "filter");
  return should_display;
}
