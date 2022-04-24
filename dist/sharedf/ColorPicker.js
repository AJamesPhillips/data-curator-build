import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import "./ColorPicker.css.proxy.js";
import {EditableNumber} from "../form/EditableNumber.js";
import {bounded} from "../shared/utils/bounded.js";
import {color_to_string} from "./color.js";
import {EditableTextOnBlurType} from "../form/editable_text/editable_text_common.js";
const default_color = () => ({r: 255, g: 255, b: 255, a: 1});
export function ColorPicker(props) {
  const [color, _set_color] = useState(props.color || default_color());
  useEffect(() => {
    _set_color(props.color || default_color());
  }, [color_to_string(props.color)]);
  const set_color = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    _set_color(valid_new_color);
  };
  const on_blur = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    if (colours_different(color, valid_new_color))
      _set_color(valid_new_color);
    if (colours_different(props.color, valid_new_color))
      props.conditional_on_blur(valid_new_color);
  };
  return /* @__PURE__ */ h("div", {
    className: "color_picker"
  }, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "r",
    value: color.r,
    allow_undefined: false,
    conditional_on_change: (r) => set_color({r}),
    on_blur: (r) => on_blur({r}),
    on_blur_type: EditableTextOnBlurType.always,
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "g",
    value: color.g,
    allow_undefined: false,
    conditional_on_change: (g) => set_color({g}),
    on_blur: (g) => on_blur({g}),
    on_blur_type: EditableTextOnBlurType.always,
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "b",
    value: color.b,
    allow_undefined: false,
    conditional_on_change: (b) => set_color({b}),
    on_blur: (b) => on_blur({b}),
    on_blur_type: EditableTextOnBlurType.always,
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "a",
    value: color.a,
    allow_undefined: false,
    conditional_on_change: (a) => set_color({a}),
    on_blur: (a) => on_blur({a}),
    on_blur_type: EditableTextOnBlurType.always,
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h("div", {
    className: "color_swatch",
    style: {backgroundColor: color_to_string(color)}
  }));
}
function get_valid_new_color(color, partial_color) {
  const new_color = {...color, ...partial_color};
  const valid_new_color = validate_color(new_color);
  return valid_new_color;
}
function validate_color(color) {
  let {r, g, b, a} = color;
  r = bounded(r, 0, 255);
  g = bounded(g, 0, 255);
  b = bounded(b, 0, 255);
  a = bounded(a, 0, 1);
  return {r, g, b, a};
}
function colours_different(color1, color2) {
  if (!color1)
    return true;
  return color_to_string(color1) !== color_to_string(color2);
}
