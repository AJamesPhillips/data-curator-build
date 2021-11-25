import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Box, Button, FormControl, FormGroup, makeStyles, TextField} from "../../../snowpack/pkg/@material-ui/core.js";
import "../common.css.proxy.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {DisplaySupabasePostgrestError} from "./DisplaySupabaseErrors.js";
import {selector_need_to_set_user_name} from "../../state/user_info/selector.js";
import {pub_sub} from "../../state/pub_sub/pub_sub.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    need_to_set_user_name: selector_need_to_set_user_name(state)
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _UserAccountInfoChangeUsernameForm(props) {
  const {on_close, user, need_to_set_user_name} = props;
  const [username, set_username] = useState("");
  const [save_state, set_save_state] = useState("initial");
  const is_saving = save_state === "in_progress";
  const [postgrest_error, set_postgrest_error] = useState(null);
  if (!user)
    return null;
  const {id: user_id} = user;
  async function update_username() {
    const supabase = get_supabase();
    set_save_state("in_progress");
    const {data, error} = await supabase.from("users").upsert({id: user_id, name: username}).eq("id", user_id);
    set_postgrest_error(error);
    const actual_set_username = (data && data[0]?.name) ?? void 0;
    if (actual_set_username)
      pub_sub.user.pub("stale_users_by_id", true);
    set_save_state(error ? "error" : "success");
  }
  const classes = use_styles();
  return /* @__PURE__ */ h(FormGroup, {
    className: "section"
  }, /* @__PURE__ */ h(Box, {
    className: classes.root
  }, /* @__PURE__ */ h(FormControl, null, /* @__PURE__ */ h(TextField, {
    disabled: is_saving,
    onChange: (e) => {
      set_username(e.currentTarget.value);
    },
    onBlur: (e) => {
      set_username(e.currentTarget.value);
    },
    placeholder: "Username",
    size: "small",
    value: username,
    variant: "outlined"
  })), /* @__PURE__ */ h(Box, {
    className: classes.update_button_container
  }, /* @__PURE__ */ h(Button, {
    className: classes.update_button,
    disabled: !username || is_saving,
    onClick: update_username,
    variant: "contained"
  }, need_to_set_user_name ? "Set" : "Change", " username")), /* @__PURE__ */ h(Box, null, !need_to_set_user_name && /* @__PURE__ */ h(Button, {
    variant: "contained",
    onClick: () => {
      on_close();
      set_postgrest_error(null);
    }
  }, "Close"))), is_saving && "Saving...", save_state === "success" && "Saved.", /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error: postgrest_error
  }));
}
const use_styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center"
  },
  username_input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
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
export const UserAccountInfoChangeUsernameForm = connector(_UserAccountInfoChangeUsernameForm);
