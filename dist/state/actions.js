import {controls_actions} from "./controls/actions.js";
import {creation_context_actions} from "./creation_context/actions.js";
import {display_actions} from "./display_options/actions.js";
import {filter_context_actions} from "./filter_context/actions.js";
import {global_keys_actions} from "./global_keys/actions.js";
import {routing_actions} from "./routing/actions.js";
import {display_at_created_datetime_actions} from "./routing/datetime/display_at_created.js";
import {display_at_sim_datetime_actions} from "./routing/datetime/display_at_sim_datetime.js";
import {search_actions} from "./search/actions_reducer.js";
import {specialised_object_actions} from "./specialised_objects/actions.js";
import {sync_actions} from "./sync/actions.js";
import {user_activity_actions} from "./user_activity/actions.js";
import {user_info_actions} from "./user_info/actions.js";
import {view_priorities_actions} from "./priorities/actions.js";
export const ACTIONS = {
  controls: controls_actions,
  creation_context: creation_context_actions,
  filter_context: filter_context_actions,
  display: display_actions,
  sync: sync_actions,
  routing: routing_actions,
  global_keys: global_keys_actions,
  display_at_created_datetime: display_at_created_datetime_actions,
  display_at_sim_datetime: display_at_sim_datetime_actions,
  search: search_actions,
  specialised_object: specialised_object_actions,
  user_activity: user_activity_actions,
  user_info: user_info_actions,
  view_priorities: view_priorities_actions
};
