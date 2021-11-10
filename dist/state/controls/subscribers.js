import {ACTIONS} from "../actions.js";
import {is_change_route} from "../routing/actions.js";
export function controls_subscribers(store) {
  show_side_panel_on_change_route(store);
}
function show_side_panel_on_change_route(store) {
  let last_route = store.getState().routing.route;
  store.subscribe(() => {
    const state = store.getState();
    const current_route = state.routing.route;
    const {display_side_panel} = state.controls;
    if (display_side_panel)
      return;
    if (last_route === current_route) {
      if (!state.last_action)
        return;
      if (!is_change_route(state.last_action))
        return;
      if (!state.last_action.route)
        return;
    }
    store.dispatch(ACTIONS.controls.toggle_display_side_panel());
  });
}
