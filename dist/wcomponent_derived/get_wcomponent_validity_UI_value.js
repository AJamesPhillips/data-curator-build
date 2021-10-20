import {get_wcomponent_validity_value} from "./get_wcomponent_validity_value.js";
export function get_wcomponent_validity_UI_value(props) {
  const {wcomponent, created_at_ms, sim_ms} = props;
  const {is_defined, is_valid, certainty} = get_wcomponent_validity_value({wcomponent, created_at_ms, sim_ms});
  const values_string = is_valid ? "Valid" : "Invalid";
  return {is_defined, values_string};
}
