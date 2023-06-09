import {pick} from "../../shared/utils/pick.js";
import {get_persisted_state_object, persist_state_object} from "../persistence/persistence_utils.js";
import {derive_validity_filter, derive_certainty_formatting} from "./util.js";
export function display_options_persist(state) {
  const to_persist = pick([
    "consumption_formatting",
    "time_resolution",
    "display_by_simulated_time",
    "display_time_marks",
    "animate_connections",
    "circular_links",
    "show_large_grid",
    "validity_filter",
    "certainty_formatting"
  ], state.display_options);
  persist_state_object("display_options", to_persist);
}
export function display_options_starting_state() {
  const obj = get_persisted_state_object("display_options");
  const validity_filter = obj.validity_filter || "show_invalid";
  const certainty_formatting = obj.certainty_formatting || "render_certainty_as_opacity";
  const derived_validity_filter = derive_validity_filter(validity_filter);
  const derived_certainty_formatting = derive_certainty_formatting(certainty_formatting);
  const state = {
    consumption_formatting: true,
    focused_mode: false,
    time_resolution: "minute",
    display_by_simulated_time: false,
    display_time_marks: false,
    animate_connections: false,
    circular_links: true,
    show_help_menu: false,
    show_large_grid: false,
    validity_filter,
    certainty_formatting,
    derived_validity_filter,
    derived_certainty_formatting,
    ...obj
  };
  return state;
}
