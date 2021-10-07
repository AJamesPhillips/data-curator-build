import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {WComponentSearchWindow} from "./WComponentSearchWindow.js";
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(null, map_dispatch);
function _SearchSidePanel(props) {
  return /* @__PURE__ */ h(WComponentSearchWindow, {
    on_change: (wcomponent_id) => {
      if (!wcomponent_id)
        return;
      props.change_route({route: "wcomponents", item_id: wcomponent_id});
    },
    on_blur: () => {
      props.change_route({route: "wcomponents"});
    }
  });
}
export const SearchSidePanel = connector(_SearchSidePanel);
