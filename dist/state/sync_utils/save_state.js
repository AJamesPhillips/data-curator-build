import {
  is_id_attribute
} from "../State.js";
import {ACTIONS} from "../actions.js";
import {supported_keys} from "./supported_keys.js";
let last_saved = void 0;
export function save_state(dispatch, state) {
  if (!needs_save(state, last_saved))
    return;
  last_saved = state;
  dispatch(ACTIONS.sync.update_sync_status("SAVING"));
  const state_to_save = get_state_to_save(state);
  const state_str = JSON.stringify(state_to_save);
  const specialised_state = get_specialised_state_to_save(state);
  const specialised_state_str = JSON.stringify(specialised_state);
  fetch("http://localhost:4000/api/v1/state/", {
    method: "post",
    body: state_str
  }).then(() => fetch("http://localhost:4000/api/v1/specialised_state/", {
    method: "post",
    body: specialised_state_str
  })).then(() => dispatch(ACTIONS.sync.update_sync_status(void 0)));
}
function needs_save(state, last_saved2) {
  return !last_saved2 || state.statements !== last_saved2.statements || state.patterns !== last_saved2.patterns || state.objects !== last_saved2.objects || state.specialised_objects !== last_saved2.specialised_objects;
}
function get_state_to_save(state) {
  const state_to_save = {
    statements: state.statements,
    patterns: state.patterns,
    objects: state.objects.map(convert_object_to_core)
  };
  Object.keys(state).forEach((k) => {
    if (!supported_keys.includes(k))
      throw new Error(`Unexpected key "${k}" in state to save`);
  });
  return state_to_save;
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
