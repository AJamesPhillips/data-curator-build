import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {get_middle_of_screen} from "../state/display_options/display.js";
import {
  get_current_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {get_store} from "../state/store.js";
import {ButtonSnapXToDatetime} from "./ButtonSnapXToDatetime.js";
const map_state = (state) => {
  const kv = get_current_knowledge_view_from_state(state);
  const knowledge_view_id = kv?.id;
  return {
    knowledge_view_id,
    kv
  };
};
const map_dispatch = {
  snap_to_grid_knowledge_view_entries: ACTIONS.specialised_object.snap_to_grid_knowledge_view_entries,
  bulk_add_to_knowledge_view: ACTIONS.specialised_object.bulk_add_to_knowledge_view,
  change_current_knowledge_view_entries_order: ACTIONS.specialised_object.change_current_knowledge_view_entries_order
};
const connector = connect(map_state, map_dispatch);
function _AlignComponentForm(props) {
  const {wcomponent_id, wcomponent_ids, knowledge_view_id, kv} = props;
  const ids = (wcomponent_id ? [wcomponent_id] : wcomponent_ids) || [];
  const wcomponent_kv_wc_map_entry_index = kv && wcomponent_id ? Object.keys(kv.wc_id_map).findIndex((id) => id === wcomponent_id) : void 0;
  const total_kv_wc_map_entries = kv ? Object.keys(kv.wc_id_map).length : void 0;
  const move_to_front_disabled = wcomponent_kv_wc_map_entry_index !== void 0 && wcomponent_kv_wc_map_entry_index + 1 === total_kv_wc_map_entries;
  const move_to_back_disabled = wcomponent_kv_wc_map_entry_index === 0;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "Align"), /* @__PURE__ */ h(Button, {
    disabled: !knowledge_view_id,
    value: "Snap to grid",
    onClick: () => {
      if (!knowledge_view_id)
        return;
      props.snap_to_grid_knowledge_view_entries({wcomponent_ids: ids, knowledge_view_id});
    },
    is_left: true
  }), " ", /* @__PURE__ */ h(ButtonSnapXToDatetime, {
    ...props
  }), " ", /* @__PURE__ */ h(Button, {
    disabled: !knowledge_view_id,
    value: "Bring here",
    onClick: () => {
      if (!knowledge_view_id)
        return;
      const state = get_store().getState();
      const override_entry = get_middle_of_screen(state);
      props.bulk_add_to_knowledge_view({knowledge_view_id, wcomponent_ids: ids, override_entry});
    },
    is_left: true
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("span", {
    title: move_to_front_disabled ? "Already at front" : "Move to front"
  }, /* @__PURE__ */ h(Button, {
    value: "Move to front",
    disabled: move_to_front_disabled,
    onClick: () => {
      props.change_current_knowledge_view_entries_order({wcomponent_ids: ids, order: "front"});
    },
    is_left: true
  })), " ", /* @__PURE__ */ h("span", {
    title: move_to_back_disabled ? "Already at back" : "Move to back"
  }, /* @__PURE__ */ h(Button, {
    value: "Move to back",
    disabled: move_to_back_disabled,
    onClick: () => {
      props.change_current_knowledge_view_entries_order({wcomponent_ids: ids, order: "back"});
    },
    is_left: true
  })));
}
export const AlignComponentForm = connector(_AlignComponentForm);
