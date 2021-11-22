const view_types_to_maintain = new Set(["knowledge", "priorities"]);
export function optional_view_type(current_view) {
  const view = view_types_to_maintain.has(current_view) ? current_view : "knowledge";
  return view;
}
