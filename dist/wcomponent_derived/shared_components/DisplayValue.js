import {h} from "../../../snowpack/pkg/preact.js";
import "./DisplayValue.css.proxy.js";
export function DisplayValue(props) {
  const {UI_value: {values_string, counterfactual_applied, uncertain}} = props;
  const class_name = `value ${counterfactual_applied ? "assumption" : ""} ${uncertain ? "uncertain" : ""}`;
  return /* @__PURE__ */ h("span", {
    className: class_name
  }, values_string);
}
