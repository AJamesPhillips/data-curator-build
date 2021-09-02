import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {BackupInfo} from "./BackupInfo.js";
import {SyncInfo} from "./SyncInfo.js";
export function SyncBackupInfo(props) {
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(SyncInfo, null), /* @__PURE__ */ h(BackupInfo, null));
}
