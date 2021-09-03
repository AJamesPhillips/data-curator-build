import {getDefaultSession} from "../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {h} from "../../snowpack/pkg/preact.js";
import {load_solid_data} from "../state/sync/utils/solid_load_data.js";
import {save_solid_data} from "../state/sync/utils/solid_save_data.js";
import {start_login} from "../sync/user_info/solid/handle_login.js";
import "./SandBox.css.proxy.js";
export function SandBoxSolid() {
  const solid_session = getDefaultSession();
  return /* @__PURE__ */ h("div", null, solid_session.info.isLoggedIn ? "Logged in" : /* @__PURE__ */ h("div", {
    onClick: () => {
      start_login(solid_session, "https://broker.pod.inrupt.com");
    }
  }, "Signin"), solid_session.info.isLoggedIn && /* @__PURE__ */ h("div", {
    onClick: () => main()
  }, "Save and load"));
}
async function main() {
  const url = "https://pod.inrupt.com/ajp/";
  const state = {
    user_info: {
      solid_oidc_provider: "https://broker.pod.inrupt.com",
      user_name: "abc",
      default_solid_pod_URL: url,
      custom_solid_pod_URLs: [],
      chosen_custom_solid_pod_URL_index: 0
    }
  };
  await save_solid_data(state.user_info, {
    knowledge_views: knowledge_views.map((j) => JSON.parse(j)),
    wcomponents: wcomponents.map((j) => JSON.parse(j)),
    perceptions: [],
    wcomponent_ids_to_delete: new Set()
  });
  const items = await load_solid_data(state);
  console.log("got items", items);
}
const knowledge_views = [];
const wcomponents = [];
