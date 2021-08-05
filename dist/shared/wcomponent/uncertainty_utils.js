export function get_prob_and_conviction(prediction) {
  let probability = 1;
  let conviction = 1;
  if (prediction) {
    if (prediction.probability !== void 0)
      probability = prediction.probability;
    if (prediction.conviction !== void 0)
      conviction = prediction.conviction;
  }
  return {probability, conviction};
}
export function calc_is_uncertain({probability, conviction}) {
  return probability > 0 && probability < 1 || conviction !== 1;
}
