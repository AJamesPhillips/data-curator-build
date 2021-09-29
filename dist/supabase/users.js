import {h} from "../../snowpack/pkg/preact.js";
export function get_user_name_for_display(args) {
  const {users_by_id, current_user_id, other_user_id} = args;
  let name = users_by_id[other_user_id]?.name || "";
  if (!current_user_id)
    name = name || "Someone";
  else
    name = current_user_id === other_user_id ? "me" : name || "(someone else)";
  return /* @__PURE__ */ h("span", {
    title: other_user_id
  }, name);
}
