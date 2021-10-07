import {h} from "../../snowpack/pkg/preact.js";
import SyncIcon from "../../snowpack/pkg/@material-ui/icons/Sync.js";
import SyncProblemIcon from "../../snowpack/pkg/@material-ui/icons/SyncProblem.js";
export function SyncButton(props) {
  const {state, text = "Refresh", title = "Refresh", on_click, style} = props;
  const error = state === "error";
  return /* @__PURE__ */ h("span", {
    title,
    onClick: on_click,
    style
  }, text, !error && /* @__PURE__ */ h(SyncIcon, {
    className: state === "in_progress" ? "animate spinning" : ""
  }), error && /* @__PURE__ */ h(SyncProblemIcon, null));
}
