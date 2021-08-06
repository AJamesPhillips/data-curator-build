import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {x} from "../canvas/display.js";
const map_state = (state) => {
  return {
    created_at_ms: state.routing.args.created_at_ms
  };
};
const connector = connect(map_state);
function _CurrentDatetimeLine(props) {
  const {
    max_y,
    display_last_n_months = 5,
    created_at_ms
  } = props;
  const x_val = x(created_at_ms);
  const previous_month_lines = [];
  if (display_last_n_months) {
    const days_in_month = 30.44;
    const ms_seconds_in_day = 864e5;
    const x_val_month = x(ms_seconds_in_day * days_in_month);
    Array.from(Array(display_last_n_months)).forEach((_, i) => {
      const x_offset = (i + 1) * x_val_month;
      const ratio = (display_last_n_months - i) / display_last_n_months;
      const opacity = 0.2 + 0.8 * ratio;
      previous_month_lines.push(/* @__PURE__ */ h("line", {
        x1: x_val - x_offset,
        y1: "0",
        x2: x_val - x_offset,
        y2: max_y,
        stroke: `rgba(190,190,210,${opacity})`,
        strokeWidth: "2"
      }));
    });
  }
  return /* @__PURE__ */ h("g", null, previous_month_lines, /* @__PURE__ */ h("line", {
    x1: x_val,
    y1: "0",
    x2: x_val,
    y2: props.max_y,
    stroke: "red",
    strokeWidth: "2"
  }));
}
export const CurrentDatetimeLine = connector(_CurrentDatetimeLine);
