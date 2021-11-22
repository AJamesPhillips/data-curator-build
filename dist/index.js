import "./shared/utils/monkey_patch.js";
import "./index.css.proxy.js";
import App from "./App.js";
import {h, render} from "../snowpack/pkg/preact.js";
import "../snowpack/pkg/preact/devtools.js";
import {Provider} from "../snowpack/pkg/react-redux.js";
import {get_store} from "./state/store.js";
import {DemoPredictionsGraph} from "./scratch_pad/PredictionsGraph.js";
import {DemoStatementProbability} from "./statements/StatementWithProbability.js";
import {DemoStatementProbabilityExplorer} from "./statements/StatementProbabilityExplorer.js";
import {DemoPredictionsBadge} from "./scratch_pad/DemoPredictionsBadge.js";
import {SandBox} from "./scratch_pad/SandBox.js";
import {SandboxEditableCustomDateTime} from "./scratch_pad/SandboxEditableCustomDateTime.js";
import {DemoProjectDashboard} from "./scratch_pad/DemoProjectDashboard.js";
import {SandboxWComponentCanvasNode} from "./scratch_pad/SandboxWComponentCanvasNode.js";
import {SandBoxConnected} from "./scratch_pad/SandBoxConnected.js";
import {SandBoxSupabase} from "./scratch_pad/SandBoxSupabase.js";
import {setup_window_on_focus_listener} from "./utils/window_on_focus_listener.js";
import {LandingPage} from "./home/LandingPage.js";
import {DevLandingPage} from "./home/DevLandingPage.js";
import {SimHome} from "./x_sim_app/SimHome.js";
import {setup_console_api} from "./x_console_api_app/setup_console_api.js";
import {set_window_title} from "./window_title.js";
const root = document.getElementById("root");
if (root) {
  const in_production = window.location.hostname === "datacurator.org";
  if (window.location.pathname === "" || window.location.pathname === "/") {
    if (in_production) {
      render(/* @__PURE__ */ h(LandingPage, null), root);
    } else {
      render(/* @__PURE__ */ h(DevLandingPage, null), root);
    }
  } else if (window.location.pathname === "/project_dashboard") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_storage: true})
    }, /* @__PURE__ */ h(DemoProjectDashboard, null)), root);
  } else if (window.location.pathname === "/prob_graph") {
    render(/* @__PURE__ */ h(DemoPredictionsGraph, null), root);
  } else if (window.location.pathname === "/prob_badge") {
    render(/* @__PURE__ */ h(DemoPredictionsBadge, null), root);
  } else if (window.location.pathname === "/statement_probability") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_storage: true})
    }, /* @__PURE__ */ h(DemoStatementProbability, null)), root);
  } else if (window.location.pathname === "/statement_probability_explorer") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_storage: true})
    }, /* @__PURE__ */ h(DemoStatementProbabilityExplorer, null)), root);
  } else if (window.location.pathname === "/sandbox/editable_custom_datetime") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_storage: false})
    }, /* @__PURE__ */ h(SandboxEditableCustomDateTime, null)), root);
  } else if (window.location.pathname === "/sandbox/canvas_nodes") {
    render(/* @__PURE__ */ h(SandboxWComponentCanvasNode, null), root);
  } else if (window.location.pathname === "/sandbox/connected") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_storage: false})
    }, /* @__PURE__ */ h(SandBoxConnected, null)), root);
  } else if (window.location.pathname === "/sandbox/supabase") {
    render(/* @__PURE__ */ h(SandBoxSupabase, null), root);
  } else if (window.location.pathname === "/sandbox") {
    render(/* @__PURE__ */ h(SandBox, null), root);
  } else if (window.location.pathname === "/app/" || window.location.pathname === "/app") {
    const store = get_store({load_state_from_storage: true});
    render(/* @__PURE__ */ h(Provider, {
      store
    }, /* @__PURE__ */ h(App, null)), root);
  } else if (window.location.pathname === "/sim/" || window.location.pathname === "/sim") {
    render(/* @__PURE__ */ h(SimHome, null), root);
  } else {
    root.innerText = "Unknown path: " + window.location.pathname;
  }
}
set_window_title();
setup_window_on_focus_listener();
setup_console_api();
