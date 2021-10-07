import {ACTIONS} from "../../actions.js";
export function sync_storage_location_subscriber(store) {
  const starting_state = store.getState();
  let {chosen_base_id: base_id} = starting_state.user_info;
  store.subscribe(() => {
    const state = store.getState();
    const {chosen_base_id: new_base_id} = state.user_info;
    const {storage_location: new_routing_args_storage_location} = state.routing.args;
    if (new_routing_args_storage_location === void 0) {
      if (new_routing_args_storage_location !== new_base_id) {
        console.log(`Change storage_location in route to "${new_base_id}" as nothing was set`);
        store.dispatch(ACTIONS.routing.change_route({args: {storage_location: new_base_id}}));
      }
    } else if (new_routing_args_storage_location !== new_base_id) {
      if (base_id !== new_base_id) {
        store.dispatch(ACTIONS.routing.change_route({args: {storage_location: new_base_id}}));
      } else {
        store.dispatch(ACTIONS.user_info.update_chosen_base_id({base_id: new_routing_args_storage_location}));
      }
    }
    base_id = new_base_id;
  });
}
