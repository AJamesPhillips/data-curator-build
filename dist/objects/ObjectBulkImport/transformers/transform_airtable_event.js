import {get_new_object_id} from "../../../shared/utils/ids.js";
import {EXTERNAL_ID_KEY, PATTERN_ID_EVENT} from "../_common.js";
import {date_string_to_string, airtable_multi_field_to_multi_attributes} from "./common.js";
export function transform_airtable_event(args) {
  const {pattern, get_temp_id} = args;
  if (pattern.id !== PATTERN_ID_EVENT)
    throw new Error(`transform_airtable_event requires Event pattern`);
  const ar = args.airtable_record;
  const eo = args.existing_object;
  const new_object = {
    id: eo && eo.id || get_new_object_id(),
    datetime_created: eo ? eo.datetime_created : new Date(ar.createdTime),
    labels: [],
    pattern_id: pattern.id,
    external_ids: {[EXTERNAL_ID_KEY]: ar.id, ...eo && eo.external_ids || {}},
    attributes: [
      {pidx: 0, value: ar.fields.title || ""},
      {pidx: 1, value: date_string_to_string(ar.fields.date)},
      {pidx: 2, value: ar.fields.description || ""},
      ...airtable_multi_field_to_multi_attributes({pidx: 3, field: ar.fields.related_actions, get_temp_id})
    ]
  };
  return new_object;
}
