import {sentence_case} from "../../utils/sentence_case.js";
import {action_statuses} from "../interfaces/action.js";
export const ACTION_OPTIONS = action_statuses.map((status) => ({id: status, title: sentence_case(status)}));
