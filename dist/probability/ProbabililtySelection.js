import {h} from "../../snowpack/pkg/preact.js";
import {probabilities, probabilities_plus_anchors, probability_is_in_range} from "../shared/uncertainty/probabilities.js";
export function ProbablitySelection(props) {
  const {probability, set_probability} = props;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("input", {
    type: "range",
    min: 0,
    max: 100,
    value: probability,
    onChange: (e) => set_probability(parseFloat(e.currentTarget.value)),
    list: "tickmarks_probability"
  }), /* @__PURE__ */ h("datalist", {
    id: "tickmarks_probability"
  }, probabilities_plus_anchors.map((d) => /* @__PURE__ */ h("option", {
    value: d
  }, d))), probabilities.map(({text, min, max, mean}) => {
    const selected = probability_is_in_range({min, max, probability});
    return /* @__PURE__ */ h("span", {
      style: {
        backgroundColor: selected ? "blue" : "",
        color: selected ? "white" : "",
        border: "thin solid #aaa",
        borderRadius: 3,
        margin: "2px 4px",
        padding: "2px 4px",
        cursor: "pointer"
      },
      onClick: () => set_probability(mean)
    }, " ", text, " ");
  }));
}
