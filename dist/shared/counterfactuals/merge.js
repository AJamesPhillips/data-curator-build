export function merge_counterfactual_into_VAP(VAP, counterfactual) {
  if (!counterfactual)
    return {...VAP, is_counterfactual: false};
  const cf_probability = counterfactual && counterfactual.probability;
  const cf_conviction = counterfactual && counterfactual.conviction;
  const probability = cf_probability !== void 0 ? cf_probability : VAP.probability;
  const conviction = cf_conviction !== void 0 ? cf_conviction : VAP.conviction;
  const cf = cf_probability !== void 0 || cf_conviction !== void 0;
  return {...VAP, probability, conviction, is_counterfactual: cf};
}
export function merge_counterfactuals_into_VAPs(VAPs, VAP_counterfactuals_map) {
  return VAPs.map((VAP) => {
    const counterfactual = VAP_counterfactuals_map && VAP_counterfactuals_map[VAP.id];
    return merge_counterfactual_into_VAP(VAP, counterfactual);
  });
}
export function merge_all_counterfactuals_into_all_VAPs(all_VAPs, VAP_counterfactuals_maps) {
  const one_map = Object.assign({}, ...VAP_counterfactuals_maps);
  return merge_counterfactuals_into_VAPs(all_VAPs, one_map);
}
