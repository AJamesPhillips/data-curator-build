import {test} from "../../shared/utils/test.js";
import {uuid_v4_for_tests} from "../../utils/uuid_v4_for_tests.js";
import {uuids_regex} from "./id_regexs.js";
import {format_wcomponent_id_error, format_wcomponent_link} from "./templates.js";
export function replace_normal_ids(text, current_depth, args) {
  const {root_url, depth_limit, get_title, render_links} = args;
  const ids = get_ids_from_text(text);
  ids.forEach((id) => {
    const replacer = new RegExp(`@@${id}`, "g");
    const referenced_wcomponent = args.wcomponents_by_id[id];
    if (!referenced_wcomponent) {
      text = text.replace(replacer, format_wcomponent_id_error(root_url, id, "not found"));
      return;
    }
    const replacement_content = current_depth < depth_limit ? get_title(referenced_wcomponent) : `@@${id}`;
    const replacement_text = render_links ? format_wcomponent_link(root_url, id, replacement_content) : replacement_content;
    text = text.replace(replacer, replacement_text);
  });
  return text;
}
function get_ids_from_text(text) {
  const matches = [...text.matchAll(uuids_regex)];
  return matches.map((entry) => entry[1].slice(2));
}
function test_get_ids_from_text() {
  console.log("running tests of get_ids_from_text");
  let ids = get_ids_from_text("asd @@wc123 asd name@example.com #label dfg @@345 sf");
  test(ids, [], `Should not find old ids of "wc123", "345"`);
  const id1 = uuid_v4_for_tests(1);
  const id2 = uuid_v4_for_tests(2);
  ids = get_ids_from_text(`asd @@${id1} asd name@example.com #label dfg @@${id2} sf`);
  test(ids, [id1, id2], `Should find uuid ids`);
  ids = get_ids_from_text("");
  test(ids, []);
}
function run_tests() {
  test_get_ids_from_text();
}
