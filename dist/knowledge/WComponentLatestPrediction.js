import {h} from "../../_snowpack/pkg/preact.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  created_at_ms: state.routing.args.created_at_ms,
  sim_ms: state.routing.args.sim_ms
});
const connector = connect(map_state);
function _WComponentLatestPrediction(props) {
  const {wcomponent, created_at_ms, sim_ms} = props;
  const invalid = false;
  if (invalid) {
    return /* @__PURE__ */ h("p", {
      style: {cursor: "not-allowed", display: "inline-flex", marginBlockEnd: 0}
    }, "Not valid (last validity prediction)");
  }
  return null;
}
export const WComponentLatestPrediction = connector(_WComponentLatestPrediction);
