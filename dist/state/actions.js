import {controls_actions} from "./controls/actions.js";
import {creation_context_actions} from "./creation_context/actions.js";
import {display_actions} from "./display_options/actions.js";
import {filter_context_actions} from "./filter_context/actions.js";
import {global_keys_actions} from "./global_keys/actions.js";
import {objectives_actions} from "./objectives.js";
import {object_actions} from "./objects/actions.js";
import {pattern_actions} from "./pattern_actions.js";
import {routing_actions} from "./routing/actions.js";
import {display_at_created_datetime_actions} from "./routing/datetime/display_at_created.js";
import {display_at_sim_datetime_actions} from "./routing/datetime/display_at_sim_datetime.js";
import {specialised_object_actions} from "./specialised_objects/actions.js";
import {statement_actions} from "./statements.js";
import {sync_actions} from "./sync.js";
import {user_activity_actions} from "./user_activity/actions.js";
export const ACTIONS = {
  controls: controls_actions,
  creation_context: creation_context_actions,
  filter_context: filter_context_actions,
  display: display_actions,
  pattern: pattern_actions,
  statement: statement_actions,
  object: object_actions,
  sync: sync_actions,
  routing: routing_actions,
  global_keys: global_keys_actions,
  display_at_created_datetime: display_at_created_datetime_actions,
  display_at_sim_datetime: display_at_sim_datetime_actions,
  objectives: objectives_actions,
  specialised_object: specialised_object_actions,
  user_activity: user_activity_actions
};
