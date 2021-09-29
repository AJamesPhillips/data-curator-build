export function merge_base_object(args) {
  const {
    last_source_of_truth,
    current_value,
    source_of_truth,
    get_custom_field_merger
  } = args;
  let value = {...source_of_truth};
  let needs_save = false;
  let unresolvable_conflicted_fields = [];
  const fields = get_fields(current_value, last_source_of_truth, source_of_truth);
  fields.forEach((field) => {
    const field_merger = get_custom_field_merger(field) || get_default_base_object_field_merger(field);
    const merge = field_merger(args);
    needs_save = needs_save || merge.needs_save;
    if (merge.unresolvable_conflict)
      unresolvable_conflicted_fields.push(field);
    value[field] = merge.value;
  });
  return {value, needs_save, unresolvable_conflicted_fields};
}
function get_fields(...items) {
  const fields_set = new Set();
  items.forEach((item) => {
    Object.keys(item).forEach((field) => {
      fields_set.add(field);
    });
  });
  return Array.from(fields_set);
}
function get_default_base_object_field_merger(field) {
  const always_current_value_fields = new Set([
    "needs_save",
    "saving"
  ]);
  const always_source_of_truth_fields = new Set([
    "id",
    "created_at",
    "modified_at"
  ]);
  function default_field_merger(args) {
    const source_of_truth = args.source_of_truth[field];
    const current_value = args.current_value[field];
    let needs_save = false;
    let unresolvable_conflict = false;
    if (always_current_value_fields.has(field)) {
      return {needs_save, unresolvable_conflict, value: current_value};
    }
    if (always_source_of_truth_fields.has(field)) {
      return {needs_save, unresolvable_conflict, value: source_of_truth};
    }
    return get_default_field_merger(field)(args);
  }
  return default_field_merger;
}
export function get_default_field_merger(field) {
  function are_equal(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  function default_field_merger(args) {
    const source_of_truth = args.source_of_truth[field];
    const current_value = args.current_value[field];
    const last_source_of_truth = args.last_source_of_truth[field];
    let needs_save = false;
    let unresolvable_conflict = false;
    let value;
    if (args.update_successful || are_equal(source_of_truth, last_source_of_truth)) {
      value = current_value;
      needs_save = !are_equal(current_value, source_of_truth);
    } else {
      value = source_of_truth;
      if (!are_equal(current_value, last_source_of_truth)) {
        unresolvable_conflict = !are_equal(current_value, source_of_truth);
        if (unresolvable_conflict) {
          console.log("unresolvable_conflict with field: ", field, "last_source_of_truth", last_source_of_truth, "source_of_truth", source_of_truth, "current_value", current_value);
        }
      }
    }
    return {needs_save, unresolvable_conflict, value};
  }
  return default_field_merger;
}
