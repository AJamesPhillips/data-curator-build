import {ACTIONS} from "../../actions.js";
import {pub_sub} from "../../pub_sub/pub_sub.js";
export function cancel_selected_wcomponents_on_right_click(store) {
  pub_sub.canvas.sub("canvas_right_click", (right_click) => {
    store.dispatch(ACTIONS.specialised_object.clear_selected_wcomponents({}));
    store.dispatch(ACTIONS.routing.change_route({route: "wcomponents", sub_route: null, item_id: null}));
  });
}
