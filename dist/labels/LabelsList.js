import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Label} from "./Label.js";
function map_state(state, {labels}) {
  const item_ids = new Set(labels);
  return {
    label_patterns: state.patterns.filter(({id}) => item_ids.has(id)),
    label_statements: state.statements.filter(({id}) => item_ids.has(id))
  };
}
const connector = connect(map_state);
function _LabelsList(props) {
  return /* @__PURE__ */ h("div", null, props.label_patterns.map((p) => /* @__PURE__ */ h(Label, {
    pattern: p,
    is_small: true
  })), props.label_statements.map((s) => /* @__PURE__ */ h(Label, {
    statement: s,
    is_small: true
  })));
}
export const LabelsList = connector(_LabelsList);
