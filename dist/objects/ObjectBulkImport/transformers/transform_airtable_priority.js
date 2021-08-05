import {get_new_object_id} from "../../../shared/utils/ids.js";
import {EXTERNAL_ID_KEY, PATTERN_ID_PRIORITY} from "../_common.js";
import {airtable_multi_field_to_single_attribute, date_string_to_string, num_to_string} from "./common.js";
export function transform_airtable_priority(args) {
  const {pattern, get_temp_id} = args;
  if (pattern.id !== PATTERN_ID_PRIORITY)
    throw new Error(`transform_airtable_priority requires Priority pattern`);
  const ar = args.airtable_record;
  const eo = args.existing_object;
  const new_object = {
    id: eo && eo.id || get_new_object_id(),
    datetime_created: eo ? eo.datetime_created : new Date(ar.createdTime),
    labels: [],
    pattern_id: pattern.id,
    external_ids: {[EXTERNAL_ID_KEY]: ar.id, ...eo && eo.external_ids || {}},
    attributes: [
      airtable_multi_field_to_single_attribute({pidx: 0, field: ar.fields.project, get_temp_id}),
      {pidx: 1, value: date_string_to_string(ar.fields.start_datetime)},
      {pidx: 2, value: num_to_string(ar.fields.effort)},
      {pidx: 3, value: ar.fields.why || ""}
    ]
  };
  return new_object;
}
