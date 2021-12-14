import "./shared/utils/monkey_patch.js";
import "./index.css.proxy.js";
import {h, render} from "../snowpack/pkg/preact.js";
import "../snowpack/pkg/preact/devtools.js";
import {LandingPage} from "./home/LandingPage.js";
import {set_window_title} from "./window_title/set_window_title.js";
const root = document.getElementById("root");
if (root) {
  root.innerText = "";
  render(/* @__PURE__ */ h(LandingPage, null), root);
}
set_window_title();
