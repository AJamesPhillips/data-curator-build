import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
export function get_VAPs_ordered_by_prob(VAPs, VAPs_represent) {
  const first_VAP = VAPs[0];
  if (VAPs_represent === VAPsType.boolean && first_VAP)
    return [first_VAP];
  return VAPs.sort((a, b) => a.probability > b.probability ? -1 : a.probability < b.probability ? 1 : 0);
}
