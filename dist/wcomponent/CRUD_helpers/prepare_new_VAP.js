import {get_new_VAP_id} from "../../shared/utils/ids.js";
import {VAPsType} from "../interfaces/VAPsType.js";
export function prepare_new_VAP() {
  return {
    id: get_new_VAP_id(),
    explanation: "",
    probability: 0,
    conviction: 1,
    value: "",
    description: ""
  };
}
export function set_VAP_probabilities(VAPs, VAPs_represent) {
  const multiple = VAPs.length > 1;
  let total_relative_probability = 0;
  VAPs = VAPs.map((VAP) => {
    const relative_probability = multiple ? VAP.relative_probability === void 0 ? VAP.probability : VAP.relative_probability : void 0;
    if (relative_probability !== void 0)
      total_relative_probability += relative_probability;
    return {...VAP, relative_probability};
  });
  if (VAPs_represent !== VAPsType.boolean) {
    total_relative_probability = total_relative_probability || 1;
    VAPs = VAPs.map((VAP) => {
      const relative_probability = VAP.relative_probability === void 0 ? 1 : VAP.relative_probability;
      const probability = relative_probability / total_relative_probability;
      return {...VAP, probability};
    });
  }
  return VAPs;
}
