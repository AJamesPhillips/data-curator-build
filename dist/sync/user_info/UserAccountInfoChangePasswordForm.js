import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Box, Button, FormControl, FormGroup, makeStyles, TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import "../common.css.proxy.js";
import {ACTIONS} from "../../state/actions.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {DisplaySupabaseSessionError} from "./DisplaySupabaseErrors.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    need_to_handle_password_recovery: state.user_info.need_to_handle_password_recovery
  };
};
const map_dispatch = {
  set_user: ACTIONS.user_info.set_user,
  set_need_to_handle_password_recovery: ACTIONS.user_info.set_need_to_handle_password_recovery
};
const connector = connect(map_state, map_dispatch);
function _UserAccountInfoChangePasswordForm(props) {
  const {on_close, user, need_to_handle_password_recovery, set_user, set_need_to_handle_password_recovery} = props;
  const [password, set_password] = useState("");
  const [supabase_session_error, set_supabase_session_error] = useState(null);
  if (!user)
    return null;
  async function update_password() {
    const supabase = get_supabase();
    const email = user?.email;
    const result = await supabase.auth.update({email, password});
    set_supabase_session_error(result.error);
    if (!result.error) {
      set_user({user: result.user || void 0});
      set_need_to_handle_password_recovery(false);
      on_close();
    }
  }
  const classes = use_styles();
  return /* @__PURE__ */ h(FormGroup, {
    className: "section"
  }, need_to_handle_password_recovery && /* @__PURE__ */ h("p", null, "Please set a new password."), /* @__PURE__ */ h(Box, {
    className: classes.root
  }, /* @__PURE__ */ h(FormControl, null, /* @__PURE__ */ h(TextField, {
    inputProps: {
      type: "password"
    },
    onBlur: (e) => set_password(e.currentTarget.value),
    onChange: (e) => set_password(e.currentTarget.value),
    onKeyUp: (e) => set_password(e.currentTarget.value),
    label: "password",
    size: "small",
    value: password,
    variant: "outlined"
  })), /* @__PURE__ */ h(Box, {
    className: classes.update_button_container
  }, /* @__PURE__ */ h(Button, {
    className: classes.update_button,
    disabled: !user?.email || !password,
    onClick: update_password,
    variant: "contained"
  }, "Update password")), /* @__PURE__ */ h(Box, null, !need_to_handle_password_recovery && /* @__PURE__ */ h(Button, {
    variant: "contained",
    onClick: () => {
      on_close();
      set_supabase_session_error(null);
    }
  }, "Cancel"))), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
    error: supabase_session_error
  }));
}
const use_styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center"
  },
  update_button_container: {
    flexGrow: 1,
    textAlign: "left",
    marginLeft: 15
  },
  update_button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
}));
export const UserAccountInfoChangePasswordForm = connector(_UserAccountInfoChangePasswordForm);
