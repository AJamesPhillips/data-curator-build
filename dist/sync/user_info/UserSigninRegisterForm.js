import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "../common.css.proxy.js";
import {ACTIONS} from "../../state/actions.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {DisplaySupabaseSessionError} from "./DisplaySupabaseErrors.js";
const map_state = (state) => {
  return {};
};
const map_dispatch = {
  set_user: ACTIONS.user_info.set_user
};
const connector = connect(map_state, map_dispatch);
function _UserSigninRegisterForm(props) {
  const {set_user} = props;
  const supabase = get_supabase();
  const [form_state, set_form_state] = useState("initial");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [supabase_session_error, set_supabase_session_error] = useState(null);
  async function register() {
    const {user: new_user, error} = await supabase.auth.signUp({email, password});
    set_supabase_session_error(error);
    if (!error)
      set_form_state("registered");
  }
  async function sign_in() {
    const {user, error} = await supabase.auth.signIn({email, password});
    set_supabase_session_error(error);
    set_user({user});
  }
  async function forgot_password() {
    const {data, error} = await supabase.auth.api.resetPasswordForEmail(email);
    set_supabase_session_error(error);
    if (!error)
      set_form_state("reset_password");
  }
  if (form_state === "initial")
    return /* @__PURE__ */ h("div", {
      className: "section"
    }, /* @__PURE__ */ h("form", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "email",
      placeholder: "email",
      value: email,
      onKeyUp: (e) => set_email(e.currentTarget.value),
      onChange: (e) => set_email(e.currentTarget.value),
      onBlur: (e) => set_email(e.currentTarget.value)
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "password",
      placeholder: "password",
      value: password,
      onKeyUp: (e) => set_password(e.currentTarget.value),
      onChange: (e) => set_password(e.currentTarget.value),
      onBlur: (e) => set_password(e.currentTarget.value)
    }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "button",
      disabled: !email || !password,
      onClick: sign_in,
      value: "Signin"
    }), "  ", /* @__PURE__ */ h("input", {
      type: "button",
      disabled: !email || !password,
      onClick: register,
      value: "Register"
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "button",
      disabled: !email,
      onClick: forgot_password,
      value: "Forgot password?"
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
      error: supabase_session_error
    }), /* @__PURE__ */ h("br", null));
  else if (form_state === "reset_password")
    return /* @__PURE__ */ h("div", {
      className: "section"
    }, /* @__PURE__ */ h("h3", null, "Password reset"), /* @__PURE__ */ h("br", null), !supabase_session_error && "Please check your email", /* @__PURE__ */ h(DisplaySupabaseSessionError, {
      error: supabase_session_error
    }));
  else
    return /* @__PURE__ */ h("div", {
      className: "section"
    }, /* @__PURE__ */ h("h3", null, "Registered"), /* @__PURE__ */ h("br", null), "Please check your email");
}
export const UserSigninRegisterForm = connector(_UserSigninRegisterForm);
