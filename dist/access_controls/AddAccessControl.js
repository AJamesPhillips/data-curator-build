import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {get_supabase} from "../supabase/get_supabase.js";
import {DisplaySupabasePostgrestError} from "../sync/user_info/DisplaySupabaseErrors.js";
import {SelectAccessLevelDropDown} from "./SelectAccessLevel.js";
export function AddAccessControlEntry(props) {
  const [email_or_uid, set_email_or_uid] = useState("");
  const [access_level, set_access_level] = useState("editor");
  const [adding_status, set_adding_status] = useState("initial");
  const adding = adding_status === "in_progress";
  const added = adding_status === "success";
  const [postgrest_error, set_postgrest_error] = useState(null);
  const {base_id} = props;
  return /* @__PURE__ */ h("div", null, "Share with new user: ", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "User's ID or email",
    value: email_or_uid,
    disabled: adding,
    style: {minWidth: 200},
    onKeyUp: (e) => set_email_or_uid(e.currentTarget.value),
    onChange: (e) => set_email_or_uid(e.currentTarget.value),
    onBlur: (e) => set_email_or_uid(e.currentTarget.value)
  }), "  ", /* @__PURE__ */ h(SelectAccessLevelDropDown, {
    current_level: access_level,
    on_change: set_access_level
  }), /* @__PURE__ */ h("br", null), adding && /* @__PURE__ */ h("span", null, "Adding..."), added && /* @__PURE__ */ h("span", null, "Added."), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error: postgrest_error
  }), /* @__PURE__ */ h("br", null), email_or_uid && /* @__PURE__ */ h("input", {
    type: "button",
    onClick: async () => {
      set_adding_status("in_progress");
      const supabase = get_supabase();
      const result = await supabase.rpc("invite_user_to_base", {base_id, email_or_uid, access_level});
      const {status, error} = result;
      set_postgrest_error(error);
      set_adding_status(error ? "error" : "success");
      if (!error) {
        set_email_or_uid("");
        props.on_add_or_exit(true);
      }
    },
    value: "Add user",
    disabled: !email_or_uid
  }), "  ", /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => props.on_add_or_exit(false),
    value: "Back"
  }));
}
