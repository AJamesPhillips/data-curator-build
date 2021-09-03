import {IconButton, Tooltip} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import "./BackupInfo.css.proxy.js";
import CloudIcon from "../../../snowpack/pkg/@material-ui/icons/Cloud.js";
import CloudUploadIcon from "../../../snowpack/pkg/@material-ui/icons/CloudUpload.js";
const map_state = (state) => {
  return {
    status: state.backup.status,
    not_solid: state.sync.storage_type !== "solid"
  };
};
const map_dispatch = {};
const connector = connect(map_state, map_dispatch);
function _BackupInfo(props) {
  const timeout = useRef();
  clearTimeout(timeout.current);
  const [allow_showing, set_allow_showing] = useState(true);
  const {status, not_solid} = props;
  if (!not_solid)
    return null;
  const failed = status === "FAILED";
  const saved = status === "SAVED";
  const saving = status === "SAVING";
  const status_str = saved ? "Backed up" : saving ? "Backing up" : "";
  if (saved) {
    if (allow_showing === true)
      timeout.current = setTimeout(() => set_allow_showing("fade"), 5e3);
    else if (allow_showing === "fade")
      timeout.current = setTimeout(() => set_allow_showing(false), 1e3);
  } else if (allow_showing !== true) {
    set_allow_showing(true);
  }
  return (failed || status) && /* @__PURE__ */ h(Tooltip, {
    title: status_str
  }, /* @__PURE__ */ h(IconButton, {
    component: "span",
    size: "small",
    "aria-label": status_str
  }, failed && /* @__PURE__ */ h(CloudUploadIcon, {
    color: "error",
    titleAccess: status_str
  }), status && /* @__PURE__ */ h(CloudIcon, {
    titleAccess: status_str,
    className: status?.toLowerCase().endsWith("ing") ? "animate spinning" : ""
  })));
}
export const BackupInfo = connector(_BackupInfo);
