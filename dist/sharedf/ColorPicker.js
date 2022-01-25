import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import "./ColorPicker.css.proxy.js";
import {EditableNumber} from "../form/EditableNumber.js";
import {color_is_whole} from "../shared/interfaces/color.js";
import {bounded} from "../shared/utils/bounded.js";
import {color_to_string} from "./color.js";
const white = {r: 255, g: 255, b: 255, a: 1};
export function ColorPicker(props) {
  return props.allow_undefined ? /* @__PURE__ */ h(MaybeColorPicker, {
    color: props.color,
    allow_undefined: true,
    conditional_on_blur: props.conditional_on_blur
  }) : /* @__PURE__ */ h(DefiniteColorPicker, {
    color: props.color,
    conditional_on_blur: props.conditional_on_blur
  });
}
function DefiniteColorPicker(props) {
  const initial_color = props.color || white;
  const [color, _set_color] = useState(initial_color);
  useEffect(() => _set_color(initial_color), [props.color]);
  const set_color = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    _set_color(valid_new_color);
  };
  const on_blur = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    _set_color(valid_new_color);
    if (colours_different(props.color, valid_new_color))
      props.conditional_on_blur(valid_new_color);
  };
  return /* @__PURE__ */ h(ColorPickerInner, {
    color,
    allow_undefined: false,
    set_color,
    on_blur
  });
}
function MaybeColorPicker(props) {
  const [color, _set_color] = useState(props.color);
  useEffect(() => _set_color(props.color), [props.color]);
  const set_color = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    _set_color(valid_new_color);
  };
  const on_blur = (partial_color) => {
    const valid_new_color = get_valid_new_color(color, partial_color);
    _set_color(valid_new_color);
    if (colours_different(props.color, valid_new_color))
      props.conditional_on_blur(valid_new_color);
  };
  return /* @__PURE__ */ h(ColorPickerInner, {
    color,
    allow_undefined: true,
    set_color,
    on_blur
  });
}
function ColorPickerInner(props) {
  const {color, set_color, on_blur} = props;
  return /* @__PURE__ */ h("div", {
    className: "color_picker"
  }, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "r",
    value: color?.r,
    allow_undefined: true,
    conditional_on_change: (r) => set_color({r}),
    always_on_blur: (r) => on_blur({r}),
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "g",
    value: color?.g,
    allow_undefined: true,
    conditional_on_change: (g) => set_color({g}),
    always_on_blur: (g) => on_blur({g}),
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "b",
    value: color?.b,
    allow_undefined: true,
    conditional_on_change: (b) => set_color({b}),
    always_on_blur: (b) => on_blur({b}),
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "a",
    value: color?.a,
    allow_undefined: true,
    conditional_on_change: (a) => set_color({a}),
    always_on_blur: (a) => on_blur({a}),
    style: {width: 65}
  }), "  ", /* @__PURE__ */ h("div", {
    className: "color_swatch",
    style: {backgroundColor: color_is_whole(color) ? color_to_string(color) : void 0}
  }));
}
function get_valid_new_color(color, partial_color) {
  const new_color = {...color, ...partial_color};
  const valid_new_color = bound_color(new_color);
  return valid_new_color;
}
function bound_color(color) {
  if (!color)
    return void 0;
  let {r, g, b, a} = color;
  r = r === void 0 ? r : bounded(r, 0, 255);
  g = g === void 0 ? g : bounded(g, 0, 255);
  b = b === void 0 ? b : bounded(b, 0, 255);
  a = a === void 0 ? a : bounded(a, 0, 1);
  return color;
}
function colours_different(color1, color2) {
  if (!color1)
    return color2 ? true : false;
  else if (!color2)
    return true;
  return color1.r !== color2.r || color1.g !== color2.g || color1.b !== color2.b || color1.a !== color2.a;
}
