import {h} from "../../../../snowpack/pkg/preact.js";
import {EditablePercentage} from "../../../form/EditablePercentage.js";
import {EditableText} from "../../../form/editable_text/EditableText.js";
import {UncertainDateTimeForm} from "../../uncertain_datetime/UncertainDateTimeForm.js";
import {PredictionSummary} from "./PredictionSummary.js";
export function PredictionViewSummary(props) {
  const {prediction, on_change} = props;
  const {datetime, probability, conviction} = prediction;
  return /* @__PURE__ */ h(PredictionSummary, {
    datetime,
    probability: /* @__PURE__ */ h(EditablePercentage, {
      placeholder: "...",
      value: probability,
      conditional_on_change: on_change && ((new_probability) => on_change({...prediction, probability: new_probability}))
    }),
    conviction: /* @__PURE__ */ h(EditablePercentage, {
      placeholder: "...",
      value: conviction,
      conditional_on_change: on_change && ((new_conviction) => on_change({...prediction, conviction: new_conviction}))
    })
  });
}
export function PredictionViewDetails(props) {
  const {on_change, prediction} = props;
  const {explanation = ""} = prediction;
  const update_prediction = !on_change ? void 0 : (arg) => {
    const new_prediction = {...prediction, ...arg};
    on_change(new_prediction);
  };
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(UncertainDateTimeForm, {
    datetime: prediction.datetime,
    on_change: (datetime) => update_prediction && update_prediction({datetime})
  }), /* @__PURE__ */ h("br", null), (props.editing || explanation) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Explanation"), " ", /* @__PURE__ */ h(EditableText, {
    placeholder: "Explanation...",
    value: explanation,
    conditional_on_blur: update_prediction && ((new_explanation) => update_prediction({explanation: new_explanation}))
  })));
}
