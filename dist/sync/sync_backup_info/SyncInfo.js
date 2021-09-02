import {Button, IconButton, makeStyles, Typography} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {sentence_case} from "../../shared/utils/sentence_case.js";
import {throttled_save_state} from "../../state/sync/utils/save_state.js";
import {ACTIONS} from "../../state/actions.js";
import SaveIcon from "../../../snowpack/pkg/@material-ui/icons/Save.js";
import SyncProblemIcon from "../../../snowpack/pkg/@material-ui/icons/SyncProblem.js";
const map_state = (state) => {
  return {
    status: state.sync.status,
    error_message: state.sync.error_message,
    next_save_ms: state.sync.next_save_ms
  };
};
const map_dispatch = {
  set_next_sync_ms: ACTIONS.sync.set_next_sync_ms,
  update_sync_status: ACTIONS.sync.update_sync_status
};
const connector = connect(map_state, map_dispatch);
function _SyncInfo(props) {
  const [, update_state] = useState({});
  const {status, next_save_ms} = props;
  const failed = status === "FAILED";
  const saving = status === "SAVING";
  const next_save = next_save_ms && next_save_ms - performance.now();
  const will_save_in_future = next_save !== void 0 && next_save >= 0;
  const save_in_seconds = next_save !== void 0 && next_save >= 0 && Math.round(next_save / 1e3);
  if (will_save_in_future)
    setTimeout(() => update_state({}), 500);
  const useStyles = makeStyles((theme) => ({
    button: {
      textTransform: "none",
      "&:hover .show": {fontSize: 0},
      "&:focus .show": {fontSize: 0},
      "&:hover .hide": {fontSize: "initial"},
      "&:focus .hide": {fontSize: "initial"}
    },
    animate: {
      transitionProperty: "all",
      transitionDuration: "0.23s"
    },
    initially_hidden: {
      fontSize: 0
    },
    initially_shown: {
      fontSize: "initial"
    }
  }));
  const classes = useStyles();
  return /* @__PURE__ */ h(Typography, {
    component: "span"
  }, !failed && !will_save_in_future && status && /* @__PURE__ */ h(IconButton, {
    component: "span",
    size: "small"
  }, /* @__PURE__ */ h(SaveIcon, {
    className: status?.toLowerCase().endsWith("ing") ? "animate spinning" : "",
    titleAccess: sentence_case(status)
  })), (will_save_in_future || failed) && /* @__PURE__ */ h(Button, {
    className: classes.button,
    size: "small",
    onClick: () => {
      if (failed) {
        props.update_sync_status({status: "RETRYING"});
      } else {
        throttled_save_state.flush();
        props.set_next_sync_ms({next_save_ms: void 0});
      }
    },
    startIcon: failed ? /* @__PURE__ */ h(SyncProblemIcon, {
      color: "error"
    }) : status ? /* @__PURE__ */ h(SaveIcon, {
      className: status?.toLowerCase().endsWith("ing") ? "animate spinning" : "",
      titleAccess: sentence_case(status)
    }) : /* @__PURE__ */ h(SaveIcon, null)
  }, /* @__PURE__ */ h(Typography, {
    className: `${classes.animate} ${classes.initially_shown} show`,
    color: failed ? "error" : "initial",
    component: "span",
    noWrap: true
  }, !failed && `Save in ${save_in_seconds}s`, failed && `Failed!`), /* @__PURE__ */ h(Typography, {
    className: `${classes.animate} ${classes.initially_hidden} hide`,
    component: "span",
    noWrap: true
  }, !failed && `Save Now`, failed && `Retry Now`), /* @__PURE__ */ h(Typography, {
    component: "span"
  }, " ")));
}
export const SyncInfo = connector(_SyncInfo);
