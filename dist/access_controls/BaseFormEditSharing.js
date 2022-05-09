import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./BaseFormEditSharing.css.proxy.js";
import {AccessControlEntry} from "./AccessControlEntry.js";
import {get_access_controls_for_base} from "../supabase/access_controls.js";
import {DisplaySupabasePostgrestError} from "../sync/user_info/DisplaySupabaseErrors.js";
import {AddAccessControlEntry} from "./AddAccessControl.js";
import {SyncButton} from "../sharedf/SyncButton.js";
import {pub_sub} from "../state/pub_sub/pub_sub.js";
const map_state = (state) => ({
  users_by_id: state.user_info.users_by_id
});
const connector = connect(map_state);
function _BaseFormEditSharing(props) {
  const {user, base, on_save_or_exit, users_by_id} = props;
  const [async_state, set_async_state] = useState("initial");
  const [access_controls, set_access_controls] = useState(void 0);
  const [error, set_error] = useState(void 0);
  const is_owner = base.owner_user_id === user.id;
  function refresh_sharing_options() {
    set_async_state("in_progress");
    get_access_controls_for_base(base.id).then((res) => {
      set_async_state(res.error ? "error" : "success");
      set_access_controls(res.access_controls);
      set_error(res.error || void 0);
      if (res.error)
        return;
      pub_sub.user.pub("stale_users_by_id", false);
    });
  }
  useEffect(() => refresh_sharing_options(), []);
  if (!users_by_id)
    return /* @__PURE__ */ h("div", null, "Fetching users...");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(SyncButton, {
    state: async_state,
    title: "Refresh sharing options",
    on_click: () => refresh_sharing_options(),
    style: {float: "right"}
  }), /* @__PURE__ */ h("h4", null, "Sharing options"), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error
  }), access_controls && /* @__PURE__ */ h("div", null, access_controls.length === 0 && "Not shared with anyone yet", access_controls.length > 0 && /* @__PURE__ */ h("table", {
    className: "access_controls_table"
  }, /* @__PURE__ */ h("tbody", null, access_controls.map((ac) => /* @__PURE__ */ h(AccessControlEntry, {
    access_control: ac,
    base_id: base.id,
    users_by_id,
    current_user_id: user.id,
    is_owner,
    on_update: (res) => {
      set_error(res.error || void 0);
      if (!res.error)
        refresh_sharing_options();
    }
  })))), /* @__PURE__ */ h("br", null)), !is_owner && /* @__PURE__ */ h("div", null, "Sharing with new users (Only owners can do this for now)"), is_owner && /* @__PURE__ */ h(AddAccessControlEntry, {
    base_id: base.id,
    on_add_or_exit: (stale_access_controls) => {
      if (stale_access_controls)
        refresh_sharing_options();
      else
        on_save_or_exit();
    }
  }));
}
export const BaseFormEditSharing = connector(_BaseFormEditSharing);
