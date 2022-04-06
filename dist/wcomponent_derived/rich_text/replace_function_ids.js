import {get_wcomponent_state_UI_value} from "../get_wcomponent_state_UI_value.js";
import {old_ids_and_functions_regex, uuids_and_functions_regex} from "./id_regexs.js";
import {format_wcomponent_url, format_wcomponent_link} from "./templates.js";
export function replace_function_ids_in_text(text, current_depth, kwargs) {
  const {get_title, root_url, render_links, depth_limit} = kwargs;
  if (current_depth >= depth_limit)
    return text;
  const functional_ids = get_functional_ids_from_text(text);
  if (functional_ids.length === 0)
    return text;
  functional_ids.forEach(({id, funktion}) => {
    const referenced_wcomponent = kwargs.wcomponents_by_id[id];
    if (!is_supported_funktion(funktion))
      return;
    let replacement = "";
    if (funktion === "map") {
      const referenced_knowledge_view = kwargs.knowledge_views_by_id[id];
      const title = referenced_knowledge_view?.title || id;
      const wcomponent_id = referenced_wcomponent ? id : "";
      replacement = format_wcomponent_link(root_url, wcomponent_id, title, id);
    } else if (!referenced_wcomponent)
      return;
    else if (funktion === "url")
      replacement = format_wcomponent_url(root_url, id);
    else if (funktion === "value") {
      const created_at_ms = new Date().getTime();
      const value = get_wcomponent_state_UI_value({
        wcomponent: referenced_wcomponent,
        VAP_set_id_to_counterfactual_v2_map: {},
        created_at_ms,
        sim_ms: created_at_ms
      });
      replacement = value.values_string;
    } else {
      replacement = render_links ? format_wcomponent_link(root_url, id) : "";
      if (funktion === "title")
        replacement = get_title(referenced_wcomponent);
      else if (funktion === "description")
        replacement += referenced_wcomponent.description;
    }
    const replacer = new RegExp(`@@${id}.${funktion}`, "g");
    text = text.replace(replacer, replacement);
  });
  if (current_depth < depth_limit) {
    text = replace_function_ids_in_text(text, current_depth + 1, kwargs);
  }
  return text;
}
function get_functional_ids_from_text(text) {
  const matches = [
    ...text.matchAll(uuids_and_functions_regex),
    ...text.matchAll(old_ids_and_functions_regex)
  ];
  return matches.map((entry) => ({id: entry[1].slice(2), funktion: entry[2]}));
}
const _supported_functions = {
  url: true,
  title: true,
  description: true,
  map: true,
  value: true
};
const supported_funktions = new Set(Object.keys(_supported_functions));
function is_supported_funktion(funktion) {
  return supported_funktions.has(funktion);
}
