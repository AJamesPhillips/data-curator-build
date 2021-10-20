import {h} from "../../snowpack/pkg/preact.js";
import {grid_small_step, h_step, round_coordinate_small_step, v_step} from "../canvas/position_utils.js";
import {EditableNumber} from "./EditableNumber.js";
export function EditablePosition(props) {
  const {point, on_update} = props;
  const {left, top} = point;
  function update(arg) {
    on_update({...point, ...arg});
  }
  return /* @__PURE__ */ h("div", null, "Move Left: ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Left",
    value: left,
    allow_undefined: false,
    conditional_on_blur: (new_left) => update({left: round_coordinate_small_step(new_left)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "←",
    onClick: () => update({left: round_coordinate_small_step(left - grid_small_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "←←",
    onClick: () => update({left: round_coordinate_small_step(left - h_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "→→",
    onClick: () => update({left: round_coordinate_small_step(left + h_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "→",
    onClick: () => update({left: round_coordinate_small_step(left + grid_small_step)})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Move Top: ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Top",
    value: top,
    allow_undefined: false,
    conditional_on_blur: (new_top) => update({top: round_coordinate_small_step(new_top)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↑",
    onClick: () => update({top: round_coordinate_small_step(top - grid_small_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↑↑",
    onClick: () => update({top: round_coordinate_small_step(top - v_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↓↓",
    onClick: () => update({top: round_coordinate_small_step(top + v_step)})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↓",
    onClick: () => update({top: round_coordinate_small_step(top + grid_small_step)})
  }));
}
