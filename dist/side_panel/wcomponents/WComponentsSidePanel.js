import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {CreateNewWComponent} from "./CreateNewWComponent.js";
import {WComponentForm} from "../../wcomponent_form/WComponentForm.js";
import {WComponentMultipleForm} from "./WComponentMultipleForm.js";
import {LinkButton} from "../../sharedf/Link.js";
import {Button} from "../../sharedf/Button.js";
import {ACTIONS} from "../../state/actions.js";
import {NotFoundWComponentKnowledgeViewForm} from "../../wcomponent_form/wcomponent_knowledge_view_form/NotFoundWComponentKnowledgeViewForm.js";
import {ListOrphanedWComponents} from "./ListOrphanedWComponents.js";
const map_state = (state) => {
  const {ready_for_reading} = state.sync;
  const {bases_by_id, chosen_base_id} = state.user_info;
  const {sub_route, item_id} = state.routing;
  const wcomponent = get_wcomponent_from_state(state, item_id);
  const selected_ids = state.meta_wcomponents.selected_wcomponent_ids_list;
  return {
    bases_by_id,
    chosen_base_id,
    ready_for_reading,
    sub_route,
    item_id,
    wcomponent,
    selected_ids,
    editing: !state.display_options.consumption_formatting,
    wcomponent_ids_searched_for_in_any_base: state.sync.wcomponent_ids_searched_for_in_any_base
  };
};
const map_dispatch = {
  clear_selected_wcomponents: ACTIONS.meta_wcomponents.clear_selected_wcomponents,
  set_or_toggle_display_select_storage: ACTIONS.controls.set_or_toggle_display_select_storage,
  request_searching_for_wcomponents_by_id_in_any_base: ACTIONS.sync.request_searching_for_wcomponents_by_id_in_any_base
};
const connector = connect(map_state, map_dispatch);
function _WComponentsSidePanel(props) {
  const {ready_for_reading, item_id: id} = props;
  const searching_for_unfound = id ? !props.wcomponent_ids_searched_for_in_any_base.has(id) : false;
  const wcomponent = props.wcomponent;
  const display_type = props.bases_by_id && !props.chosen_base_id ? DisplayType.need_to_choose_base_id : !ready_for_reading ? DisplayType.loading : props.sub_route === "wcomponents_edit_multiple" ? DisplayType.edit_multiple : id === null ? DisplayType.no_id : DisplayType.render_wcomponent;
  useEffect(() => {
    if (wcomponent)
      return;
    if (display_type !== DisplayType.render_wcomponent)
      return;
    if (!id)
      return;
    props.request_searching_for_wcomponents_by_id_in_any_base({ids: [id]});
  }, [ready_for_reading, display_type, id, wcomponent, searching_for_unfound]);
  if (display_type === DisplayType.need_to_choose_base_id)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
      value: "Choose a base to view",
      onClick: () => props.set_or_toggle_display_select_storage(true)
    }));
  if (display_type === DisplayType.loading)
    return /* @__PURE__ */ h("div", null, "Loading...");
  if (display_type === DisplayType.edit_multiple)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(WComponentMultipleForm, null));
  if (display_type === DisplayType.no_id)
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
    })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null)), /* @__PURE__ */ h(CreateNewWComponent, null), /* @__PURE__ */ h(ListOrphanedWComponents, null));
  if (wcomponent) {
    const wcomponent_from_different_base = !!props.wcomponent && props.wcomponent.base_id !== props.chosen_base_id;
    return /* @__PURE__ */ h(WComponentForm, {
      wcomponent,
      wcomponent_from_different_base
    });
  }
  return /* @__PURE__ */ h("div", null, "Component not found for id: ", id, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), searching_for_unfound && /* @__PURE__ */ h("div", null, "Searching in other bases..."), !searching_for_unfound && /* @__PURE__ */ h("div", null, "Not found in other bases (that you have access to).", props.editing && id && /* @__PURE__ */ h(NotFoundWComponentKnowledgeViewForm, {
    wcomponent_id: id
  })));
}
export const WComponentsSidePanel = connector(_WComponentsSidePanel);
var DisplayType;
(function(DisplayType2) {
  DisplayType2[DisplayType2["need_to_choose_base_id"] = 0] = "need_to_choose_base_id";
  DisplayType2[DisplayType2["loading"] = 1] = "loading";
  DisplayType2[DisplayType2["edit_multiple"] = 2] = "edit_multiple";
  DisplayType2[DisplayType2["no_id"] = 3] = "no_id";
  DisplayType2[DisplayType2["render_wcomponent"] = 4] = "render_wcomponent";
})(DisplayType || (DisplayType = {}));
