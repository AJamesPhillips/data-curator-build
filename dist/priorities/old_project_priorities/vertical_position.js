export function get_project_id_to_vertical_position(priorities_by_project) {
  const map = {};
  Object.keys(priorities_by_project).forEach((project_id) => {
    const priorities = priorities_by_project[project_id];
    if (!priorities)
      return;
    map[project_id] = priorities.vertical_position;
  });
  return map;
}
