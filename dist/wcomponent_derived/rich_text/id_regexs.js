export const old_ids_regex = /.*?(@@\w*\d+)/g;
const uuids_regex = /^([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})$/gi;
export const double_at_mentioned_uuids_regex = /.*?(@@[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/gi;
export function is_valid_uuid(uuid) {
  return !!uuid.match(uuids_regex);
}
export const old_ids_and_functions_regex = /.*?(@@\w*\d+)\.([\w]+)/g;
export const uuids_and_functions_regex = /.*?(@@[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})\.([\w]+)/gi;
