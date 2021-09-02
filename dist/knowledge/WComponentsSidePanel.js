import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {get_wcomponent_from_state} from "../state/specialised_objects/accessors.js";
import {CreateNewWComponent} from "./CreateNewWComponent.js";
import {WComponentForm} from "./wcomponent_form/WComponentForm.js";
import {WComponentMultipleForm} from "./WComponentMultipleForm.js";
import {LinkButton} from "../sharedf/Link.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => {
  const {ready_for_reading: ready} = state.sync;
  const {sub_route} = state.routing;
  const id = state.routing.item_id;
  const wcomponent = get_wcomponent_from_state(state, id);
  const selected_ids = state.meta_wcomponents.selected_wcomponent_ids_list;
  return {ready, sub_route, id, wcomponent, selected_ids};
};
const map_dispatch = {
  clear_selected_wcomponents: ACTIONS.specialised_object.clear_selected_wcomponents
};
const connector = connect(map_state, map_dispatch);
function _WComponentsSidePanel(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  if (props.sub_route === "wcomponents_edit_multiple")
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(WComponentMultipleForm, null));
  if (!props.id)
    return /* @__PURE__ */ h("div", null, props.selected_ids.length > 0 && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("div", {
      style: {display: "inline-flex"}
    }, /* @__PURE__ */ h(LinkButton, {
      name: `View ${props.selected_ids.length} component(s) already selected`,
      route: "wcomponents",
      sub_route: props.selected_ids.length > 1 ? "wcomponents_edit_multiple" : void 0,
      item_id: props.selected_ids.length === 1 ? props.selected_ids[0] : void 0,
      args: void 0
    }), " ", /* @__PURE__ */ h(Button, {
      value: `Clear selection`,
      onClick: () => props.clear_selected_wcomponents({}),
      is_left: true
    })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null)), /* @__PURE__ */ h(CreateNewWComponent, null));
  if (!props.wcomponent)
    return /* @__PURE__ */ h("div", null, "Component not found for id: ", props.id);
  return /* @__PURE__ */ h(WComponentForm, {
    wcomponent: props.wcomponent
  });
}
export const WComponentsSidePanel = connector(_WComponentsSidePanel);
