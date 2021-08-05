import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {get_perception_from_state} from "../state/specialised_objects/accessors.js";
import {PerceptionForm} from "./PerceptionForm.js";
import {PerceptionsList} from "./PerceptionsList.js";
const map_state = (state) => {
  const ready = state.sync.ready;
  const id = state.routing.item_id;
  const perception = get_perception_from_state(state, id);
  return {ready, id, perception};
};
const connector = connect(map_state);
function _PerceptionsSidePanel(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  if (!props.id)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("p", null, "Or select a perception to view"), /* @__PURE__ */ h(PerceptionsList, null));
  if (!props.perception)
    return /* @__PURE__ */ h("div", null, "Perception not found for id: ", props.id);
  return /* @__PURE__ */ h(PerceptionForm, {
    perception: props.perception
  });
}
export const PerceptionsSidePanel = connector(_PerceptionsSidePanel);
