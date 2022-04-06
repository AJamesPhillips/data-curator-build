import {parse_knowledge_view} from "./parse_knowledge_view.js";
import {parse_wcomponent} from "./parse_wcomponent.js";
export function parse_specialised_objects_fromto_server(data) {
  const expected_specialised_object_keys = new Set([
    "wcomponents",
    "knowledge_views"
  ]);
  let wcomponents = [];
  let knowledge_views = [];
  if (data) {
    delete data.wcomponent_ids_to_delete;
    const data_keys = Object.keys(data);
    const extra = data_keys.filter((k) => !expected_specialised_object_keys.has(k));
    if (extra.length)
      throw new Error(`Unexpected keys "${extra.join(", ")}" in specialised objects state`);
    const missing = Array.from(expected_specialised_object_keys).filter((k) => !data.hasOwnProperty(k));
    if (missing.length)
      throw new Error(`Expected keys "${missing.join(", ")}" missing in specialised objects state`);
    wcomponents = data.wcomponents.map(parse_wcomponent);
    const wcomponent_ids = new Set(wcomponents.map(({id}) => id));
    knowledge_views = data.knowledge_views.map((kv) => parse_knowledge_view(kv, wcomponent_ids, true));
  }
  const specialised_objects = {
    wcomponents,
    knowledge_views
  };
  return specialised_objects;
}
