import {test} from "../../utils/test.js";
import {old_ids_regex, uuids_regex} from "./id_regexs.js";
import {format_wcomponent_id_error, format_wcomponent_link} from "./templates.js";
export function replace_normal_ids(text, wcomponents_by_id, depth_limit, current_depth, render_links, root_url, get_title) {
  const ids = get_ids_from_text(text);
  ids.forEach((id) => {
    const replacer = new RegExp(`@@${id}`, "g");
    const referenced_wcomponent = wcomponents_by_id[id];
    if (!referenced_wcomponent) {
      text = text.replace(replacer, format_wcomponent_id_error("not found", id));
      return;
    }
    const replacement_content = current_depth < depth_limit ? get_title(referenced_wcomponent) : `@@${id}`;
    const replacement_text = render_links ? format_wcomponent_link(root_url, id, replacement_content) : replacement_content;
    text = text.replace(replacer, replacement_text);
  });
  return text;
}
function get_ids_from_text(text) {
  const matches = [...text.matchAll(uuids_regex), ...text.matchAll(old_ids_regex)];
  return matches.map((entry) => entry[1].slice(2));
}
function test_get_ids_from_text() {
  console.log("running tests of get_ids_from_text");
  let ids = get_ids_from_text("asd @@wc123 asd name@example.com #label dfg @@345 sf");
  test(ids, ["wc123", "345"]);
  ids = get_ids_from_text("");
  test(ids, []);
}
function run_tests() {
  test_get_ids_from_text();
}
