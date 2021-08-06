import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {PredictionBadge} from "../knowledge/predictions/PredictionBadge.js";
import {ProbablitySelection} from "../probability/ProbabililtySelection.js";
export function DemoPredictionsBadge() {
  const [probability, set_probability] = useState(1);
  const [conviction, set_conviction] = useState(1);
  const [size, set_size] = useState(50);
  const [counterfactual_probability, set_counterfactual_probability] = useState(void 0);
  const [counterfactual_conviction, set_counterfactual_conviction] = useState(void 0);
  function set_counterfactual(args) {
    set_counterfactual_probability(args.probability);
    set_counterfactual_conviction(args.conviction);
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), "   ", /* @__PURE__ */ h(PredictionBadge, {
    size,
    probability: probability / 100,
    conviction: conviction / 100,
    counterfactual_probability,
    counterfactual_conviction,
    set_counterfactual
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Probability: ", probability, "%", /* @__PURE__ */ h(ProbablitySelection, {
    probability,
    set_probability
  }), /* @__PURE__ */ h("br", null), "Confidence: ", conviction, "%", /* @__PURE__ */ h(ProbablitySelection, {
    probability: conviction,
    set_probability: set_conviction
  }), /* @__PURE__ */ h("br", null), "Size: ", size, /* @__PURE__ */ h("input", {
    type: "range",
    min: 1,
    max: 100,
    value: size,
    onChange: (e) => set_size(parseInt(e.currentTarget.value, 10))
  }));
}
