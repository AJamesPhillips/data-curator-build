import {getItem} from "../../../snowpack/pkg/localforage.js";
import {ACTIONS} from "../actions.js";
import {parse_specialised_objects_from_server_data} from "../specialised_objects/parse_server_data.js";
import {LOCAL_STORAGE_STATE_KEY} from "./supported_keys.js";
export function load_state(dispatch) {
  dispatch(ACTIONS.sync.update_sync_status("LOADING"));
  getItem(LOCAL_STORAGE_STATE_KEY).then((data) => {
    const specialised_objects = parse_specialised_objects_from_server_data(data);
    dispatch(ACTIONS.specialised_object.replace_all_specialised_objects({specialised_objects}));
    dispatch(ACTIONS.sync.update_sync_status(void 0));
  });
}
function parse_datetimes(items) {
  return items.map((i) => ({...i, datetime_created: new Date(i.datetime_created)}));
}
