import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
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
      set_user({user: result.user});
      set_need_to_handle_password_recovery(false);
      on_close();
    }
  }
  return /* @__PURE__ */ h("div", {
    className: "section"
  }, need_to_handle_password_recovery && /* @__PURE__ */ h("div", null, "Please set a new passowrd"), /* @__PURE__ */ h("form", null, /* @__PURE__ */ h("input", {
    type: "password",
    placeholder: "password",
    value: password,
    onKeyUp: (e) => set_password(e.currentTarget.value),
    onChange: (e) => set_password(e.currentTarget.value),
    onBlur: (e) => set_password(e.currentTarget.value)
  }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h("input", {
    type: "button",
    disabled: !user?.email || !password,
    onClick: update_password,
    value: "Update password"
  }), /* @__PURE__ */ h("br", null), !need_to_handle_password_recovery && /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      on_close();
      set_supabase_session_error(null);
    },
    value: "Cancel"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(DisplaySupabaseSessionError, {
    error: supabase_session_error
  }));
}
export const UserAccountInfoChangePasswordForm = connector(_UserAccountInfoChangePasswordForm);
