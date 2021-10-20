import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import "./ValueAndPredictionSetSummary.css.proxy.js";
import {get_wcomponent_VAPs_represent} from "../../wcomponent/get_wcomponent_VAPs_represent.js";
import {
  convert_VAP_set_to_VAP_visuals
} from "../../wcomponent_derived/value_and_prediction/convert_VAP_set_to_VAP_visuals.js";
import {ValueAndPredictionEntryRow} from "./ValueAndPredictionEntryRow.js";
export function ValueAndPredictionSetSummary(props) {
  const [show_all_judgements, set_show_all_judgements] = useState(false);
  const {counterfactual_VAP_set, VAP_id_to_counterfactuals_info_map} = props;
  const VAPs_represent = get_wcomponent_VAPs_represent(props.wcomponent);
  const VAP_visuals_data = convert_VAP_set_to_VAP_visuals({...props, VAP_set: counterfactual_VAP_set, VAPs_represent});
  const data_with_non_zero_certainty = VAP_visuals_data.filter((d) => d.certainty > 0);
  return /* @__PURE__ */ h(Box, {
    height: "100%",
    maxWidth: "100%",
    minWidth: 100,
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "stretch",
    alignContent: "stretch",
    className: `value_and_prediction_set_summary items-${VAP_visuals_data.length} visible-${data_with_non_zero_certainty.length}`,
    onPointerOver: () => set_show_all_judgements(true),
    onPointerLeave: () => set_show_all_judgements(false)
  }, VAP_visuals_data.map((VAP_visual, index) => {
    const show_judgements = show_all_judgements || index === 0;
    return /* @__PURE__ */ h(ValueAndPredictionEntryRow, {
      wcomponent: props.wcomponent,
      VAP_visual,
      show_judgements,
      counterfactual_VAP_set,
      VAP_id_to_counterfactuals_info_map
    });
  }));
}
