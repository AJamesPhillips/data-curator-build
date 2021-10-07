import {ACTIONS} from "../actions.js";
export function conditional_ctrl_f_search(store, e) {
  if (e.ctrl_key && e.key === "f") {
    const state = store.getState();
    const on_search_page = state.routing.route === "search";
    if (!on_search_page) {
      store.dispatch(ACTIONS.routing.change_route({route: "search"}));
    }
  }
}
