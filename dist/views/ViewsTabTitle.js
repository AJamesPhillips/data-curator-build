import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
const map_state = (state) => ({
  current_view: state.routing.args.view
});
const connector = connect(map_state);
function _ViewsTabTitle(props) {
  const {current_view} = props;
  const view = sentence_case(current_view).replaceAll("_", " ");
  return /* @__PURE__ */ h("div", null, "View (", view, ")");
}
export const ViewsTabTitle = connector(_ViewsTabTitle);
