import {test} from "../../../shared/utils/test.js";
import {get_default_field_merger, merge_base_object} from "./merge_data.js";
import {get_new_knowledge_view_object} from "../../../knowledge_view/create_new_knowledge_view.js";
export function merge_knowledge_view(args) {
  return merge_base_object({...args, get_custom_field_merger});
}
function get_custom_field_merger(field) {
  if (field !== "wc_id_map")
    return void 0;
  function are_equal(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return (args) => {
    const source_of_truth_value = args.source_of_truth_value.wc_id_map;
    const current_value = args.current_value.wc_id_map;
    const last_source_of_truth_value = args.last_source_of_truth_value.wc_id_map;
    let needs_save = false;
    let unresolvable_conflict = false;
    let value;
    if (args.update_successful || are_equal(source_of_truth_value, last_source_of_truth_value)) {
      value = current_value;
      needs_save = !are_equal(current_value, source_of_truth_value);
    } else {
      value = source_of_truth_value;
      if (!are_equal(current_value, last_source_of_truth_value)) {
        const wc_ids = Array.from(new Set(Object.keys(current_value).concat(Object.keys(source_of_truth_value))));
        wc_ids.forEach((wc_id) => {
          const merge = get_default_field_merger(wc_id)({
            source_of_truth_value,
            current_value,
            last_source_of_truth_value,
            update_successful: args.update_successful
          });
          value[wc_id] = merge.value;
          if (merge.unresolvable_conflict) {
            console.log("unresolvable_conflict in wc_id_map with wc_id: ", wc_id, "last_source_of_truth_value", last_source_of_truth_value[wc_id], "source_of_truth_value", source_of_truth_value[wc_id], "current_value", current_value[wc_id]);
          }
          needs_save = needs_save || merge.needs_save;
          unresolvable_conflict = unresolvable_conflict || merge.unresolvable_conflict;
        });
      }
    }
    return {needs_save, unresolvable_conflict, value};
  };
}
function run_tests() {
  const dt1 = new Date("2021-01-01");
  const latest_modified_at = new Date("2021-02-02");
  function dt_ms(date, warn_when_undefined = true) {
    if (!date && warn_when_undefined) {
      throw new Error("Datetime is undefined.  Set warn_when_undefined = false?");
    }
    return date ? date.getTime() : void 0;
  }
  const e = (position) => ({left: position, top: position});
  test_should_handle_adding_entry_on_client();
  test_should_handle_adding_entries_on_client_and_remote();
  test_should_handle_nonconflicting_changing_different_entries_on_client_and_remote();
  test_should_handle_conflict_changing_same_entries_on_client_and_remote();
  test_should_handle_resolveable_conflict_changing_same_entries_on_client_and_remote();
  test_should_handle_non_and_conflict_changes_and_second_client_change();
  function test_should_handle_adding_entry_on_client() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(1)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(1)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {0: e(1)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: true
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(1)});
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_adding_entries_on_client_and_remote() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(1)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(1)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {2: e(3)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(1), 2: e(3)});
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_nonconflicting_changing_different_entries_on_client_and_remote() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {0: e(1), 2: e(3)},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(4), 2: e(3)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(4), 2: e(3)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {0: e(1), 2: e(5)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(4), 2: e(5)});
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_conflict_changing_same_entries_on_client_and_remote() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {0: e(1)},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(3)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(4)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {0: e(2)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(2)});
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, ["wc_id_map"]);
  }
  function test_should_handle_resolveable_conflict_changing_same_entries_on_client_and_remote() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {0: e(1)},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(2)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(3)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {0: e(2)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(2)});
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_non_and_conflict_changes_and_second_client_change() {
    const last_source_of_truth_value = get_new_knowledge_view_object({
      wc_id_map: {0: e(1)},
      modified_at: dt1,
      base_id: 0
    });
    const current_value = {...last_source_of_truth_value, wc_id_map: {0: e(4), 1: e(10)}, needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth_value, wc_id_map: {0: e(3), 1: e(10)}};
    const source_of_truth_value = {...last_source_of_truth_value, wc_id_map: {0: e(2)}, modified_at: latest_modified_at};
    const merge = merge_knowledge_view({
      last_source_of_truth_value,
      current_value,
      source_of_truth_value,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.wc_id_map, {0: e(2), 1: e(10)});
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, ["wc_id_map"]);
  }
}
