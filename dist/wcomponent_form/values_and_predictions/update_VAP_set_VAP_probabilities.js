export function update_VAP_set_VAP_probabilities(VAP_set, selected_value_id) {
  return VAP_set.entries.map((VAP) => {
    const probability = VAP.value_id === selected_value_id ? 1 : 0;
    return {
      ...VAP,
      relative_probability: probability,
      probability,
      conviction: 1
    };
  });
}
