import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import ExitToAppIcon from "../../../snowpack/pkg/@material-ui/icons/ExitToApp.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useRef} from "../../../snowpack/pkg/preact/hooks.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {selector_need_to_set_user_name, selector_user_name} from "../../state/user_info/selector.js";
import {no_user_name} from "./constants.js";
import {UserAccountInfo} from "./UserAccountInfo.js";
import {UserSigninRegister} from "./UserSigninRegister.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    bases_by_id: state.user_info.bases_by_id,
    users_by_id: state.user_info.users_by_id,
    chosen_base_id: state.user_info.chosen_base_id,
    user_name: selector_user_name(state),
    need_to_set_user_name: selector_need_to_set_user_name(state)
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _UserInfo(props) {
  const {user, bases_by_id, users_by_id, chosen_base_id, user_name, need_to_set_user_name} = props;
  const is_loading_users = !users_by_id;
  const [form_state, set_form_state] = useState("hidden");
  const previous_user = useRef(user);
  const user_name_or_none = user_name || no_user_name;
  useEffect(() => {
    const previous_signed_out = !previous_user.current && user;
    previous_user.current = user;
    const have_bases_but_base_id_not_present = bases_by_id && chosen_base_id ? !bases_by_id[chosen_base_id] : false;
    const should_sign_in = !user && have_bases_but_base_id_not_present;
    const new_form_state = should_sign_in ? "signin" : is_loading_users ? "loading" : need_to_set_user_name ? "account_info" : previous_signed_out ? "hidden" : form_state;
    set_form_state(new_form_state);
  }, [user, bases_by_id, chosen_base_id, is_loading_users, need_to_set_user_name]);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
    color: "primary",
    endIcon: /* @__PURE__ */ h(ExitToAppIcon, null),
    fullWidth: true,
    disableElevation: true,
    onClick: () => set_form_state(user ? "account_info" : "signin"),
    size: "small",
    style: {textTransform: "none"},
    variant: "contained"
  }, /* @__PURE__ */ h(Typography, {
    noWrap: true
  }, user ? user_name_or_none : is_loading_users ? "Loading" : "Sign in")), form_state === "signin" && /* @__PURE__ */ h(UserSigninRegister, {
    on_close: () => set_form_state("hidden")
  }), form_state === "account_info" && /* @__PURE__ */ h(UserAccountInfo, {
    on_close: need_to_set_user_name ? void 0 : () => set_form_state("hidden")
  }));
}
export const UserInfo = connector(_UserInfo);
