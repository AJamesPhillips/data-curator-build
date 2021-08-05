export function get_updated_wcomponent(wcomponent, partial) {
  const different_type = partial.type !== void 0 && partial.type !== wcomponent.type;
  wcomponent = {...wcomponent, ...partial};
  return {
    wcomponent,
    different_type
  };
}
