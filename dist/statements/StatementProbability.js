import {h} from "../../_snowpack/pkg/preact.js";
import {get_probability_option} from "../shared/uncertainty/probabilities.js";
import {ProbabilityGraph} from "../probability/ProbabilityGraph.js";
import {factory_scaled_weibull} from "../probability/weibulll.js";
import "./StatementProbability.css.proxy.js";
export function StatementProbability(props) {
  const probabililty_option = get_probability_option(props.probability);
  let likelihood = "n/a";
  let calc_x;
  let reverse = false;
  const scale = 20;
  if (probabililty_option) {
    const {lambda, k, text, reverse: r} = probabililty_option;
    likelihood = text;
    reverse = r;
    calc_x = factory_scaled_weibull({lambda, k, scale});
  }
  return /* @__PURE__ */ h("div", {
    className: "statement_probability"
  }, /* @__PURE__ */ h("div", {
    className: "top_row"
  }, /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", null, props.probability > 50 ? "Yes" : "No"), /* @__PURE__ */ h("div", null, props.probability, "%")), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("div", null, likelihood), /* @__PURE__ */ h("div", null, "Confident"))), /* @__PURE__ */ h("div", {
    className: "bottom_row"
  }, calc_x && /* @__PURE__ */ h(ProbabilityGraph, {
    calc_x,
    size: scale * 4,
    reverse
  })));
}
