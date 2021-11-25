import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import PermDataSettingIcon from "../../../snowpack/pkg/@material-ui/icons/PermDataSetting.js";
import "./StorageInfo.css.proxy.js";
import {SelectStorage} from "./SelectStorage.js";
import {
  selector_chosen_base_name,
  selector_needs_to_create_a_base
} from "../../state/user_info/selector.js";
import {ACTIONS} from "../../state/actions.js";
const map_state = (state) => ({
  base_name: selector_chosen_base_name(state),
  needs_to_create_a_base: selector_needs_to_create_a_base(state),
  display_select_storage: state.controls.display_select_storage
});
const map_dispatch = {
  set_or_toggle_display_select_storage: ACTIONS.controls.set_or_toggle_display_select_storage
};
const connector = connect(map_state, map_dispatch);
function _StorageInfo(props) {
  const {
    needs_to_create_a_base,
    display_select_storage,
    set_or_toggle_display_select_storage
  } = props;
  useEffect(() => {
    if (needs_to_create_a_base)
      set_or_toggle_display_select_storage(true);
  }, [needs_to_create_a_base]);
  return /* @__PURE__ */ h(Typography, {
    component: "span"
  }, /* @__PURE__ */ h(Button, {
    id: "storage_info_button",
    color: "primary",
    disableElevation: true,
    onClick: () => set_or_toggle_display_select_storage(true),
    size: "small",
    endIcon: /* @__PURE__ */ h(PermDataSettingIcon, {
      titleAccess: "Create and Select Knowledge Bases"
    }),
    style: {textTransform: "none"},
    variant: "contained"
  }, /* @__PURE__ */ h("span", {
    class: "storage_name"
  }, props.base_name || "Choose store")), display_select_storage && /* @__PURE__ */ h(SelectStorage, {
    on_close: needs_to_create_a_base ? void 0 : () => set_or_toggle_display_select_storage(false)
  }));
}
export const StorageInfo = connector(_StorageInfo);
