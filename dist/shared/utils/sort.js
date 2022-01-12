export var SortDirection;
(function(SortDirection2) {
  SortDirection2[SortDirection2["ascending"] = 0] = "ascending";
  SortDirection2[SortDirection2["descending"] = 1] = "descending";
})(SortDirection || (SortDirection = {}));
export function sort_list(items, key, direction) {
  const sort_function = get_sort_function(direction);
  return items.map((item, index) => ({item, key_value: key(item, index)})).sort(sort_function).map(({item}) => item);
}
function get_sort_function(direction) {
  const ascending = direction === 0;
  const change1 = ascending ? -1 : 1;
  const change2 = ascending ? 1 : -1;
  return (i1, i2) => i1.key_value < i2.key_value ? change1 : i1.key_value > i2.key_value ? change2 : 0;
}
