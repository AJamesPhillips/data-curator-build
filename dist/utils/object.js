export function safe_merge(o1, o2 = {}, o3 = {}, o4 = {}, o5 = {}, o6 = {}, o7 = {}, o8 = {}, o9 = {}) {
  return {...o1, ...o2, ...o3, ...o4, ...o5, ...o6, ...o7, ...o8, ...o9};
}
