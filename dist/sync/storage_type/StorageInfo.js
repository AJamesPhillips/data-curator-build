import {Button, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {SelectStorageType} from "./SelectStorageType.js";
import {get_storage_type_name} from "./get_storage_type_name.js";
import PermDataSettingIcon from "../../../snowpack/pkg/@material-ui/icons/PermDataSetting.js";
const map_state = (state) => {
  return {
    storage_type: state.sync.storage_type
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _StorageInfo(props) {
  const {storage_type} = props;
  const [show_select_storage, set_show_select_storage] = useState(storage_type === void 0);
  return /* @__PURE__ */ h(Typography, {
    component: "span"
  }, /* @__PURE__ */ h(Button, {
    color: "primary",
    disableElevation: true,
    onClick: () => set_show_select_storage(true),
    size: "small",
    endIcon: /* @__PURE__ */ h(PermDataSettingIcon, {
      titleAccess: "Set Data Storage Location"
    }),
    style: {textTransform: "none"},
    variant: "contained"
  }, get_storage_type_name(storage_type)), show_select_storage && /* @__PURE__ */ h(SelectStorageType, {
    on_close: () => set_show_select_storage(false)
  }));
}
export const StorageInfo = connector(_StorageInfo);
