import {h} from "../../snowpack/pkg/preact.js";
import {update_access_control} from "../supabase/access_controls.js";
import {get_user_name_for_display} from "../supabase/users.js";
import {SelectAccessLevelDropDown} from "./SelectAccessLevel.js";
export function AccessControlEntry(props) {
  const {access_control, base_id, users_by_id, current_user_id, is_owner, on_update} = props;
  const {user_id: other_user_id, access_level: current_level} = access_control;
  const update = (grant) => update_access_control({
    base_id,
    other_user_id,
    grant
  }).then(on_update);
  return /* @__PURE__ */ h("tr", null, /* @__PURE__ */ h("td", null, get_user_name_for_display({users_by_id, current_user_id, other_user_id})), /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(SelectAccessLevelDropDown, {
    disabled: !is_owner,
    current_level,
    title: is_owner ? "Select access level" : "Only owners can edit access levels",
    on_change: update
  })), /* @__PURE__ */ h("br", null));
}
