export function str_enum(o) {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
