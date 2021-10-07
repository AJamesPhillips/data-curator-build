import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {wcomponent_is_statev2} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
const map_state = (state, own_props) => {
  const {target_wcomponent_id, selector} = own_props.wcomponent;
  const maybe_target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wcomponent_id || ""];
  const target_wcomponent = wcomponent_is_statev2(maybe_target_wcomponent) && maybe_target_wcomponent;
  return {
    target_wcomponent
  };
};
const connector = connect(map_state);
function _NodeSubStateSummary(props) {
  const {target_wcomponent} = props;
  const {selector} = props.wcomponent;
  if (!target_wcomponent)
    return null;
  if (!selector)
    return null;
  const {target_VAP_set_id, target_value_id_type, target_value} = selector;
  if (!target_VAP_set_id && (!target_value_id_type || !target_value))
    return null;
  return /* @__PURE__ */ h("div", null, "Target: ", target_wcomponent.title);
}
export const NodeSubStateSummary = connector(_NodeSubStateSummary);
