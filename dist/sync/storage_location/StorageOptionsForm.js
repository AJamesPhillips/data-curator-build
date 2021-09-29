import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "../common.css.proxy.js";
import {ACTIONS} from "../../state/actions.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {create_a_base} from "../../supabase/bases.js";
import {AvailableBases} from "./AvailableBases.js";
import {BaseForm} from "./BaseForm.js";
import {pub_sub} from "../../state/pub_sub/pub_sub.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    users_by_id: state.user_info.users_by_id,
    bases_by_id: state.user_info.bases_by_id
  };
};
const map_dispatch = {
  update_chosen_base_id: ACTIONS.user_info.update_chosen_base_id
};
const connector = connect(map_state, map_dispatch);
function _StorageOptionsForm(props) {
  const {on_close, user, users_by_id, bases_by_id, update_chosen_base_id} = props;
  const [new_base_title, set_new_base_title] = useState("");
  const [base_creation_state, set_base_creation_state] = useState("initial");
  const [editing_base_id, set_editing_base_id] = useState(void 0);
  const [newly_created_base, set_newly_created_base] = useState(void 0);
  if (!user)
    return "Please sign in";
  if (!users_by_id)
    return "Fetching users...";
  if (!bases_by_id)
    return "Fetching bases...";
  const user_id = user.id;
  const base_count = Object.keys(bases_by_id).length;
  async function create_base() {
    set_base_creation_state("in_progress");
    const res = await create_a_base({owner_user_id: user_id, title: new_base_title.trim()});
    set_base_creation_state(res.error ? "error" : "success");
    set_newly_created_base(res.base);
    if (!res.error)
      pub_sub.user.pub("stale_bases", true);
  }
  if (editing_base_id !== void 0)
    return /* @__PURE__ */ h("div", {
      style: {margin: 10}
    }, /* @__PURE__ */ h(BaseForm, {
      base: bases_by_id[editing_base_id],
      on_save_or_exit: () => set_editing_base_id(void 0)
    }));
  return /* @__PURE__ */ h("div", {
    style: {margin: 10}
  }, /* @__PURE__ */ h(AvailableBases, {
    on_choose: on_close,
    on_click_edit: (base_id) => set_editing_base_id(base_id)
  }), base_count > 0 && /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("h4", null, "Create ", base_count ? "a new" : "your first", " base"), /* @__PURE__ */ h("input", {
    type: "text",
    value: new_base_title,
    onKeyUp: (e) => set_new_base_title(e.currentTarget.value),
    onChange: (e) => set_new_base_title(e.currentTarget.value),
    onBlur: (e) => set_new_base_title(e.currentTarget.value)
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    disabled: !new_base_title.trim() || base_creation_state === "in_progress",
    onClick: () => create_base(),
    value: "Create new base"
  }), "  ", async_status_to_text(base_creation_state), "  ", newly_created_base && /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => update_chosen_base_id({base_id: newly_created_base.id}),
    value: "Select new base"
  }));
}
export const StorageOptionsForm = connector(_StorageOptionsForm);
function async_status_to_text(status) {
  if (status === "initial")
    return "";
  else if (status === "in_progress")
    return "Creating...";
  else if (status === "success")
    return "Created.";
  else
    return "Error";
}
