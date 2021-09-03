import {Button} from "../../../../snowpack/pkg/@material-ui/core.js";
import {getDefaultSession} from "../../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {h} from "../../../../snowpack/pkg/preact.js";
import {useState} from "../../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../../snowpack/pkg/react-redux.js";
import "../../common.css.proxy.js";
import {ACTIONS} from "../../../state/actions.js";
import {remove_index, replace_element} from "../../../utils/list.js";
import {AutoFillOIDC} from "./AutoFillOIDC.js";
import {get_solid_users_name_and_pod_URL} from "./get_solid_username.js";
import {finish_login, start_login} from "./handle_login.js";
import {PodProviderRow} from "./PodProviderRow.js";
import {OIDC_provider_map} from "./urls.js";
import {signout} from "../../../state/user_info/signout.js";
const map_state = (state) => {
  return {
    solid_oidc_provider: state.user_info.solid_oidc_provider || OIDC_provider_map["inrupt.com"],
    user_name: state.user_info.user_name,
    default_solid_pod_URL: state.user_info.default_solid_pod_URL,
    custom_solid_pod_URLs: state.user_info.custom_solid_pod_URLs,
    chosen_custom_solid_pod_URL_index: state.user_info.chosen_custom_solid_pod_URL_index
  };
};
const map_dispatch = {
  update_solid_oidc_provider: ACTIONS.user_info.update_solid_oidc_provider,
  update_users_name_and_solid_pod_URL: ACTIONS.user_info.update_users_name_and_solid_pod_URL,
  update_custom_solid_pod_URLs: ACTIONS.user_info.update_custom_solid_pod_URLs,
  update_chosen_custom_solid_pod_URL_index: ACTIONS.user_info.update_chosen_custom_solid_pod_URL_index
};
const connector = connect(map_state, map_dispatch);
function _SolidSigninForm(props) {
  const solid_session = getDefaultSession();
  const [logged_in, _set_logged_in] = useState(solid_session.info.isLoggedIn);
  const set_logged_in = () => _set_logged_in(solid_session.info.isLoggedIn);
  const started_logged_in = solid_session.info.isLoggedIn;
  finish_login().then(() => {
    set_logged_in();
    const changed_login_state = started_logged_in !== solid_session.info.isLoggedIn;
    if (!changed_login_state)
      return;
    get_solid_users_name_and_pod_URL().then((args) => props.update_users_name_and_solid_pod_URL(args));
  });
  const log_inout_label = logged_in ? "Logout" : "Login";
  return /* @__PURE__ */ h("div", {
    style: {margin: 10}
  }, /* @__PURE__ */ h("div", {
    className: "section"
  }, "OIDC (Open ID Connect) Provider (they allow you to prove who you are) ", /* @__PURE__ */ h("input", {
    type: "text",
    style: {width: 250},
    value: props.solid_oidc_provider,
    onBlur: (e) => props.update_solid_oidc_provider({solid_oidc_provider: e.currentTarget.value})
  }), /* @__PURE__ */ h("br", null), "   Use:  ", /* @__PURE__ */ h(AutoFillOIDC, {
    solid_oidc_provider_root: "inrupt.com"
  }), logged_in && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), "You are signed in as: ", /* @__PURE__ */ h("a", {
    href: solid_session.info.webId,
    target: "_blank"
  }, solid_session.info.webId), "  with user name: ", props.user_name), props.solid_oidc_provider && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), log_inout_label, " ", logged_in ? "of" : "to", " Solid: ", /* @__PURE__ */ h("button", {
    onClick: async (e) => {
      e.stopImmediatePropagation();
      if (logged_in) {
        await signout();
        set_logged_in();
      } else {
        start_login(solid_session, props.solid_oidc_provider);
      }
    }
  }, log_inout_label))), /* @__PURE__ */ h("div", {
    className: "section"
  }, "Pod provider (where you want to get data from / save data to)", /* @__PURE__ */ h("table", null, /* @__PURE__ */ h("tbody", null, /* @__PURE__ */ h(PodProviderRow, {
    solid_pod_URL_index: 0,
    value: `Use default Pod provider ${quote_or_empty(props.default_solid_pod_URL)}`
  }), props.custom_solid_pod_URLs.map((url, index) => {
    const on_delete = url === props.default_solid_pod_URL ? void 0 : () => {
      const custom_solid_pod_URLs = remove_index(props.custom_solid_pod_URLs, index);
      props.update_custom_solid_pod_URLs({custom_solid_pod_URLs});
    };
    return /* @__PURE__ */ h(PodProviderRow, {
      solid_pod_URL_index: index + 1,
      value: url,
      on_change_value: (value) => {
        const custom_solid_pod_URLs = replace_element(props.custom_solid_pod_URLs, value, (url1) => url1 === url);
        props.update_custom_solid_pod_URLs({custom_solid_pod_URLs});
      },
      on_delete
    });
  }), /* @__PURE__ */ h(PodProviderRow, {
    on_change_value: () => {
    },
    on_add: (url) => {
      const custom_solid_pod_URLs = [...props.custom_solid_pod_URLs, url];
      props.update_custom_solid_pod_URLs({custom_solid_pod_URLs});
    }
  })))), logged_in && /* @__PURE__ */ h("div", {
    className: "section",
    onClick: props.on_close
  }, /* @__PURE__ */ h(Button, null, "Return to application")));
}
export const SolidSigninForm = connector(_SolidSigninForm);
function quote_or_empty(str) {
  return str ? `"${str}"` : "";
}
