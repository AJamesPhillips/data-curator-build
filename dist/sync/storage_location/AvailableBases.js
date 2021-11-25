import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {StorageOption} from "./StorageOption.js";
import {ACTIONS} from "../../state/actions.js";
import {sort_list} from "../../shared/utils/sort.js";
import {refresh_bases_for_current_user} from "../../state/user_info/utils.js";
import {SyncButton} from "../../sharedf/SyncButton.js";
import {DisplaySupabasePostgrestError} from "../user_info/DisplaySupabaseErrors.js";
const map_state = (state) => {
  return {
    user: state.user_info.user,
    users_by_id: state.user_info.users_by_id,
    chosen_base_id: state.user_info.chosen_base_id,
    bases_by_id: state.user_info.bases_by_id
  };
};
const map_dispatch = {
  update_chosen_base_id: ACTIONS.user_info.update_chosen_base_id
};
const connector = connect(map_state, map_dispatch);
function _AvailableBases(props) {
  const {
    on_choose,
    on_click_edit,
    user,
    users_by_id,
    chosen_base_id,
    bases_by_id,
    update_chosen_base_id
  } = props;
  const [async_state, set_async_state] = useState("initial");
  const [error, set_error] = useState(void 0);
  if (!users_by_id)
    return "Loading users...";
  if (!bases_by_id)
    return "Loading bases...";
  const bases = sort_list(Object.values(bases_by_id), (b) => b.inserted_at.getTime(), "descending");
  if (bases.length === 0)
    return null;
  return /* @__PURE__ */ h("div", {
    style: {margin: 10}
  }, /* @__PURE__ */ h(SyncButton, {
    state: async_state,
    title: "Refresh sharing options",
    on_click: async () => {
      set_async_state("in_progress");
      const res = await refresh_bases_for_current_user();
      set_async_state(res.error ? "error" : "success");
      set_error(res.error);
    },
    style: {float: "right"}
  }), /* @__PURE__ */ h("h4", null, "Select an existing base"), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error
  }), /* @__PURE__ */ h("table", null, /* @__PURE__ */ h("thead", null, /* @__PURE__ */ h("tr", null, /* @__PURE__ */ h("th", null), /* @__PURE__ */ h("th", null, "Knowledge Base Title"), /* @__PURE__ */ h("th", null), /* @__PURE__ */ h("th", null, "Owner"), /* @__PURE__ */ h("th", null, "Access"), /* @__PURE__ */ h("th", null))), /* @__PURE__ */ h("tbody", null, bases.map((base) => /* @__PURE__ */ h(StorageOption, {
    user,
    users_by_id,
    base,
    selected: base.id === chosen_base_id,
    on_click: () => {
      update_chosen_base_id({base_id: base.id});
      on_choose && on_choose();
    },
    on_click_edit: () => on_click_edit(base.id)
  })))));
}
export const AvailableBases = connector(_AvailableBases);
