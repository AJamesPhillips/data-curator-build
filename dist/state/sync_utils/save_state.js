import {
  is_id_attribute
} from "../State.js";
import {ACTIONS} from "../actions.js";
import {LOCAL_STORAGE_STATE_KEY} from "./supported_keys.js";
import {setItem} from "../../../snowpack/pkg/localforage.js";
let last_saved = void 0;
export function save_state(dispatch, state) {
  if (!needs_save(state, last_saved))
    return;
  last_saved = state;
  dispatch(ACTIONS.sync.update_sync_status("SAVING"));
  const specialised_state = get_specialised_state_to_save(state);
  setItem(LOCAL_STORAGE_STATE_KEY, specialised_state).then(() => dispatch(ACTIONS.sync.update_sync_status(void 0)));
}
function needs_save(state, last_saved2) {
  return !last_saved2 || state.specialised_objects !== last_saved2.specialised_objects;
}
function convert_object_to_core(object) {
  return {
    id: object.id,
    datetime_created: object.datetime_created,
    labels: object.labels,
    attributes: object.attributes.map(convert_attribute_to_core),
    pattern_id: object.pattern_id,
    external_ids: object.external_ids
  };
}
function convert_attribute_to_core(attribute) {
  if (is_id_attribute(attribute)) {
    return {
      pidx: attribute.pidx,
      id: attribute.id
    };
  }
  return {
    pidx: attribute.pidx,
    value: attribute.value
  };
}
function get_specialised_state_to_save(state) {
  const specialised_state = {
    perceptions: state.derived.perceptions,
    wcomponents: state.derived.wcomponents,
    knowledge_views: state.derived.knowledge_views
  };
  return specialised_state;
}
