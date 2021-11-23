import Markdown from "../../snowpack/pkg/markdown-to-jsx.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {get_title} from "../wcomponent_derived/rich_text/get_rich_text.js";
const map_state = (state) => {
  return {wcomponents_by_id: state.specialised_objects.wcomponents_by_id};
};
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _WComponentBackReferences(props) {
  const {wcomponent_id, wcomponents_by_id} = props;
  const [show_back_references, set_show_back_references] = useState(false);
  const [other_wcomponents, set_other_wcomponents] = useState([]);
  useEffect(() => {
    let relevant_wcomponents = [];
    if (show_back_references) {
      relevant_wcomponents = Object.values(wcomponents_by_id).filter((wc) => !wc.deleted_at).filter((wc) => wc.title.includes(wcomponent_id) || wc.description.includes(wcomponent_id));
    }
    set_other_wcomponents(relevant_wcomponents);
  }, [wcomponent_id, wcomponents_by_id, show_back_references]);
  if (!show_back_references)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
      value: "Show back references",
      onClick: () => set_show_back_references(true)
    }));
  if (other_wcomponents.length === 0)
    return /* @__PURE__ */ h("div", null, "No back references");
  const created_at_ms = new Date().getTime();
  const sim_ms = created_at_ms;
  return /* @__PURE__ */ h("div", null, "Back references:", other_wcomponents.map((wcomponent) => {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Link, {
      route: void 0,
      sub_route: void 0,
      item_id: wcomponent.id,
      args: void 0
    }, /* @__PURE__ */ h(Markdown, null, get_title({rich_text: true, wcomponent, wcomponents_by_id, wc_id_to_counterfactuals_map: void 0, created_at_ms, sim_ms}))));
  }));
}
export const WComponentBackReferences = connector(_WComponentBackReferences);
