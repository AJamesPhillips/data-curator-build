import {h} from "../../snowpack/pkg/preact.js";
import "./LightTextField.css.proxy.js";
export function ListTextField() {
  return /* @__PURE__ */ h("div", {
    class: "MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth"
  }, /* @__PURE__ */ h("label", {
    class: "MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled",
    "data-shrink": "true"
  }, "Expected datetime"), /* @__PURE__ */ h("div", {
    class: "MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
  }, /* @__PURE__ */ h("input", {
    "aria-invalid": "false",
    type: "text",
    class: "MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
  }), /* @__PURE__ */ h("fieldset", {
    "aria-hidden": "true",
    class: "hardcoded-PrivateNotchedOutline-root-67 hardcoded-MuiOutlinedInput-notchedOutline"
  }, /* @__PURE__ */ h("legend", {
    class: "hardcoded-PrivateNotchedOutline-legendLabelled-69 hardcoded-PrivateNotchedOutline-legendNotched-70"
  }, /* @__PURE__ */ h("span", null, "Expected datetime")))));
}
