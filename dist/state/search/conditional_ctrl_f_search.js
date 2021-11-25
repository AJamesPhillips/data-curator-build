import {ACTIONS} from "../actions.js";
export function conditional_ctrl_f_search(store, e) {
  if (e.ctrl_key && e.key === "f") {
    e.event.preventDefault();
    store.dispatch(ACTIONS.routing.change_route({route: "search"}));
  }
}
