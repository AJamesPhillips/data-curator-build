import {test} from "../shared/utils/test.js";
import {merge_pattern_into_core_object} from "../state/objects/objects.js";
import {
  is_value_attribute
} from "../state/State.js";
import {get_store} from "../state/store.js";
let store;
export function object_content({object, depth}) {
  if (object.is_rendered)
    return object.rendered;
  if (!store)
    store = get_store();
  return render_object({object, state: store.getState(), depth});
}
export function render_object(args) {
  if (args.object.is_rendered)
    return args.object.rendered;
  const depth = args.depth === void 0 ? 3 : args.depth;
  let content = args.object.content;
  if (!content.startsWith("@@"))
    return content;
  const rendered_content = render_content(args.state, content, args.object.attributes, depth);
  return rendered_content.trim() ? rendered_content : "?";
}
function render_content(state, content, attributes, depth) {
  if (depth <= 0)
    return content;
  content = content.slice(2);
  const reg_content = /(.*?)c\((?:([\d\.]+)(,[^\)]+)?)\).*?/g;
  if (!content.match(reg_content))
    return content;
  let rendered_content = "";
  --depth;
  const iter = content.matchAll(reg_content);
  if (2 > 1)
    console.error(`render_content function is deprecated`);
  return rendered_content;
}
function attribute_content(state, attribute_index_lookup, attributes, depth) {
  const {matching_attributes, parts} = get_attributes_from_compound_index_lookup(attribute_index_lookup, attributes);
  return get_content_from_attributes(state, matching_attributes, parts, depth);
}
function get_attributes_from_compound_index_lookup(attribute_index_lookup, attributes) {
  const parts = attribute_index_lookup.split(".").map((i) => parseInt(i));
  const matching_attributes = get_attributes_by_index_lookup(parts[0], attributes);
  return {matching_attributes, parts: parts.slice(1)};
}
export function get_attributes_by_index_lookup(attribute_index, attributes) {
  const matching_attributes = attributes.filter(({pidx}) => pidx === attribute_index);
  return matching_attributes;
}
export function get_attribute_by_index_lookup(attribute_index, attributes) {
  const matching_attributes = attributes.filter(({pidx}) => pidx === attribute_index);
  if (matching_attributes.length > 1)
    console.warn(`More than 1 attribute for: ${attribute_index}`);
  return matching_attributes[0];
}
function get_content_from_attributes(state, attributes, parts, depth) {
  return attributes.map((a) => get_content_from_attribute(state, a, parts, depth)).join(", ");
}
function get_content_from_attribute(state, attribute, parts, depth) {
  if (parts.length) {
    if (is_value_attribute(attribute) || !attribute.id)
      return "?";
  } else {
    if (is_value_attribute(attribute))
      return attribute.value || "";
    const res2 = convert_id_to_content(state, attribute.id);
    if (typeof res2 === "string")
      return res2;
  }
  const res = convert_id_to_content(state, attribute.id);
  if (typeof res === "string")
    return res;
  const content = parts.length ? `@@c(${parts.join(".")})` : res.content;
  return render_content(state, content, res.attributes, depth);
}
function convert_id_to_content(state, item_id) {
  const statement = state.statements.find(({id}) => id === item_id);
  if (statement)
    return statement.content;
  const object = state.objects.find(({id}) => id === item_id);
  if (!object)
    return "?";
  return object;
}
function get_pattern_for_test(args) {
  return {
    id: "p1",
    name: "Pattern",
    datetime_created: new Date(),
    content: "abc",
    attributes: [],
    ...args
  };
}
function get_object_for_test(args, patterns) {
  const core_object = {
    id: "o1",
    datetime_created: new Date(),
    attributes: [],
    labels: [],
    external_ids: {},
    pattern_id: "p1",
    ...args
  };
  const object = merge_pattern_into_core_object({patterns, object: core_object});
  return {...object, rendered: "", is_rendered: false};
}
function run_tests() {
  setTimeout(_run_tests, 0);
}
function _run_tests() {
  console.log("running tests of object_content");
  if (!store)
    store = get_store();
  const initial_state = store.getState();
  const datetime_created = new Date();
  const statement = {id: "1", datetime_created, content: "stat1", labels: []};
  let patterns = [{id: "p1", content: "abc"}].map(get_pattern_for_test);
  const obj1 = get_object_for_test({pattern_id: "p1"}, patterns);
  const res1 = object_content({object: obj1});
  test(res1, "abc");
  patterns = [{id: "p2", content: "@@abc(0) c(1)"}].map(get_pattern_for_test);
  store = get_store({use_cache: false, override_preloaded_state: {statements: [statement], patterns: [], objects: []}});
  const obj2 = get_object_for_test({pattern_id: "p2", attributes: [
    {pidx: 0, value: " val"},
    {pidx: 0, id: "1"}
  ]}, patterns);
  const res2 = object_content({object: obj2});
  test(res2, "ab val stat1");
  test(res2, "ab val, stat1 ");
  patterns = [
    {id: "p30", content: "@@a c(0) c(1)"},
    {id: "p31", content: "@@b c(0)"}
  ].map(get_pattern_for_test);
  const obj3 = get_object_for_test({id: "o3", pattern_id: "p30", attributes: [
    {pidx: 0, value: "val2"},
    {pidx: 1, id: "1"}
  ]}, patterns);
  const obj3b = get_object_for_test({pattern_id: "p31", attributes: [
    {pidx: 0, id: "o3"}
  ]}, patterns);
  store = get_store({use_cache: false, override_preloaded_state: {statements: [statement], patterns: [], objects: [obj3]}});
  const res3a = object_content({object: obj3b});
  test(res3a, "b a val2 stat1");
  const res3b = object_content({object: obj3b, depth: 1});
  test(res3b, "b @@a c(0) c(1)");
  const res3c = object_content({object: obj3b, depth: 0});
  test(res3c, "@@b c(0)");
  patterns = [
    {id: "p40", content: "@@c c(0) c(1)"},
    {id: "p41", content: "@@b c(0)"},
    {id: "p42", content: "@@a c(0)"}
  ].map(get_pattern_for_test);
  const obj4 = get_object_for_test({id: "o4", pattern_id: "p40", attributes: [
    {pidx: 0, value: "val2"},
    {pidx: 1, id: "1"}
  ]}, patterns);
  const obj4b = get_object_for_test({id: "o5", pattern_id: "p41", attributes: [
    {pidx: 0, id: "o4"}
  ]}, patterns);
  const obj4c = get_object_for_test({pattern_id: "p42", attributes: [
    {pidx: 0, id: "o5"}
  ]}, patterns);
  store = get_store({use_cache: false, override_preloaded_state: {statements: [statement], patterns: [], objects: [obj4, obj4b]}});
  const res4a = object_content({object: obj4c, depth: 3});
  test(res4a, "a b c val2 stat1");
  patterns = [
    {id: "p50", content: "@@sub: c(0)"},
    {id: "p51", content: "@@a c(0.0)"}
  ].map(get_pattern_for_test);
  const obj5a = get_object_for_test({id: "o5", pattern_id: "p50", attributes: [
    {pidx: 0, value: "o5 val"}
  ]}, patterns);
  const obj5b = get_object_for_test({pattern_id: "p51", attributes: [
    {pidx: 0, id: "o5"}
  ]}, patterns);
  store = get_store({use_cache: false, override_preloaded_state: {statements: [statement], patterns: [], objects: [obj5a]}});
  const res5 = object_content({object: obj5b});
  test(res5, "a o5 val");
  patterns = [
    {id: "p60", content: "@@c c(0) c(1)"},
    {id: "p61", content: "@@part1: c(0.0) part2: c(0.1)"},
    {id: "p62", content: "@@a c(0)"}
  ].map(get_pattern_for_test);
  const obj6 = get_object_for_test({id: "o4", pattern_id: "p60", attributes: [
    {pidx: 0, value: "val2"},
    {pidx: 1, id: "1"}
  ]}, patterns);
  const obj6b = get_object_for_test({id: "o5", pattern_id: "p61", attributes: [
    {pidx: 0, id: "o4"}
  ]}, patterns);
  const obj6c = get_object_for_test({pattern_id: "p62", attributes: [
    {pidx: 0, id: "o5"}
  ]}, patterns);
  store = get_store({use_cache: false, override_preloaded_state: {statements: [statement], patterns: [], objects: [obj6, obj6b]}});
  const res6 = object_content({object: obj6c, depth: 3});
  test(res6, "a part1: val2 part2: stat1");
  store = get_store({use_cache: false, override_preloaded_state: initial_state});
}
