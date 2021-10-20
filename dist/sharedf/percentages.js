import {bounded} from "../shared/utils/bounded.js";
export function ratio_to_percentage_string(value) {
  if (value === void 0)
    return "";
  const percent = bounded(value, 0, 1) * 100;
  return percent.toPrecision(percent < 98 ? 2 : 3).replace(/\.0$/, "");
}
