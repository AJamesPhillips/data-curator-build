export function parse_base_dates(o) {
  return {
    ...o,
    created_at: new Date(o.created_at),
    custom_created_at: optional_date(o.custom_created_at),
    modified_at: optional_date(o.modified_at),
    datetime: optional_datetime_temporal_uncertainty(o.datetime)
  };
}
export const optional_date = (d) => d === void 0 ? void 0 : new Date(d);
function optional_datetime_temporal_uncertainty(temporal_uncertainty) {
  if (!temporal_uncertainty)
    return void 0;
  return {
    ...temporal_uncertainty,
    value: optional_date(temporal_uncertainty.value),
    min: optional_date(temporal_uncertainty.min),
    max: optional_date(temporal_uncertainty.max)
  };
}
