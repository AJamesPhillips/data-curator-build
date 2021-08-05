export function convert_from_pattern_attributes(attributes) {
  return attributes.map((a, pidx) => ({pidx, value: "", pattern: a}));
}
export function merge_pattern_attributes(attributes, pattern) {
  const new_attributes = [];
  attributes.forEach((a) => {
    const pattern_attributes = pattern.attributes[a.pidx];
    if (pattern_attributes)
      new_attributes.push({...a, pattern: pattern_attributes});
  });
  return new_attributes;
}
export function merge_pattern_into_core_object(args) {
  const pattern = args.hasOwnProperty("pattern") ? args.pattern : find_pattern(args.patterns, args.object.pattern_id);
  return {
    ...args.object,
    pattern_id: pattern.id,
    pattern_name: pattern.name,
    content: pattern.content,
    attributes: merge_pattern_attributes(args.object.attributes, pattern)
  };
}
function find_pattern(patterns, pattern_id) {
  const pattern = patterns.find(({id}) => id === pattern_id);
  if (!pattern)
    throw new Error(`No pattern id: "${pattern_id}" in patterns`);
  return pattern;
}
