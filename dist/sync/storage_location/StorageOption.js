import {h} from "../../../snowpack/pkg/preact.js";
import EditIcon from "../../../snowpack/pkg/@material-ui/icons/Edit.js";
import "./StorageOption.css.proxy.js";
import {get_user_name_for_display} from "../../supabase/users.js";
export function StorageOption(props) {
  const {user, users_by_id, base, selected, on_click, on_click_edit} = props;
  const {title, id, public_read, access_level} = base;
  const is_owner = base.owner_user_id === user.id;
  const is_editor = access_level === "editor";
  const owner_or_editor = is_editor || is_owner;
  const access_description = is_owner ? "Editor (Owner)" : is_editor ? "Editor" : access_level === "viewer" ? "Viewer" : base.public_read ? "Viewer (public access)" : "?";
  return /* @__PURE__ */ h("tr", {
    className: "base_option " + (selected ? "selected" : ""),
    onClick: on_click
  }, /* @__PURE__ */ h("td", {
    className: "narrow"
  }, /* @__PURE__ */ h("input", {
    type: "radio",
    checked: selected,
    style: {cursor: "pointer"}
  })), /* @__PURE__ */ h("td", null, title || "(No title)"), /* @__PURE__ */ h("td", null, public_read && "(Public)"), /* @__PURE__ */ h("td", null, get_user_name_for_display({users_by_id, current_user_id: user?.id, other_user_id: base.owner_user_id})), /* @__PURE__ */ h("td", null, access_description), /* @__PURE__ */ h("td", {
    className: "narrow",
    style: {color: "grey", fontSize: 12}
  }, id), /* @__PURE__ */ h("td", {
    className: "narrow edit_title",
    onClick: !owner_or_editor ? void 0 : (e) => {
      e.stopImmediatePropagation();
      on_click_edit();
    }
  }, owner_or_editor && /* @__PURE__ */ h(EditIcon, null)));
}
