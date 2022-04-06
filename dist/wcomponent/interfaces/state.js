const _wcomponent_statev2_subtypes = {
  boolean: true,
  number: true,
  other: true
};
export const wcomponent_statev2_subtypes = Object.keys(_wcomponent_statev2_subtypes);
export function get_value_attributes(wcomponent) {
  return {
    value_possibilities: wcomponent.value_possibilities,
    values_and_prediction_sets: wcomponent.values_and_prediction_sets
  };
}
