export function is_counterfactual_active(counterfactual) {
  const cf_probability = counterfactual && counterfactual.probability;
  const cf_conviction = counterfactual && counterfactual.conviction;
  return cf_probability !== void 0 || cf_conviction !== void 0;
}
