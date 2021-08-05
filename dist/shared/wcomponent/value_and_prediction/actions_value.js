import {sentence_case} from "../../utils/sentence_case.js";
import {action_statuses, action_statuses_set} from "../interfaces/action.js";
export const ACTION_OPTIONS = action_statuses.map((status) => ({id: status, title: sentence_case(status)}));
function is_valid_action_status(status) {
  return action_statuses_set.has(status);
}
export function get_action_status_of_VAP_set(VAP_set) {
  let status = void 0;
  const conviction = VAP_set.shared_entry_values?.conviction || 0;
  const probability = VAP_set.shared_entry_values?.probability || 0;
  VAP_set.entries.forEach((VAP) => {
    if (Math.max(conviction, VAP.conviction) !== 1)
      return;
    if (Math.max(probability, VAP.probability) !== 1)
      return;
    if (is_valid_action_status(VAP.value))
      status = VAP.value;
  });
  return status;
}
