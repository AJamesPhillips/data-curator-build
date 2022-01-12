import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Modal} from "../modal/Modal.js";
import {date2str} from "../shared/utils/date_helpers.js";
import {ACTIONS} from "../state/actions.js";
import {WComponentsList} from "./WComponentsList.js";
const map_state = (state) => ({
  action_ids_to_show: state.view_priorities.action_ids_to_show,
  date_shown: state.view_priorities.date_shown
});
const map_dispatch = {
  set_action_ids_to_show: ACTIONS.view_priorities.set_action_ids_to_show
};
const connector = connect(map_state, map_dispatch);
function _WComponentActionsListModal(props) {
  if (props.action_ids_to_show.length === 0)
    return null;
  let title = "Actions";
  if (props.date_shown)
    title += ` (${date2str(props.date_shown, "yyyy-MMM-dd")})`;
  return /* @__PURE__ */ h(Modal, {
    on_close: () => props.set_action_ids_to_show({action_ids: []}),
    title,
    child: /* @__PURE__ */ h(WComponentsList, {
      wcomponent_ids: props.action_ids_to_show
    })
  });
}
export const WComponentActionsListModal = connector(_WComponentActionsListModal);
