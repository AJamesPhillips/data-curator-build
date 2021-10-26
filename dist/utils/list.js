export function replace_element(existing, replacement, predicate) {
  const index = existing.findIndex(predicate);
  if (index < 0) {
    console.error(`Can not find element by predicate: ${predicate.toString()}`);
    return existing;
  }
  return [...existing.slice(0, index), replacement, ...existing.slice(index + 1)];
}
export function upsert_entry(existing, new_item, predicate, debug_item_descriptor = "") {
  let matched_index = -1;
  const matches = existing.filter((item, index) => {
    const match = predicate(item);
    if (match)
      matched_index = index;
    return match;
  });
  if (matches.length > 1) {
    throw new Error(`During upsert_entry multiple (${matches.length}) "${debug_item_descriptor}" items matching predicate: "${predicate.toString()}"`);
  }
  let new_list = existing;
  if (matches.length === 1) {
    if (matches[0] !== new_item) {
      new_list = [
        ...existing.slice(0, matched_index),
        new_item,
        ...existing.slice(matched_index + 1)
      ];
    }
  } else {
    new_list = [...existing, new_item];
  }
  return new_list;
}
export function remove_index(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}
export function remove_element(list, predicate) {
  const filtered = list.filter((i) => !predicate(i));
  return filtered.length === list.length ? list : filtered;
}
export function toggle_item_in_list(list, item, predicate) {
  const pred = predicate || ((i) => i === item);
  const new_list = list.filter((i) => !pred(i));
  if (new_list.length === list.length)
    new_list.push(item);
  return new_list;
}
export function unique_list(items) {
  const contained = new Set();
  const filtered = [];
  items.forEach((item) => {
    if (contained.has(item))
      return;
    contained.add(item);
    filtered.push(item);
  });
  return filtered.length === items.length ? items : filtered;
}
