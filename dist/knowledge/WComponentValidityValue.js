import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {get_wcomponent_validity_value} from "../shared/wcomponent/get_wcomponent_validity_value.js";
import {DisplayValue} from "./multiple_values/DisplayValue.js";
const map_state = (state) => {
  const {created_at_ms, sim_ms} = state.routing.args;
  return {created_at_ms, sim_ms};
};
const connector = connect(map_state);
function _WComponentValidityValue(props) {
  const ui_value = get_wcomponent_validity_value_from_props(props);
  return /* @__PURE__ */ h("div", {
    className: "node_validity_value_container"
  }, /* @__PURE__ */ h(DisplayValue, {
    UI_value: ui_value
  }));
}
export const WComponentValidityValue = connector(_WComponentValidityValue);
function get_wcomponent_validity_value_from_props(props) {
  const {wcomponent, created_at_ms, sim_ms} = props;
  const {is_defined, value, uncertain, probability, conviction} = get_wcomponent_validity_value({wcomponent, created_at_ms, sim_ms});
  const value_str = value ? "Valid" : "Invalid";
  return {is_defined, values_string: value_str, probabilities_string: "", convictions_string: ""};
}
