import {create_links_on_connection_terminal_mouse_events} from "./create_links_on_connection_terminal_mouse_events.js";
import {create_wcomponent_on_double_tap} from "./create_wcomponent_on_double_tap.js";
import {create_wcomponent_on_keyboard} from "./create_wcomponent_on_keyboard.js";
import {cancel_selected_wcomponents_on_right_click} from "./cancel_selected_wcomponents_on_right_click.js";
import {ensure_base_knowledge_view_subscriber} from "./ensure_base_knowledge_view_subscriber.js";
export function specialised_objects_subscribers(store) {
  pub_sub_subscribers(store);
  const c = create_links_on_connection_terminal_mouse_events(store);
  const ensure_base_knowledge_view = ensure_base_knowledge_view_subscriber(store);
  return () => {
    c();
    ensure_base_knowledge_view();
  };
}
function pub_sub_subscribers(store) {
  cancel_selected_wcomponents_on_right_click(store);
  create_wcomponent_on_double_tap(store);
  create_wcomponent_on_keyboard(store);
}
