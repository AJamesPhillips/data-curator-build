export function optional_view_type(current_view) {
  const view_types_to_maintain = new Set(["knowledge", "priorities"]);
  const view = view_types_to_maintain.has(current_view) ? current_view : "knowledge";
  return view;
}
