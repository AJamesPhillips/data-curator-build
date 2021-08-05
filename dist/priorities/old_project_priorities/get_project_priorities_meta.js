import {group_priorities_by_project, order_priorities_by_project} from "./group_and_order.js";
import {get_project_id_to_vertical_position} from "./vertical_position.js";
export function get_project_priorities_meta(raw_project_priorities, objects) {
  let earliest_ms = new Date().getTime();
  let latest_ms = earliest_ms + 1;
  const project_priorities = [];
  const project_priority_events = [];
  raw_project_priorities.forEach((project_priority) => {
    const {attributes} = project_priority;
    const start_date = new Date(attributes[1].value);
    const project_id = attributes[0].id;
    const project = get_object_by_id_c(objects, project_id);
    if (!project)
      return;
    const start_time_ms = start_date.getTime();
    if (Number.isNaN(start_time_ms))
      return;
    earliest_ms = Math.min(earliest_ms, start_time_ms);
    latest_ms = Math.max(latest_ms, start_time_ms);
    const effort_value = attributes[2].value;
    project_priorities.push({
      start_date,
      name: project.attributes[0].value,
      id: project_priority.id,
      project_id: project.id,
      fields: [{name: "Effort", value: effort_value}]
    });
    project_priority_events.push({
      datetime: start_date,
      type: "created"
    });
  });
  const unordered_priorities_by_project = group_priorities_by_project(project_priorities);
  const priorities_by_project = order_priorities_by_project(unordered_priorities_by_project);
  const project_id_to_vertical_position = get_project_id_to_vertical_position(priorities_by_project);
  return {
    project_priorities,
    priorities_by_project,
    project_id_to_vertical_position,
    project_priority_events,
    earliest_ms,
    latest_ms
  };
}
const get_object_by_id_c = memoize_get_object_by_id();
function memoize_get_object_by_id() {
  let cached_objects;
  let objects_by_id = {};
  return (objects, find_id) => {
    if (cached_objects !== objects) {
      objects_by_id = {};
      objects.forEach((obj) => objects_by_id[obj.id] = obj);
      cached_objects = objects;
    }
    return objects_by_id[find_id];
  };
}
