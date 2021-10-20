export function wcomponent_type_to_text(type) {
  if (type === "counterfactualv2")
    return "counterfactual";
  if (type === "statev2")
    return "state";
  return type.replaceAll("_", " ");
}
