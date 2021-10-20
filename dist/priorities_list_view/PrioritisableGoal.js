import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {EditableNumber} from "../form/EditableNumber.js";
import {WComponentCanvasNode} from "../wcomponent_canvas/node/WComponentCanvasNode.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _PrioritisableGoal(props) {
  const {goal, selected_prioritisation, editing} = props;
  const goal_prioritisation_attributes = selected_prioritisation && selected_prioritisation.goals || {};
  const effort = goal_prioritisation_attributes[goal.id]?.effort;
  return /* @__PURE__ */ h("div", {
    style: {display: "flex"}
  }, /* @__PURE__ */ h(WComponentCanvasNode, {
    id: goal.id,
    on_graph: false
  }), selected_prioritisation && (editing || !!effort) && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Effort",
    allow_undefined: true,
    value: effort,
    conditional_on_blur: (new_effort) => {
      const goals_attributes = {...goal_prioritisation_attributes};
      if (new_effort === void 0)
        delete goals_attributes[goal.id];
      else
        goals_attributes[goal.id] = {effort: new_effort};
      const new_selected_prioritisation = {...selected_prioritisation, goals: goals_attributes};
      props.upsert_wcomponent({wcomponent: new_selected_prioritisation});
    }
  })));
}
export const PrioritisableGoal = connector(_PrioritisableGoal);
