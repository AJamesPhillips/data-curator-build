import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {grid_small_step, h_step, round_coordinate_small_step, v_step} from "../canvas/position_utils.js";
import {EditableNumber} from "./EditableNumber.js";
export function EditablePosition(props) {
  const [change_left, set_change_left] = useState(0);
  const [change_top, set_change_top] = useState(0);
  const on_update = (arg) => {
    props.on_update({
      change_left: arg.change_left ? round_coordinate_small_step(arg.change_left) : 0,
      change_top: arg.change_top ? round_coordinate_small_step(arg.change_top) : 0
    });
  };
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", {
    style: {fontSize: 10, color: "#888"}
  }, "Increments of ", grid_small_step, " pixels"), "Move right: ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Right",
    value: change_left,
    allow_undefined: false,
    conditional_on_blur: (new_change_left) => set_change_left(round_coordinate_small_step(new_change_left))
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Move",
    disabled: change_left === 0,
    onClick: () => on_update({change_left})
  }), "  ", /* @__PURE__ */ h("input", {
    type: "button",
    value: "←",
    onClick: () => on_update({change_left: -grid_small_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "←←",
    onClick: () => on_update({change_left: -h_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "→→",
    onClick: () => on_update({change_left: h_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "→",
    onClick: () => on_update({change_left: grid_small_step})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Move up: ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Up",
    value: -change_top,
    allow_undefined: false,
    conditional_on_blur: (new_change_top) => set_change_top(round_coordinate_small_step(-new_change_top))
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Move",
    disabled: change_top === 0,
    onClick: () => on_update({change_top})
  }), "  ", /* @__PURE__ */ h("input", {
    type: "button",
    value: "↑",
    onClick: () => on_update({change_top: -grid_small_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↑↑",
    onClick: () => on_update({change_top: -v_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↓↓",
    onClick: () => on_update({change_top: v_step})
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "↓",
    onClick: () => on_update({change_top: grid_small_step})
  }));
}
