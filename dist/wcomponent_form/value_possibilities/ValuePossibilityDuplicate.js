import {h} from "../../../snowpack/pkg/preact.js";
import {Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import WarningIcon from "../../../snowpack/pkg/@material-ui/icons/Warning.js";
export function ValuePossibilityDuplicate(props) {
  const {warning, label = "Duplicate"} = props;
  return /* @__PURE__ */ h(Typography, {
    noWrap: true,
    variant: "caption",
    title: warning,
    "aria-label": warning,
    style: {display: warning ? "inline" : "none"}
  }, /* @__PURE__ */ h(WarningIcon, null), /* @__PURE__ */ h("span", {
    style: {position: "relative", top: -7}
  }, label));
}
