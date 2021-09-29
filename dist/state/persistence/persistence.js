import {controls_persist} from "../controls/persistance.js";
import {creation_context_persist} from "../creation_context/persistance.js";
import {display_options_persist} from "../display_options/persistance.js";
import {filter_context_persist} from "../filter_context/persistance.js";
import {search_persist} from "../search/persistance.js";
import {sync_persist} from "../sync/persistance.js";
import {user_info_persist} from "../user_info/persistance.js";
export function persist_relevant_state(state) {
  creation_context_persist(state);
  controls_persist(state);
  display_options_persist(state);
  filter_context_persist(state);
  search_persist(state);
  sync_persist(state);
  user_info_persist(state);
}
