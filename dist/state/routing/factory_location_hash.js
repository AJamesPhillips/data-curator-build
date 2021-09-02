import {throttle} from "../../utils/throttle.js";
import {ACTIONS} from "../actions.js";
import {merge_route_params_prioritising_url_over_state, routing_state_to_string} from "./routing.js";
export const factory_location_hash = (store) => {
  let routing_state;
  const throttled_update_location_hash = factory_throttled_update_location_hash();
  record_location_hash_change(store);
  function store_subscriber_to_update_location_hash() {
    const state = store.getState();
    if (state.routing === routing_state)
      return;
    const changed_only_xy = calc_changed_only_xy(routing_state, state.routing);
    routing_state = state.routing;
    throttled_update_location_hash(changed_only_xy, state.routing);
  }
  store_subscriber_to_update_location_hash();
  return store_subscriber_to_update_location_hash;
};
function factory_throttled_update_location_hash() {
  const update_location_hash_after_1000 = throttle((routing_state) => {
    const route = routing_state_to_string(routing_state);
    if (window.DEBUG_ROUTING)
      console.log("DELAYED changing route from ", window.location.hash.toString(), "   to:   ", route);
    window.location.hash = route;
  }, 1e3);
  const debounced_update_location_hash = throttle((routing_state) => {
    const route = routing_state_to_string(routing_state);
    if (window.DEBUG_ROUTING)
      console.log("Debounced changing route from ", window.location.hash.toString(), "   to:   ", route);
    window.location.hash = route;
  }, 0);
  return (changed_only_xy, routing_state) => {
    if (changed_only_xy) {
      update_location_hash_after_1000.throttled(routing_state);
    } else {
      update_location_hash_after_1000.cancel();
      debounced_update_location_hash.cancel();
      debounced_update_location_hash.throttled(routing_state);
    }
  };
}
function calc_changed_only_xy(current, next) {
  if (!current || !current.args)
    return false;
  return current.args.x !== next.args.x || current.args.y !== next.args.y;
}
function record_location_hash_change(store) {
  window.onhashchange = (e) => {
    const state = store.getState();
    if (!state.sync.ready_for_reading) {
    } else {
      const route_from_hash = "#" + (e.newURL.split("#")[1] || "");
      const route_from_state = routing_state_to_string(state.routing);
      const no_difference = route_from_state === route_from_hash;
      if (no_difference) {
        if (window.DEBUG_ROUTING)
          console.log("on hash change but no difference to current hash route_from_state", route_from_state);
        return;
      }
      if (window.DEBUG_ROUTING)
        console.log("on hash change difference.  new url is: ", route_from_hash, "   state is:   ", route_from_state);
      store.dispatch(ACTIONS.specialised_object.clear_selected_wcomponents({}));
      const routing_params = merge_route_params_prioritising_url_over_state(e.newURL, state.routing);
      store.dispatch(ACTIONS.routing.change_route(routing_params));
    }
  };
}
