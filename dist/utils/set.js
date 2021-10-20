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
export function set_union(...sets) {
  let elements = [];
  sets.forEach((set) => elements = elements.concat(Array.from(set)));
  return new Set(elements);
}
export function set_difference(set_a, set_b) {
  const new_set_a = new Set(set_a);
  set_b.forEach((element) => new_set_a.delete(element));
  return new_set_a.size === set_a.size ? set_a : new_set_a;
}
