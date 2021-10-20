import {sentence_case} from "../../shared/utils/sentence_case.js";
export function value_possibility_options(value_possibilities, default_options) {
  return value_possibilities === void 0 ? default_options : Object.values(value_possibilities).map(({value}) => ({id: value, title: sentence_case(value)}));
}
