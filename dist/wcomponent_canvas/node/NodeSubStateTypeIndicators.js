import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {wcomponent_should_have_state_VAP_sets} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {LockClockIcon} from "../../sharedf/icons/LockClockIcon.js";
import {ReducedPossibilitiesIcon} from "../../sharedf/icons/ReducedPossibilitiesIcon.js";
import {convert_VAP_sets_to_visual_sub_state_value_possibilities} from "../../wcomponent_derived/sub_state/convert_VAP_sets_to_visual_sub_state_value_possibilities.js";
const map_state = (state, own_props) => {
  const {target_wcomponent_id} = own_props.wcomponent;
  const maybe_target_wcomponent = state.specialised_objects.wcomponents_by_id[target_wcomponent_id || ""];
  const target_wcomponent = wcomponent_should_have_state_VAP_sets(maybe_target_wcomponent) && maybe_target_wcomponent;
  return {
    target_wcomponent,
    presenting: state.display_options.consumption_formatting
  };
};
const connector = connect(map_state);
var SubStateTypeStatus;
(function(SubStateTypeStatus2) {
  SubStateTypeStatus2[SubStateTypeStatus2["not_set"] = 0] = "not_set";
  SubStateTypeStatus2[SubStateTypeStatus2["set"] = 1] = "set";
  SubStateTypeStatus2[SubStateTypeStatus2["invalid"] = 2] = "invalid";
})(SubStateTypeStatus || (SubStateTypeStatus = {}));
function _NodeSubStateTypeIndicators(props) {
  const {target_wcomponent, presenting} = props;
  if (!target_wcomponent || presenting)
    return null;
  const {selector} = props.wcomponent;
  const {target_VAP_set_id, target_value_id_type, target_value} = selector || {};
  const target_VAP_sets = target_wcomponent.values_and_prediction_sets || [];
  const time_substate = target_VAP_set_id === void 0 ? 0 : target_VAP_sets.find(({id}) => id === target_VAP_set_id) ? 1 : 2;
  const simple_possibilities = convert_VAP_sets_to_visual_sub_state_value_possibilities({selector, target_wcomponent});
  const possibility_substate = target_value_id_type === void 0 || target_value === void 0 ? 0 : simple_possibilities.find(({selected}) => selected) ? 1 : 2;
  const time_substate_color = sub_state_type_status_to_color(time_substate);
  const possibility_substate_color = sub_state_type_status_to_color(possibility_substate);
  return /* @__PURE__ */ h("div", {
    className: "sub_state_type_indicators"
  }, /* @__PURE__ */ h(LockClockIcon, {
    className: time_substate_color,
    title: "Specific Time " + sub_state_type_status_to_title(time_substate)
  }), /* @__PURE__ */ h(ReducedPossibilitiesIcon, {
    className: possibility_substate_color,
    title: "Specific Possibility " + sub_state_type_status_to_title(possibility_substate)
  }));
}
export const NodeSubStateTypeIndicators = connector(_NodeSubStateTypeIndicators);
function sub_state_type_status_to_color(status) {
  if (status === 1)
    return " sub_state_type_status__set ";
  if (status === 0)
    return " sub_state_type_status__not_set ";
  return " sub_state_type_status__invalid ";
}
function sub_state_type_status_to_title(status) {
  if (status === 1)
    return "Set";
  if (status === 0)
    return "Not set";
  return "Invalid";
}
