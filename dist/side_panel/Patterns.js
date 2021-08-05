import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {EditPatternForm} from "../patterns/EditPatternForm.js";
import {PatternsList} from "../patterns/PatternsList.js";
import {NewPatternForm} from "../patterns/NewPatternForm.js";
import {Box, Typography} from "../../_snowpack/pkg/@material-ui/core.js";
const map_state = (state) => ({
  pattern: state.patterns.find(({id}) => id === state.routing.item_id),
  pattern_count: state.patterns.length
});
const connector = connect(map_state);
function _Patterns(props) {
  if (props.pattern) {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(EditPatternForm, {
      pattern: props.pattern
    }));
  }
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Typography, {
    component: "h2",
    gutterBottom: true
  }, "Add patterns"), /* @__PURE__ */ h(NewPatternForm, null), /* @__PURE__ */ h(Typography, {
    component: "h3",
    my: 3
  }, "Patterns: ", props.pattern_count), /* @__PURE__ */ h(PatternsList, null));
}
export const Patterns = connector(_Patterns);
