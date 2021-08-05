import {ACTIONS} from "../actions.js";
import {parse_specialised_objects_from_server_data} from "../specialised_objects/parse_server_data.js";
export function load_state(dispatch) {
  dispatch(ACTIONS.sync.update_sync_status("LOADING"));
  fetch("http://localhost:4000/api/v1/state/", {
    method: "get"
  }).then((resp) => resp.json()).then((data) => {
    let statements = data.statements;
    let patterns = data.patterns;
    let objects = data.objects;
    if (!statements)
      throw new Error(`Expecting statements from server`);
    if (!patterns)
      throw new Error(`Expecting patterns from server`);
    if (!objects)
      throw new Error(`Expecting objects from server`);
    statements = parse_datetimes(statements);
    patterns = parse_datetimes(patterns);
    objects = parse_datetimes(objects);
    dispatch(ACTIONS.statement.replace_all_statements({statements}));
    dispatch(ACTIONS.pattern.replace_all_patterns({patterns}));
    dispatch(ACTIONS.object.replace_all_core_objects({objects}));
  }).then(() => fetch("http://localhost:4000/api/v1/specialised_state/", {method: "get"})).then((resp) => resp.json()).then((data) => {
    const specialised_objects = parse_specialised_objects_from_server_data(data);
    dispatch(ACTIONS.specialised_object.replace_all_specialised_objects({specialised_objects}));
    dispatch(ACTIONS.sync.update_sync_status(void 0));
  });
}
function parse_datetimes(items) {
  return items.map((i) => ({...i, datetime_created: new Date(i.datetime_created)}));
}
