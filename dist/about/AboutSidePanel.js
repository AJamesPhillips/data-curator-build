import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
const map_state = (state) => {
  const ready = state.sync.ready;
  return {ready};
};
const connector = connect(map_state);
function _AboutSidePanel(props) {
  return /* @__PURE__ */ h("div", null, !props.ready && /* @__PURE__ */ h("div", null, "Loading..."), /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Version"), " ", /* @__PURE__ */ h("b", null, "2021-06-27 10:10 UTC"));
}
export const AboutSidePanel = connector(_AboutSidePanel);
