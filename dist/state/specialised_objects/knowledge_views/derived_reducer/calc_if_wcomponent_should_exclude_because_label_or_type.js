import {test} from "../../../../shared/utils/test.js";
import {
  prepare_new_contextless_wcomponent_object
} from "../../../../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
export function calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent, label_filter_args) {
  const {id, label_ids = [], type} = wcomponent;
  const {
    exclude_by_label_ids,
    include_by_label_ids,
    exclude_by_component_types,
    include_by_component_types
  } = label_filter_args;
  const labels__should_exclude = exclude_by_label_ids.has(id) || !!label_ids.find((label_id) => exclude_by_label_ids.has(label_id));
  const labels__lacks_include = include_by_label_ids.size > 0 && (!include_by_label_ids.has(id) && !label_ids.find((label_id) => include_by_label_ids.has(label_id)));
  const types__should_exclude = exclude_by_component_types.has(type);
  const types__lacks_include = include_by_component_types.size > 0 && !include_by_component_types.has(type);
  const should_exclude = labels__should_exclude || types__should_exclude;
  const lacks_include = labels__lacks_include || types__lacks_include;
  return {should_exclude, lacks_include};
}
function run_tests() {
  const wcomponent1 = prepare_new_contextless_wcomponent_object({
    id: "1",
    base_id: 1
  });
  const wcomponent2 = prepare_new_contextless_wcomponent_object({
    id: "2",
    base_id: 1,
    label_ids: [wcomponent1.id]
  });
  const wcomponent3 = prepare_new_contextless_wcomponent_object({
    id: "3",
    base_id: 1,
    label_ids: []
  });
  const label_filter_args__empty = {
    exclude_by_label_ids: new Set(),
    include_by_label_ids: new Set(),
    exclude_by_component_types: new Set(),
    include_by_component_types: new Set()
  };
  const label_filter_args__exclude_1 = {
    exclude_by_label_ids: new Set([wcomponent1.id]),
    include_by_label_ids: new Set(),
    exclude_by_component_types: new Set(),
    include_by_component_types: new Set()
  };
  const label_filter_args__include_1 = {
    exclude_by_label_ids: new Set(),
    include_by_label_ids: new Set([wcomponent1.id]),
    exclude_by_component_types: new Set(),
    include_by_component_types: new Set()
  };
  const label_filter_args__ex_and_include_1 = {
    exclude_by_label_ids: new Set([wcomponent1.id]),
    include_by_label_ids: new Set([wcomponent1.id]),
    exclude_by_component_types: new Set(),
    include_by_component_types: new Set()
  };
  let {should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent2, label_filter_args__empty);
  test(should_exclude, false);
  test(lacks_include, false);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent2, label_filter_args__exclude_1));
  test(should_exclude, true);
  test(lacks_include, false);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent2, label_filter_args__include_1));
  test(should_exclude, false);
  test(lacks_include, false);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent3, label_filter_args__include_1));
  test(should_exclude, false);
  test(lacks_include, true);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent2, label_filter_args__ex_and_include_1));
  test(should_exclude, true);
  test(lacks_include, false);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent1, label_filter_args__exclude_1));
  test(should_exclude, true);
  test(lacks_include, false);
  ({should_exclude, lacks_include} = calc_if_wcomponent_should_exclude_because_label_or_type(wcomponent1, label_filter_args__include_1));
  test(should_exclude, false);
  test(lacks_include, false);
}
run_tests();
