import {safe_merge} from "../../../utils/object.js";
import {find_all_causal_paths_actions} from "./find_all_causal_paths/actions.js";
import {selecting_actions} from "./selecting/actions.js";
const set_frame_is_resizing_type = "set_frame_is_resizing";
const set_frame_is_resizing = (args) => {
  return {type: set_frame_is_resizing_type, ...args};
};
export const is_set_frame_is_resizing = (action) => {
  return action.type === set_frame_is_resizing_type;
};
export const meta_wcomponents_actions = safe_merge({
  set_frame_is_resizing
}, selecting_actions, find_all_causal_paths_actions);
