export function color_is_whole(color) {
  if (!color)
    return false;
  return color.r !== void 0 && color.g !== void 0 && color.b !== void 0 && color.a !== void 0;
}
export function color_is_empty(color) {
  if (!color)
    return true;
  return color.r === void 0 && color.g === void 0 && color.b === void 0 && color.a === void 0;
}
