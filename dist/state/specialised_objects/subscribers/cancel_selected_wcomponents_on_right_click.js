import {ACTIONS} from "../../actions.js";
import {pub_sub} from "../../pub_sub/pub_sub.js";
export function cancel_selected_wcomponents_on_right_click(store) {
  pub_sub.canvas.sub("canvas_right_click", (right_click) => {
    store.dispatch(ACTIONS.meta_wcomponents.clear_selected_wcomponents({}));
    const {route, item_id, sub_route} = store.getState().routing;
    if (route === "wcomponents" && item_id || sub_route === "wcomponents_edit_multiple") {
      store.dispatch(ACTIONS.routing.change_route({route: "wcomponents", sub_route: null, item_id: null}));
    }
  });
}
