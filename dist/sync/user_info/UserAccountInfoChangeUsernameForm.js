import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "../common.css.proxy.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {DisplaySupabasePostgrestError} from "./DisplaySupabaseErrors.js";
import {selector_need_to_set_user_name} from "../../state/user_info/selector.js";
import {useEffect} from "../../../snowpack/pkg/preact/hooks.js";
import {pub_sub} from "../../state/pub_sub/pub_sub.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    user_name: state.user_info.user_name,
    need_to_set_user_name: selector_need_to_set_user_name(state)
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _UserAccountInfoChangeUsernameForm(props) {
  const {on_close, user, user_name: stored_user_name, need_to_set_user_name} = props;
  const [username, set_username] = useState("");
  const [save_state, set_save_state] = useState("initial");
  const is_saving = save_state === "in_progress";
  const [postgrest_error, set_postgrest_error] = useState(null);
  useEffect(() => set_username(stored_user_name || ""), [stored_user_name]);
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
  return /* @__PURE__ */ h("div", {
    className: "section"
  }, /* @__PURE__ */ h("form", null, /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "Username",
    value: username,
    disabled: is_saving,
    onKeyUp: (e) => set_username(e.currentTarget.value),
    onChange: (e) => set_username(e.currentTarget.value),
    onBlur: async (e) => set_username(e.currentTarget.value)
  }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h("input", {
    type: "button",
    disabled: !username || is_saving,
    onClick: update_username,
    value: `${need_to_set_user_name ? "Set" : "Change"} username`
  }), /* @__PURE__ */ h("br", null), is_saving && "Saving...", save_state === "success" && "Saved.", /* @__PURE__ */ h("br", null), !need_to_set_user_name && /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      on_close();
      set_postgrest_error(null);
    },
    value: "Close"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error: postgrest_error
  }));
}
export const UserAccountInfoChangeUsernameForm = connector(_UserAccountInfoChangeUsernameForm);
