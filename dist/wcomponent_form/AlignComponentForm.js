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
  const knowledge_view_id = get_current_knowledge_view_from_state(state)?.id;
  return {
    knowledge_view_id
  };
};
const map_dispatch = {
  snap_to_grid_knowledge_view_entries: ACTIONS.specialised_object.snap_to_grid_knowledge_view_entries,
  bulk_add_to_knowledge_view: ACTIONS.specialised_object.bulk_add_to_knowledge_view,
  change_current_knowledge_view_entries_order: ACTIONS.specialised_object.change_current_knowledge_view_entries_order
};
const connector = connect(map_state, map_dispatch);
function _AlignComponentForm(props) {
  const {wcomponent_id, wcomponent_ids, knowledge_view_id} = props;
  const ids = (wcomponent_id ? [wcomponent_id] : wcomponent_ids) || [];
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
      const bulk_entry = get_middle_of_screen(state);
      props.bulk_add_to_knowledge_view({knowledge_view_id, wcomponent_ids: ids, bulk_entry});
    },
    is_left: true
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(Button, {
    value: "Move to front",
    onClick: () => {
      props.change_current_knowledge_view_entries_order({wcomponent_ids: ids, order: "front"});
    },
    is_left: true
  }), " ", /* @__PURE__ */ h(Button, {
    value: "Move to back",
    onClick: () => {
      props.change_current_knowledge_view_entries_order({wcomponent_ids: ids, order: "back"});
    },
    is_left: true
  }));
}
export const AlignComponentForm = connector(_AlignComponentForm);
