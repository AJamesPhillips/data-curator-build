export function pick(keys, obj) {
  const result = {};
  keys.forEach((key) => {
    result[key] = obj[key];
  });
  return result;
}
