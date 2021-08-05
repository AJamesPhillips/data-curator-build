import {date2str_auto} from "../../../shared/utils/date_helpers.js";
export function airtable_multi_field_to_single_attribute(args) {
  const {pidx, get_temp_id, field} = args;
  const id = field && field.length ? get_temp_id(field[0]) : "";
  if (field && field.length > 1)
    console.warn(`Dropping fields: ${JSON.stringify(field.slice(1))}`);
  return {pidx, id};
}
export function airtable_multi_field_to_multi_attributes(args) {
  const {pidx, get_temp_id, field} = args;
  const field_normalised = field || [];
  const attributes = field_normalised.map((v) => ({pidx, id: get_temp_id(v)}));
  return attributes.length ? attributes : [{pidx, id: ""}];
}
export function date_string_to_string(v) {
  if (!v)
    return "";
  const d = new Date(v);
  if (isNaN(d))
    return "";
  return date2str_auto({date: d});
}
export const num_to_string = (v) => v === void 0 ? "" : `${v}`;
export const bool_to_string = (v) => v ? "Yes" : "No";
