import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {LabelsList} from "../labels/LabelsList.js";
function map_state(state, props) {
  return {
    pattern: state.patterns.find(({id}) => id === props.object.pattern_id)
  };
}
const connector = connect(map_state);
function _ObjectLabels(props) {
  const labels = [...props.object.labels];
  if (props.pattern?.id)
    labels.push(props.pattern.id);
  return /* @__PURE__ */ h("div", {
    style: {display: "inline-block"}
  }, /* @__PURE__ */ h(LabelsList, {
    labels
  }));
}
export const ObjectLabels = connector(_ObjectLabels);
