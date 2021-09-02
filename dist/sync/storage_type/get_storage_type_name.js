import {sentence_case} from "../../shared/utils/sentence_case.js";
export function get_storage_type_name(storage_type) {
  if (storage_type === void 0)
    return "None";
  return sentence_case(storage_type.replaceAll("_", " "));
}
