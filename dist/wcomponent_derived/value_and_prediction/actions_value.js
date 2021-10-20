import {sentence_case} from "../../shared/utils/sentence_case.js";
import {action_statuses} from "../../wcomponent/interfaces/action.js";
export const ACTION_OPTIONS = action_statuses.map((status) => ({id: status, title: sentence_case(status)}));
