import {parse_specialised_objects_fromto_server} from "../../wcomponent/parse_json/parse_specialised_objects.js";
export function parse_specialised_objects_from_server_data(data) {
  try {
    return parse_specialised_objects_fromto_server(data);
  } catch (e) {
    console.error(`Error parsing specialised objects state from server`);
    throw e;
  }
}
