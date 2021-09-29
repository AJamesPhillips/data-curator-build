import {needs_save} from "./needs_save.js";
export function conditionally_warn_unsaved_exit(load_state_from_storage, state) {
  if (!load_state_from_storage)
    return;
  if (!needs_save(state))
    return;
  return true;
}
