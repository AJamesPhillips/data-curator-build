import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
const map_state = (state) => {
  return {};
};
const connector = connect(map_state);
function _AboutSidePanel(props) {
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Version"), " ", /* @__PURE__ */ h("b", null, "2022-02-02"));
}
export const AboutSidePanel = connector(_AboutSidePanel);
