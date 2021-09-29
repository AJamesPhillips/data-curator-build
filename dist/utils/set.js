export function equal_sets(as, bs) {
  if (as.size !== bs.size)
    return false;
  for (var a of as)
    if (!bs.has(a))
      return false;
  return true;
}
export function toggle_item_in_set(set, item) {
  set = new Set(set);
  if (set.has(item))
    set.delete(item);
  else
    set.add(item);
  return set;
}
export function ensure_item_in_set(set, item) {
  if (set.has(item))
    return set;
  set = new Set(set);
  set.add(item);
  return set;
}
export function ensure_item_not_in_set(set, item) {
  if (!set.has(item))
    return set;
  set = new Set(set);
  set.delete(item);
  return set;
}
export function set_union(set1, set2) {
  return new Set([
    ...Array.from(set1),
    ...Array.from(set2)
  ]);
}
