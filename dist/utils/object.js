export function safe_merge(o1, o2 = {}, o3 = {}, o4 = {}, o5 = {}, o6 = {}, o7 = {}, o8 = {}, o9 = {}) {
  return {...o1, ...o2, ...o3, ...o4, ...o5, ...o6, ...o7, ...o8, ...o9};
}
export function find_match_by_inclusion_of_key(str, dictionary) {
  const pair = Object.entries(dictionary).find(([root]) => str.includes(root));
  return pair;
}
