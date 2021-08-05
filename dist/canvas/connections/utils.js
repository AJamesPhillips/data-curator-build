export function to_vec(angle, r) {
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  return {x, y};
}
export function add_vec(vec1, vec2) {
  return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
}
export function multiply_vec(vec1, vec2) {
  return {x: vec1.x * vec2.x, y: vec1.y * vec2.y};
}
