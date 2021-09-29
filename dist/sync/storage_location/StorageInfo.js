import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import PermDataSettingIcon from "../../../snowpack/pkg/@material-ui/icons/PermDataSetting.js";
import "./StorageInfo.css.proxy.js";
import {SelectStorage} from "./SelectStorage.js";
import {selector_need_to_create_a_base, selector_storage_name} from "../../state/user_info/selector.js";
const map_state = (state) => {
  const base_name = selector_storage_name(state);
  return {
    base_name,
    need_to_create_a_base: selector_need_to_create_a_base(state)
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _StorageInfo(props) {
  const {need_to_create_a_base} = props;
  const [show_select_storage, set_show_select_storage] = useState(false);
  useEffect(() => {
    if (need_to_create_a_base)
      set_show_select_storage(true);
  }, [need_to_create_a_base]);
  return /* @__PURE__ */ h(Typography, {
    component: "span"
  }, /* @__PURE__ */ h(Button, {
    id: "storage_info_button",
    color: "primary",
    disableElevation: true,
    onClick: () => set_show_select_storage(true),
    size: "small",
    endIcon: /* @__PURE__ */ h(PermDataSettingIcon, {
      titleAccess: "Create and Select Knowledge Bases"
    }),
    style: {textTransform: "none"},
    variant: "contained"
  }, /* @__PURE__ */ h("span", {
    class: "storage_name"
  }, props.base_name || "Choose store")), show_select_storage && /* @__PURE__ */ h(SelectStorage, {
    on_close: need_to_create_a_base ? void 0 : () => set_show_select_storage(false)
  }));
}
export const StorageInfo = connector(_StorageInfo);
