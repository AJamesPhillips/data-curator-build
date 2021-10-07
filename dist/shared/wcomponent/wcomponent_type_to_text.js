export const DEPRECATED_WCOMPONENT_TYPES = new Set([
  "counterfactual",
  "state",
  "sub_state"
]);
export function wcomponent_type_to_text(type) {
  if (type === "counterfactual")
    return "counterfactualv1";
  if (type === "counterfactualv2")
    return "counterfactual";
  if (type === "state")
    return "statev1";
  if (type === "statev2")
    return "state";
  return type.replaceAll("_", " ");
}
