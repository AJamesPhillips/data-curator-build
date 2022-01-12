import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {get_wcomponent_from_state} from "../../state/specialised_objects/accessors.js";
import {CreateNewWComponent} from "./CreateNewWComponent.js";
import {WComponentForm} from "../../wcomponent_form/WComponentForm.js";
import {WComponentMultipleForm} from "./WComponentMultipleForm.js";
import {LinkButton} from "../../sharedf/Link.js";
import {Button} from "../../sharedf/Button.js";
import {ACTIONS} from "../../state/actions.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {supabase_get_wcomponent_from_any_base} from "../../state/sync/supabase/wcomponent.js";
const map_state = (state) => {
  const {ready_for_reading: ready} = state.sync;
  const {bases_by_id, chosen_base_id} = state.user_info;
  const {sub_route, item_id} = state.routing;
  const wcomponent = get_wcomponent_from_state(state, item_id);
  const selected_ids = state.meta_wcomponents.selected_wcomponent_ids_list;
  return {
    bases_by_id,
    chosen_base_id,
    ready,
    sub_route,
    item_id,
    wcomponent,
    selected_ids
  };
};
const map_dispatch = {
  clear_selected_wcomponents: ACTIONS.specialised_object.clear_selected_wcomponents,
  set_or_toggle_display_select_storage: ACTIONS.controls.set_or_toggle_display_select_storage
};
const connector = connect(map_state, map_dispatch);
function _WComponentsSidePanel(props) {
  const [searching_for_unfound, set_searching_for_unfound] = useState(void 0);
  const [searched_for_wcomponent, set_searched_for_wcomponent] = useState(void 0);
  const {ready, item_id: id} = props;
  const wcomponent = props.wcomponent || searched_for_wcomponent;
  const display_type = props.bases_by_id && !props.chosen_base_id ? DisplayType.need_to_choose_base_id : !ready ? DisplayType.loading : props.sub_route === "wcomponents_edit_multiple" ? DisplayType.edit_multiple : id === null ? DisplayType.no_id : DisplayType.render_wcomponent;
  function clear_old_wcomponent_from_other_base() {
    if (id && wcomponent && wcomponent.id !== id) {
      set_searching_for_unfound(void 0);
      set_searched_for_wcomponent(void 0);
    }
  }
  function look_for_wcomponent_in_any_base() {
    if (!ready)
      return;
    if (display_type === DisplayType.render_wcomponent && id && !wcomponent && searching_for_unfound === void 0) {
      (async () => {
        let component_form_closed = false;
        set_searching_for_unfound(true);
        const result = await search_for_wcomponent_in_all_bases(id);
        if (component_form_closed)
          return;
        set_searching_for_unfound(false);
        set_searched_for_wcomponent(result.wcomponent);
        return () => {
          component_form_closed = true;
        };
      })();
    }
  }
  useEffect(clear_old_wcomponent_from_other_base, [wcomponent, id]);
  useEffect(look_for_wcomponent_in_any_base, [ready, display_type, wcomponent, searching_for_unfound, id]);
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
    })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null)), /* @__PURE__ */ h(CreateNewWComponent, null));
  if (wcomponent) {
    const wcomponent_from_different_base = !props.wcomponent && !!searched_for_wcomponent;
    return /* @__PURE__ */ h(WComponentForm, {
      wcomponent,
      wcomponent_from_different_base
    });
  }
  return /* @__PURE__ */ h("div", null, "Component not found for id: ", id, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), searching_for_unfound && /* @__PURE__ */ h("div", null, "Searching in other bases..."), !searching_for_unfound && /* @__PURE__ */ h("div", null, "Not found in other bases (that you have access to)."));
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
function search_for_wcomponent_in_all_bases(wcomponent_id) {
  const supabase = get_supabase();
  return supabase_get_wcomponent_from_any_base({supabase, id: wcomponent_id});
}
