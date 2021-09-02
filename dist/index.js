import "./index.css.proxy.js";
import App from "./App.js";
import "./shared/utils/monkey_patch.js";
import {h, render} from "../snowpack/pkg/preact.js";
import "../snowpack/pkg/preact/devtools.js";
import {Provider} from "../snowpack/pkg/react-redux.js";
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
import {correct_path, finish_login} from "./sync/user_info/solid/handle_login.js";
import {getDefaultSession, onSessionRestore} from "../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {is_using_solid_for_storage} from "./state/sync/persistance.js";
import {get_solid_users_name_and_pod_URL} from "./sync/user_info/solid/get_solid_username.js";
import {OIDC_provider_map} from "./sync/user_info/solid/urls.js";
import {get_persisted_state_object, persist_state_object} from "./state/persistence/persistence_utils.js";
import {find_match_by_inclusion_of_key} from "./utils/object.js";
import {SandBoxSolid} from "./scratch_pad/SandBoxSolid.js";
const root = document.getElementById("root");
const title = document.getElementsByTagName("title")[0];
if (root) {
  const in_production = window.location.hostname.endsWith("datacurator.org");
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
            To get started go to <a href="/app/">/app</a> to create your first knowledge component.
        </div>

        <!--div>
            For more info see <a href="https://github.com/CenterOfCI/datacurator2">the repository on GitHub</a> containing the code.
        </div-->

        <br>
        `;
    if (!in_production) {
      content = `<ul>
            <li><a href="/app/">app</a></li>
            <li><a href="/project_dashboard">Project dashboard</a></li>
            <li><a href="/prob_graph">Probability graph</a></li>
            <li><a href="/prob_badge">Probability badge</a></li>
            <li><a href="/statement_probability">Statement probability</a></li>
            <li><a href="/statement_probability_explorer">Statement probability explorer</a></li>
            <li><a href="/sandbox/editable_custom_datetime">Sandbox - EditableCustomDateTime</a></li>
            <li><a href="/sandbox/canvas_nodes">Sandbox - WComponentNode</a></li>
            <li><a href="/sandbox/solid">Sandbox - Solid</a></li>
            <li><a href="/sandbox">Sandbox</a></li>
            </ul>`;
    }
    root.innerHTML = content;
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
  } else if (window.location.pathname === "/sandbox/solid") {
    restore_session(root).then(() => {
      render(/* @__PURE__ */ h(SandBoxSolid, null), root);
    });
  } else if (window.location.pathname === "/sandbox") {
    render(/* @__PURE__ */ h(SandBox, null), root);
  } else if (window.location.pathname === "/app/" || window.location.pathname === "/app") {
    restore_session(root).then(() => {
      const store = get_store({load_state_from_storage: true});
      render(/* @__PURE__ */ h(Provider, {
        store
      }, /* @__PURE__ */ h(App, null)), root);
    });
  } else {
    root.innerText = "Unknown path: " + window.location.pathname;
  }
}
if (title) {
  title.innerHTML = APP_DETAILS.NAME;
}
function restore_session(root_el) {
  const using_solid_for_storage = is_using_solid_for_storage();
  if (using_solid_for_storage) {
    root_el.innerHTML = "Requesting Solid login session...";
    onSessionRestore((url) => {
      console.log("onSessionRestore url ", url);
      if (document.location.toString() !== url) {
        if (document.location.pathname !== new URL(url).pathname)
          document.location.href = url;
        else
          history.replaceState(null, "", url);
      }
    });
    console.log("starting `restore_session` at " + document.location.toString());
    return correct_path().then(() => finish_login()).then(() => get_solid_users_name_and_pod_URL()).then((args) => {
      console.log("Signed in as user name: " + args.user_name);
      const solid_session = getDefaultSession();
      let solid_oidc_provider = solid_session.info.webId || get_persisted_state_object("user_info").solid_oidc_provider || "";
      const match = find_match_by_inclusion_of_key(solid_oidc_provider, OIDC_provider_map);
      solid_oidc_provider = match ? match[1] : "";
      const partial_user_info = {
        ...get_persisted_state_object("user_info"),
        ...args,
        solid_oidc_provider
      };
      persist_state_object("user_info", partial_user_info);
      console.log("Persisted user_info: ", get_persisted_state_object("user_info"));
      root_el.innerHTML = "";
    });
  }
  return Promise.resolve();
}
