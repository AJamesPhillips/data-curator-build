export function bounded(num, min, max) {
  return Math.max(Math.min(num, max), min);
}
export function rescale(num, min, max, domain_min = 0, domain_max = 1) {
  const bound = bounded(num, domain_min, domain_max);
  const ratio = (bound - domain_min) / (domain_max - domain_min);
  const result = min + ratio * (max - min);
  return result;
}
