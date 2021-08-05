import "./index.css.proxy.js";
import App from "./App.js";
import "./shared/utils/monkey_patch.js";
import {h, render} from "../_snowpack/pkg/preact.js";
import "../_snowpack/pkg/preact/devtools.js";
import {Provider} from "../_snowpack/pkg/react-redux.js";
import {APP_DETAILS} from "./shared/constants.js";
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
const root = document.getElementById("root");
const title = document.getElementsByTagName("title")[0];
if (root) {
  const in_production = true;
  if (window.location.pathname === "" || window.location.pathname === "/") {
    let content = `
        <style>
            .alpha {
                color: #A00;
                vertical-align: super;
                font-size: small;
            }
        </style>

        <h1>DataCurator <span class="alpha">Alpha</span></h1>

        <div>
            <h4>Welcome</h4>
        </div>

        <div>
            To get started go to <a href="/app">/app</a> to create your first knowledge component.
        </div>

        <!--div>
            For more info see <a href="https://github.com/CenterOfCI/datacurator2">the repository on GitHub</a> containing the code.
        </div-->

        <br>
        `;
    if (!in_production) {
      content = `<ul>
            <li><a href="/app">app</a></li>
            <li><a href="/project_dashboard">Project dashboard</a></li>
            <li><a href="/prob_graph">Probability graph</a></li>
            <li><a href="/prob_badge">Probability badge</a></li>
            <li><a href="/statement_probability">Statement probability</a></li>
            <li><a href="/statement_probability_explorer">Statement probability explorer</a></li>
            <li><a href="/sandbox/editable_custom_datetime">Sandbox - EditableCustomDateTime</a></li>
            <li><a href="/sandbox/canvas_nodes">Sandbox - WComponentNode</a></li>
            <li><a href="/sandbox">Sandbox</a></li>
            </ul>`;
    }
    root.innerHTML = content;
  } else if (window.location.pathname === "/project_dashboard") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: true})
    }, /* @__PURE__ */ h(DemoProjectDashboard, null)), root);
  } else if (window.location.pathname === "/prob_graph") {
    render(/* @__PURE__ */ h(DemoPredictionsGraph, null), root);
  } else if (window.location.pathname === "/prob_badge") {
    render(/* @__PURE__ */ h(DemoPredictionsBadge, null), root);
  } else if (window.location.pathname === "/statement_probability") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: true})
    }, /* @__PURE__ */ h(DemoStatementProbability, null)), root);
  } else if (window.location.pathname === "/statement_probability_explorer") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: true})
    }, /* @__PURE__ */ h(DemoStatementProbabilityExplorer, null)), root);
  } else if (window.location.pathname === "/sandbox/editable_custom_datetime") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: false})
    }, /* @__PURE__ */ h(SandboxEditableCustomDateTime, null)), root);
  } else if (window.location.pathname === "/sandbox/canvas_nodes") {
    render(/* @__PURE__ */ h(SandboxWComponentCanvasNode, null), root);
  } else if (window.location.pathname === "/sandbox/connected") {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: false})
    }, /* @__PURE__ */ h(SandBoxConnected, null)), root);
  } else if (window.location.pathname === "/sandbox") {
    render(/* @__PURE__ */ h(SandBox, null), root);
  } else {
    render(/* @__PURE__ */ h(Provider, {
      store: get_store({load_state_from_server: true})
    }, /* @__PURE__ */ h(App, null)), root);
  }
}
if (title) {
  title.innerHTML = APP_DETAILS.NAME;
}
