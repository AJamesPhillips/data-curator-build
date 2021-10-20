import {test} from "../../../shared/utils/test.js";
import {prepare_new_contextless_wcomponent_object} from "../../../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {merge_base_object} from "./merge_data.js";
export function merge_wcomponent(args) {
  return merge_base_object({...args, get_custom_field_merger});
}
function get_custom_field_merger(field) {
  return void 0;
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
  test_should_handle_update_on_client();
  test_should_handle_nonconflicting_updates();
  test_should_handle_conflicting_updates();
  test_should_handle_multiple_updates_on_client();
  test_should_handle_nonconflicting_updates_with_multiple_client_updates();
  test_should_handle_conflicting_updates_with_multiple_client_updates();
  test_should_handle_non_and_conflicting_updates();
  test_should_handle_non_and_conflicting_updates_with_multiple_client_updates();
  test_should_handle_different_custom_created_at();
  function test_should_handle_update_on_client() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TB", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TB", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: true
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TB");
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_nonconflicting_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      description: "DA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TB", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TA", description: "DX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TB");
    test(merge.value.description, "DX");
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_conflicting_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TB", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TX");
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, ["title"]);
  }
  function test_should_handle_multiple_updates_on_client() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TC", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TB", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: true
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TC");
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_nonconflicting_updates_with_multiple_client_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      description: "DA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TC", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TA", description: "DX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TC");
    test(merge.value.description, "DX");
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, []);
  }
  function test_should_handle_conflicting_updates_with_multiple_client_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TC", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB"};
    const source_of_truth = {...last_source_of_truth, title: "TX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TX");
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, ["title"]);
  }
  function test_should_handle_non_and_conflicting_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      description: "DA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TB", description: "DB", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB", description: "DB"};
    const source_of_truth = {...last_source_of_truth, title: "TA", description: "DX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TB");
    test(merge.value.description, "DX");
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, ["description"]);
  }
  function test_should_handle_non_and_conflicting_updates_with_multiple_client_updates() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      title: "TA",
      description: "DA",
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, title: "TC", description: "DC", needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, title: "TB", description: "DB"};
    const source_of_truth = {...last_source_of_truth, title: "TA", description: "DX", modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: false
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(merge.value.title, "TC");
    test(merge.value.description, "DX");
    test(merge.needs_save, true);
    test(merge.unresolvable_conflicted_fields, ["description"]);
  }
  function test_should_handle_different_custom_created_at() {
    const last_source_of_truth = prepare_new_contextless_wcomponent_object({
      base_id: -1,
      custom_created_at: new Date("2021"),
      modified_at: dt1
    });
    const current_value = {...last_source_of_truth, custom_created_at: new Date("2015"), needs_save: true, saving: true};
    const attempted_update_value = {...last_source_of_truth, custom_created_at: new Date("2015")};
    const source_of_truth = {...last_source_of_truth, custom_created_at: new Date("2015"), modified_at: latest_modified_at};
    const merge = merge_wcomponent({
      last_source_of_truth,
      current_value,
      source_of_truth,
      update_successful: true
    });
    test(dt_ms(merge.value.modified_at), dt_ms(latest_modified_at));
    test(new Date("2021"), new Date("2021"));
    test(merge.value.custom_created_at, new Date("2015"));
    test(merge.needs_save, false);
    test(merge.unresolvable_conflicted_fields, []);
  }
}
