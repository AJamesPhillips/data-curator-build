export function sort_list(items, key, direction) {
  const sort_function = get_sort_function(direction);
  return items.map((item, index) => ({item, key_value: key(item, index)})).sort(sort_function).map(({item}) => item);
}
function get_sort_function(direction) {
  const change1 = direction === "ascending" ? -1 : 1;
  const change2 = direction === "ascending" ? 1 : -1;
  return (i1, i2) => i1.key_value < i2.key_value ? change1 : i1.key_value > i2.key_value ? change2 : 0;
}
