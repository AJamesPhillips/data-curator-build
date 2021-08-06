import {h} from "../../snowpack/pkg/preact.js";
import "./SelectionBox.css.proxy.js";
export function SelectionBox(props) {
  const {
    canvas_start_x,
    canvas_start_y,
    canvas_end_x,
    canvas_end_y
  } = props;
  const selection_box_style = {
    left: canvas_start_x,
    top: -canvas_end_y,
    width: canvas_end_x - canvas_start_x,
    height: canvas_end_y - canvas_start_y
  };
  return /* @__PURE__ */ h("div", {
    className: `selection_box color_${props.color}`,
    style: selection_box_style
  });
}
