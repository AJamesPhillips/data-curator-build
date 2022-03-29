export function merge_base_object(args) {
  const {
    last_source_of_truth_value,
    current_value,
    source_of_truth_value,
    get_custom_field_merger
  } = args;
  let value = {...source_of_truth_value};
  let needs_save = false;
  let unresolvable_conflicted_fields = [];
  const fields = get_fields(current_value, last_source_of_truth_value, source_of_truth_value);
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
    const source_of_truth_field_value = args.source_of_truth_value[field];
    const current_field_value = args.current_value[field];
    let needs_save = false;
    let unresolvable_conflict = false;
    if (always_current_value_fields.has(field)) {
      return {needs_save, unresolvable_conflict, value: current_field_value};
    }
    if (always_source_of_truth_fields.has(field)) {
      return {needs_save, unresolvable_conflict, value: source_of_truth_field_value};
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
    const source_of_truth_field_value = args.source_of_truth_value[field];
    const current_field_value = args.current_value[field];
    const last_source_of_truth_field_value = args.last_source_of_truth_value[field];
    let needs_save = false;
    let unresolvable_conflict = false;
    let value;
    if (args.update_successful || are_equal(source_of_truth_field_value, last_source_of_truth_field_value)) {
      value = current_field_value;
      needs_save = !are_equal(current_field_value, source_of_truth_field_value);
    } else {
      value = source_of_truth_field_value;
      if (!are_equal(current_field_value, last_source_of_truth_field_value)) {
        unresolvable_conflict = !are_equal(current_field_value, source_of_truth_field_value);
        if (unresolvable_conflict) {
          console.log("unresolvable_conflict with field: ", field, "last_source_of_truth_field_value", last_source_of_truth_field_value, "source_of_truth_field_value", source_of_truth_field_value, "current_field_value", current_field_value);
        }
      }
    }
    return {needs_save, unresolvable_conflict, value};
  }
  return default_field_merger;
}
