import {getDefaultSession} from "../../../snowpack/pkg/@inrupt/solid-client-authn-browser.js";
import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {finish_login} from "./solid/handle_login.js";
import {SelectSolidUser} from "./solid/SelectSolidUser.js";
import ExitToAppIcon from "../../../snowpack/pkg/@material-ui/icons/ExitToApp.js";
const map_state = (state) => {
  return {
    storage_type: state.sync.storage_type,
    user_name: state.user_info.user_name
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _UserInfo(props) {
  const {storage_type, user_name} = props;
  const [show_solid_signin_form, set_show_solid_signin_form] = useState(false);
  if (storage_type !== "solid")
    return null;
  const solid_session = getDefaultSession();
  useEffect(() => {
    finish_login().then(() => set_show_solid_signin_form(!solid_session.info.isLoggedIn));
  }, []);
  const on_close = () => {
    set_show_solid_signin_form(false);
  };
  return /* @__PURE__ */ h(Button, {
    color: "primary",
    endIcon: /* @__PURE__ */ h(ExitToAppIcon, null),
    fullWidth: true,
    disableElevation: true,
    onClick: () => set_show_solid_signin_form(true),
    size: "small",
    style: {textTransform: "none"},
    variant: "contained"
  }, /* @__PURE__ */ h(Typography, {
    noWrap: true
  }, user_name || (solid_session.info.isLoggedIn ? "(No user name)" : "Sign in")), show_solid_signin_form && /* @__PURE__ */ h(SelectSolidUser, {
    on_close
  }));
}
export const UserInfo = connector(_UserInfo);
