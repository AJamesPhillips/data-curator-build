import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {DisplayValue} from "../../wcomponent_derived/shared_components/DisplayValue.js";
import {get_wcomponent_validity_UI_value} from "../../wcomponent_derived/get_wcomponent_validity_UI_value.js";
const map_state = (state) => {
  const {created_at_ms, sim_ms} = state.routing.args;
  return {created_at_ms, sim_ms};
};
const connector = connect(map_state);
function _WComponentValidityValue(props) {
  const ui_value = get_wcomponent_validity_UI_value(props);
  return /* @__PURE__ */ h("div", {
    className: "node_validity_value_container"
  }, /* @__PURE__ */ h(DisplayValue, {
    UI_value: ui_value
  }));
}
export const WComponentValidityValue = connector(_WComponentValidityValue);
