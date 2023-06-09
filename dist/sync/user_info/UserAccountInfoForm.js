import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Box, Button, makeStyles, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import LogoutIcon from "../../../snowpack/pkg/@material-ui/icons/ExitToApp.js";
import "../common.css.proxy.js";
import {ACTIONS} from "../../state/actions.js";
import {selector_need_to_set_user_name, selector_user_name} from "../../state/user_info/selector.js";
import {save_and_optionally_signout} from "../../state/user_info/signout.js";
import {DisplaySupabaseSessionError} from "./DisplaySupabaseErrors.js";
import {UserAccountInfoChangePasswordForm} from "./UserAccountInfoChangePasswordForm.js";
import {UserAccountInfoChangeUsernameForm} from "./UserAccountInfoChangeUsernameForm.js";
const map_state = (state) => {
  const {need_to_handle_password_recovery} = state.user_info;
  return {
    user: state.user_info.user,
    user_name: selector_user_name(state),
    need_to_set_user_name: selector_need_to_set_user_name(state),
    need_to_handle_password_recovery
  };
};
const map_dispatch = {
  set_user: ACTIONS.user_info.set_user
};
const connector = connect(map_state, map_dispatch);
const use_styles = makeStyles((theme) => ({
  root: {
    margin: 5
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logout_section: {
    flexBasis: "100%"
  },
  button: {
    marginBottom: 5
  },
  label: {
    marginBottom: 10
  }
}));
function _UserAccountInfoForm(props) {
  const {user, user_name, need_to_set_user_name, need_to_handle_password_recovery, set_user} = props;
  const [form_state, set_form_state] = useState("initial");
  const [supabase_session_error, set_supabase_session_error] = useState(null);
  console.log("user account info form need_to_set_user_name", need_to_set_user_name, "form_state", form_state);
  useEffect(() => {
    if (need_to_set_user_name)
      set_form_state("updating_username");
  }, [need_to_set_user_name, form_state]);
  if (!user)
    return null;
  if (form_state === "updating_password" || need_to_handle_password_recovery) {
    return /* @__PURE__ */ h(UserAccountInfoChangePasswordForm, {
      on_close: () => set_form_state("initial")
    });
  }
  if (form_state === "updating_username") {
    return /* @__PURE__ */ h(UserAccountInfoChangeUsernameForm, {
      on_close: () => set_form_state("initial")
    });
  }
  const classes = use_styles();
  return /* @__PURE__ */ h(Box, {
    className: classes.root
  }, /* @__PURE__ */ h(Box, {
    className: `${classes.section} ${classes.logout_section} section`
  }, /* @__PURE__ */ h("p", null, "Logged in with", /* @__PURE__ */ h("strong", null, " ", user.email, " ")), /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Button, {
    onClick: () => save_and_optionally_signout(true),
    variant: "contained",
    endIcon: /* @__PURE__ */ h(LogoutIcon, null)
  }, "Log out"))), /* @__PURE__ */ h(Box, {
    className: `${classes.section} section`,
    display: "flex",
    justifyContent: "space-between"
  }, /* @__PURE__ */ h(Typography, {
    component: "p"
  }, "User name ", /* @__PURE__ */ h("strong", null, user_name ? `: ${user_name}` : ""), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("small", null, "user id:   ", user.id)), /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Button, {
    className: classes.button,
    variant: "contained",
    onClick: () => set_form_state("updating_username")
  }, need_to_set_user_name ? "Set" : "Change", " username"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(Button, {
    variant: "contained",
    onClick: () => set_form_state("updating_password")
  }, "Change password"))), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
    error: supabase_session_error
  }));
}
export const UserAccountInfoForm = connector(_UserAccountInfoForm);
