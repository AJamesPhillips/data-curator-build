import {format_wcomponent_url, format_wcomponent_link} from "./templates.js";
export function replace_function_ids_in_text(text, wcomponents_by_id, depth_limit, current_depth, render_links, root_url, get_title) {
  const functional_ids = get_functional_ids_from_text(text);
  if (functional_ids.length === 0)
    return text;
  functional_ids.forEach(({id, funktion}) => {
    const referenced_wcomponent = wcomponents_by_id[id];
    if (!is_supported_funktion(funktion))
      return;
    if (!referenced_wcomponent)
      return;
    let replacement = "";
    if (funktion === "url")
      replacement = format_wcomponent_url(root_url, id);
    else {
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
    text = replace_function_ids_in_text(text, wcomponents_by_id, depth_limit, current_depth + 1, render_links, root_url, get_title);
  }
  return text;
}
function get_functional_ids_from_text(text) {
  return [...text.matchAll(/.*?(@@\w*\d+)\.([\w]+)/g)].map((entry) => ({id: entry[1].slice(2), funktion: entry[2]}));
}
const _supported_functions = {
  url: true,
  title: true,
  description: true
};
const supported_funktions = new Set(Object.keys(_supported_functions));
function is_supported_funktion(funktion) {
  return supported_funktions.has(funktion);
}
