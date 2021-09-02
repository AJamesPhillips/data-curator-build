import {h} from "../../snowpack/pkg/preact.js";
import {useEffect} from "../../snowpack/pkg/preact/hooks.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {is_ctrl_f_search} from "../state/search/conditional_ctrl_f_search.js";
import {WComponentSearchWindow} from "./WComponentSearchWindow.js";
const map_state = (state) => {
  return {
    ctrl_f_search: is_ctrl_f_search(state)
  };
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _SearchSidePanel(props) {
  const [show_search, set_show_search] = useState(true);
  useEffect(() => {
    if (props.ctrl_f_search)
      set_show_search(props.ctrl_f_search);
  }, [props.ctrl_f_search]);
  if (!show_search)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
      value: "New Search",
      onClick: () => set_show_search(true)
    }));
  return /* @__PURE__ */ h(WComponentSearchWindow, {
    on_change: (wcomponent_id) => {
      if (!wcomponent_id)
        return;
      props.change_route({route: "wcomponents", item_id: wcomponent_id});
    },
    on_blur: () => set_show_search(false)
  });
}
export const SearchSidePanel = connector(_SearchSidePanel);
