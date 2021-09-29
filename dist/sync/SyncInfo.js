import {Button, makeStyles, Typography} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import SaveIcon from "../../snowpack/pkg/@material-ui/icons/Save.js";
import SyncProblemIcon from "../../snowpack/pkg/@material-ui/icons/SyncProblem.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
import {save_state} from "../state/sync/utils/save_state.js";
import {ACTIONS} from "../state/actions.js";
import {get_store} from "../state/store.js";
import {is_defined} from "../shared/utils/is_defined.js";
const map_state = (state) => {
  return {
    sync_state_specialised_objects: state.sync.specialised_objects,
    sync_state_bases: state.sync.bases,
    ready_for_writing: state.sync.ready_for_writing
  };
};
const map_dispatch = {
  update_sync_status: ACTIONS.sync.update_sync_status
};
const connector = connect(map_state, map_dispatch);
function _SyncInfo(props) {
  const {sync_state_specialised_objects: specialised, sync_state_bases: bases, ready_for_writing} = props;
  const failed = specialised.status === "FAILED" || bases.status === "FAILED";
  const loading = specialised.status === "LOADING" || bases.status === "LOADING";
  const saving = specialised.status === "SAVING" || bases.status === "SAVING";
  const error_message = [specialised.error_message, bases.error_message].filter(is_defined).join(", ");
  const sending_or_recieving = loading || saving;
  const classes = use_styles();
  let status_text = sentence_case(specialised.status || "");
  if (bases.status && bases.status !== "LOADED" && bases.status !== "SAVED") {
    status_text += bases.status !== specialised.status && ", " + sentence_case(bases.status) || "";
  }
  if (!status_text)
    return null;
  return /* @__PURE__ */ h(Typography, {
    component: "span"
  }, /* @__PURE__ */ h(Button, {
    className: classes.button,
    size: "small",
    disabled: !ready_for_writing,
    onClick: async (e) => {
      e.currentTarget.blur();
      const store = get_store();
      await save_state(store);
    },
    startIcon: failed ? /* @__PURE__ */ h(SyncProblemIcon, {
      color: "error"
    }) : /* @__PURE__ */ h(SaveIcon, {
      className: sending_or_recieving ? "animate spinning" : ""
    }),
    title: failed ? error_message : status_text
  }, /* @__PURE__ */ h(Typography, {
    className: `${classes.animate} ${classes.initially_shown} show`,
    color: failed ? "error" : "initial",
    component: "span",
    noWrap: true
  }, failed ? "Failed!" : status_text), /* @__PURE__ */ h(Typography, {
    className: `${classes.animate} ${classes.initially_hidden} hide`,
    component: "span",
    noWrap: true
  }, failed ? "Retry Now" : "Save Now"), /* @__PURE__ */ h(Typography, {
    component: "span"
  }, " ")));
}
export const SyncInfo = connector(_SyncInfo);
const use_styles = makeStyles((theme) => ({
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
