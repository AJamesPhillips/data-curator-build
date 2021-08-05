import {h} from "../../../_snowpack/pkg/preact.js";
import {wcomponent_has_VAP_sets} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_current_VAP_set} from "../../shared/wcomponent/value_and_prediction/get_value_v2.js";
import {ConnectedValueAndPredictionSetSummary} from "./ConnectedValueAndPredictionSetSummary.js";
export function NodeValueAndPredictionSetSummary(props) {
  if (!wcomponent_has_VAP_sets(props.wcomponent))
    return null;
  const VAP_set = get_current_VAP_set({
    ...props,
    values_and_prediction_sets: props.wcomponent.values_and_prediction_sets
  });
  if (!VAP_set)
    return null;
  return /* @__PURE__ */ h(ConnectedValueAndPredictionSetSummary, {
    wcomponent: props.wcomponent,
    VAP_set,
    flexBasis: 100
  });
}
