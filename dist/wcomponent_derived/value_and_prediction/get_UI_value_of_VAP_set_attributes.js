import {ratio_to_percentage_string} from "../../sharedf/percentages.js";
import {VAPsType} from "../../wcomponent/interfaces/VAPsType.js";
import {get_VAPs_ordered_by_prob} from "./get_VAPs_ordered_by_prob.js";
export function get_probable_VAP_set_values(VAP_set, VAPs_represent) {
  const VAPs = get_VAPs_ordered_by_prob(VAP_set.entries, VAPs_represent);
  const first_VAP = VAPs[0];
  if (VAPs_represent === VAPsType.boolean && first_VAP)
    return first_VAP.probability > 0.5 ? "True" : "False";
  const probable_VAPS = VAPs.filter(({probability}) => probability > 0);
  return probable_VAPS.map((e) => e.value).join(", ") || "-";
}
export function get_VAP_set_prob(VAP_set, VAPs_represent) {
  const VAPs = get_VAPs_ordered_by_prob(VAP_set.entries, VAPs_represent);
  const first_VAP = VAPs[0];
  if (VAPs_represent === VAPsType.boolean && first_VAP)
    return ratio_to_percentage_string(first_VAP.probability);
  const probable_VAPS = VAPs.filter(({probability}) => probability > 0);
  return probable_VAPS.map((e) => ratio_to_percentage_string(e.probability)).join(", ");
}
export function get_VAP_set_conviction(VAP_set, VAPs_represent) {
  const VAPs = get_VAPs_ordered_by_prob(VAP_set.entries, VAPs_represent);
  const first_VAP = VAPs[0];
  if (VAPs_represent === VAPsType.boolean && first_VAP)
    return ratio_to_percentage_string(first_VAP.conviction);
  const probable_VAPS = VAPs.filter(({probability}) => probability > 0);
  const convictions = new Set();
  probable_VAPS.forEach(({conviction}) => convictions.add(conviction));
  const same_convictions = convictions.size <= 1;
  return probable_VAPS.slice(0, same_convictions ? 1 : void 0).map((e) => ratio_to_percentage_string(e.conviction)).join(", ");
}
