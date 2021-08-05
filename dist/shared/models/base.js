import {parse_date} from "../utils/date_helpers.js";
import {str_enum} from "../utils/str_enum.js";
export const SYNC_STATES = str_enum(["NOT_SYNCED", "SYNCING", "SYNCED", "ERROR"]);
export function from_pojo(instance) {
  instance.created_at = parse_date(instance.created_at);
  instance.modified_at = parse_date(instance.modified_at);
  instance.deleted_at = parse_date(instance.deleted_at);
  return instance;
}
export function has_temp_id(model) {
  return model.uuid.startsWith("-");
}
