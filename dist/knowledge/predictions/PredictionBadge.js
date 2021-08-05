import {h} from "../../../_snowpack/pkg/preact.js";
import "./PredictionBadge.css.proxy.js";
import {PredictionsBadgeConvictionMask} from "./PredictionBadgeConvictionMask.js";
import {bounded} from "../../shared/utils/bounded.js";
import {calc_new_counterfactual_state} from "./calc_new_counterfactual_state.js";
export function PredictionBadge(props) {
  const {size, elements_width = 10} = props;
  const total_elements = elements_width * elements_width;
  const cell_size = size / elements_width;
  const {counterfactual_probability, counterfactual_conviction, set_counterfactual} = props;
  const counterfactual_active = is_num(counterfactual_probability) || is_num(counterfactual_conviction);
  const {probability: props_probability, conviction: props_conviction} = sanitise_props(props);
  const final_probability = is_num(counterfactual_probability) ? counterfactual_probability : props_probability;
  const final_conviction = is_num(counterfactual_conviction) ? counterfactual_conviction : props_conviction;
  function toggle_counterfactual() {
    if (!set_counterfactual)
      return;
    const result = calc_new_counterfactual_state({
      probability: props_probability,
      conviction: props_conviction,
      counterfactual_probability,
      counterfactual_conviction
    });
    set_counterfactual({
      probability: result.new_counterfactual_probability,
      conviction: result.new_counterfactual_conviction
    });
  }
  const border_width = 3;
  const counterfactual_active__class = `counterfactual_${counterfactual_active ? "" : "in"}active`;
  const class_name = `prediction_badge ${counterfactual_active__class}`;
  const title = props.disabled ? "Disabled: counterfactuals have probably not yet been allowed on this knowledge view" : "Click to toggle prediction counterfactuals";
  return /* @__PURE__ */ h("div", {
    style: {cursor: props.disabled ? "not-allowed" : "pointer"},
    title
  }, /* @__PURE__ */ h("svg", {
    width: size + border_width * 2,
    height: size + border_width * 2,
    onClick: () => !props.disabled && toggle_counterfactual(),
    className: class_name
  }, /* @__PURE__ */ h("rect", {
    x: 0,
    y: 0,
    width: size + border_width * 2,
    height: size + border_width * 2,
    className: "outline"
  }), /* @__PURE__ */ h("g", null, Array.from(Array(total_elements)).map((_, i) => {
    const i_frac = i / total_elements;
    const x = i % elements_width;
    const y = Math.floor(i / elements_width);
    return {
      i,
      i_frac,
      x,
      y,
      ys: border_width + (elements_width - 1 - x) * cell_size,
      xs: border_width + y * cell_size
    };
  }).map((e) => {
    const f = e.i_frac < final_probability;
    const certainty = f ? 0 : 1;
    const intensity = certainty * 255;
    return {
      ...e,
      fill: `rgb(${intensity},${intensity},${intensity})`
    };
  }).map((e) => /* @__PURE__ */ h("rect", {
    x: e.xs,
    y: e.ys,
    width: cell_size,
    height: cell_size,
    fill: e.fill
  }))), /* @__PURE__ */ h(PredictionsBadgeConvictionMask, {
    size,
    border_width,
    elements_width,
    conviction: final_conviction
  })));
}
function sanitise_props({probability: p_raw, conviction: c_raw}) {
  const probability = bounded(p_raw, 0, 1);
  const conviction = bounded(c_raw, 0, 1);
  if (probability !== p_raw)
    console.error(`probability: ${p_raw} not in range 0 to 1`);
  if (conviction !== c_raw)
    console.error(`conviction: ${c_raw} not in range 0 to 1`);
  return {probability, conviction};
}
function is_num(num) {
  return Number.isFinite(num);
}
