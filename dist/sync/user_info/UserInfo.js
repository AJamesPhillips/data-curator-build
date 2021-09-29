import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import ExitToAppIcon from "../../../snowpack/pkg/@material-ui/icons/ExitToApp.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useRef} from "../../../snowpack/pkg/preact/hooks.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {selector_need_to_set_user_name} from "../../state/user_info/selector.js";
import {no_user_name} from "./constants.js";
import {UserAccountInfo} from "./UserAccountInfo.js";
import {UserSigninRegister} from "./UserSigninRegister.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    user_name: state.user_info.user_name,
    need_to_set_user_name: selector_need_to_set_user_name(state)
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _UserInfo(props) {
  const {user, user_name, need_to_set_user_name} = props;
  const [form_state, set_form_state] = useState("hidden");
  const previous_user = useRef(user);
  const user_name_or_none = user_name || no_user_name;
  useEffect(() => {
    const previous_signed_out = !previous_user.current && user;
    previous_user.current = user;
    const new_form_state = !user ? "signin" : need_to_set_user_name ? "account_info" : previous_signed_out ? "hidden" : form_state;
    set_form_state(new_form_state);
  }, [user, need_to_set_user_name]);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
    color: "primary",
    endIcon: /* @__PURE__ */ h(ExitToAppIcon, null),
    fullWidth: true,
    disableElevation: true,
    onClick: () => set_form_state("account_info"),
    size: "small",
    style: {textTransform: "none"},
    variant: "contained"
  }, /* @__PURE__ */ h(Typography, {
    noWrap: true
  }, user ? user_name_or_none : "Sign in")), form_state === "signin" && /* @__PURE__ */ h(UserSigninRegister, {
    on_close: !user ? void 0 : () => set_form_state("hidden")
  }), form_state === "account_info" && /* @__PURE__ */ h(UserAccountInfo, {
    on_close: need_to_set_user_name ? void 0 : () => set_form_state("hidden")
  }));
}
export const UserInfo = connector(_UserInfo);
