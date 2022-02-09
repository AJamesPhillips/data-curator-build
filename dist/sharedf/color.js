export function color_to_string(color) {
  if (!color)
    return "";
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}
export function color_to_opposite(color) {
  if (!color)
    return {r: 0, g: 0, b: 0, a: 1};
  const total = color.r + color.g + color.b;
  const v = total < 383 ? 255 : 0;
  return {r: v, g: v, b: v, a: 1};
}
export function darker_color(color) {
  if (!color)
    return void 0;
  return {r: color.r / 2, g: color.g / 2, b: color.b / 2, a: color.a};
}
