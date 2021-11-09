import {ACTIONS} from "../actions.js";
export function conditional_ctrl_f_search(store, e) {
  if (e.ctrl_key && e.key === "f") {
    const state = store.getState();
    const showing_side_panel = state.controls.display_side_panel;
    if (!showing_side_panel) {
      store.dispatch(ACTIONS.controls.toggle_display_side_panel());
    }
    const on_search_page = state.routing.route === "search";
    if (!on_search_page) {
      store.dispatch(ACTIONS.routing.change_route({route: "search"}));
    }
  }
}
