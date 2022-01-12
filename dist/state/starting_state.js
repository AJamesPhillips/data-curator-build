import {controls_starting_state} from "./controls/persistance.js";
import {creation_context_starting_state} from "./creation_context/persistance.js";
import {get_derived_starting_state} from "./derived/starting_state.js";
import {display_options_starting_state} from "./display_options/persistance.js";
import {filter_context_starting_state} from "./filter_context/persistance.js";
import {get_global_keys_starting_state} from "./global_keys/state.js";
import {view_priorities_starting_state} from "./priorities/persistance.js";
import {get_routing_starting_state} from "./routing/starting_state.js";
import {search_starting_state} from "./search/persistance.js";
import {get_meta_wcomponents_starting_state} from "./specialised_objects/meta_wcomponents/starting_state.js";
import {get_specialised_objects_starting_state} from "./specialised_objects/starting_state.js";
import {sync_starting_state} from "./sync/persistance.js";
import {user_activity_starting_state} from "./user_activity/starting_state.js";
import {user_info_starting_state} from "./user_info/persistance.js";
export function get_starting_state(load_state_from_storage) {
  const routing = get_routing_starting_state();
  const {storage_location} = routing.args;
  const user_info = user_info_starting_state({load_state_from_storage, storage_location});
  const starting_state = {
    controls: controls_starting_state({storage_location}),
    creation_context: creation_context_starting_state(),
    filter_context: filter_context_starting_state(),
    specialised_objects: get_specialised_objects_starting_state(),
    last_action: void 0,
    display_options: display_options_starting_state(),
    sync: sync_starting_state(),
    routing,
    global_keys: get_global_keys_starting_state(),
    meta_wcomponents: get_meta_wcomponents_starting_state(),
    search: search_starting_state(),
    user_activity: user_activity_starting_state(),
    user_info,
    view_priorities: view_priorities_starting_state(),
    derived: get_derived_starting_state()
  };
  return starting_state;
}
