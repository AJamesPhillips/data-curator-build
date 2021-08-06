import {h} from "../../snowpack/pkg/preact.js";
import "./MainArea.css.proxy.js";
import {MainContentControls} from "./MainContentControls.js";
import {Box} from "../../snowpack/pkg/@material-ui/core.js";
export function MainArea(props) {
  return /* @__PURE__ */ h(Box, {
    id: "main_area",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1
  }, /* @__PURE__ */ h(Box, {
    id: "main_content",
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    flexDirection: "column"
  }, props.main_content), /* @__PURE__ */ h(Box, {
    id: "main_content_controls",
    flexGrow: 0,
    flexShrink: 1
  }, /* @__PURE__ */ h(MainContentControls, null)));
}
