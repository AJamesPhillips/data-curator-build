export function clean_VAP_set_for_counterfactual(VAP_set) {
  const shared_entry_values = {
    ...VAP_set.shared_entry_values,
    conviction: 1
  };
  const entries = VAP_set.entries.map((entry) => {
    return {...entry, probability: 0, relative_probability: 0, conviction: 1};
  });
  const first_entry = entries[0];
  let target_VAP_id = void 0;
  if (first_entry) {
    first_entry.probability = 1;
    target_VAP_id = first_entry.id;
  }
  return {...VAP_set, shared_entry_values, entries, target_VAP_id};
}
