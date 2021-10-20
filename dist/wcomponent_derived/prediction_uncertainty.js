export function calc_prediction_is_uncertain({probability, conviction}) {
  return probability > 0 && probability < 1 || conviction !== 1;
}
export function calc_prediction_certainty({probability, conviction}) {
  return Math.min(probability, conviction);
}
