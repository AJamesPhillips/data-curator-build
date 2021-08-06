import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../state/actions.js";
import {EditablePosition} from "../form/EditablePosition.js";
import {SelectKnowledgeView} from "../knowledge_view/SelectKnowledgeView.js";
import {Button} from "../sharedf/Button.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponents_id_map
} from "../state/specialised_objects/accessors.js";
import {LabelsEditor} from "../labels/LabelsEditor.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {ConfirmatoryDeleteButton} from "../form/ConfirmatoryDeleteButton.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const wcomponent_ids = state.meta_wcomponents.selected_wcomponent_ids_set;
  const {wcomponents_by_id} = state.specialised_objects;
  return {
    ready: state.sync.ready,
    wcomponent_ids,
    wcomponents_by_id,
    knowledge_view_id: kv?.id,
    composed_wc_id_map: kv?.composed_wc_id_map,
    editing: !state.display_options.consumption_formatting
  };
};
const map_dispatch = {
  bulk_edit_knowledge_view_entries: ACTIONS.specialised_object.bulk_edit_knowledge_view_entries,
  bulk_add_to_knowledge_view: ACTIONS.specialised_object.bulk_add_to_knowledge_view,
  bulk_remove_from_knowledge_view: ACTIONS.specialised_object.bulk_remove_from_knowledge_view,
  snap_to_grid_knowledge_view_entries: ACTIONS.specialised_object.snap_to_grid_knowledge_view_entries,
  bulk_edit_wcomponents: ACTIONS.specialised_object.bulk_edit_wcomponents
};
const connector = connect(map_state, map_dispatch);
function _WComponentMultipleForm(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  const {
    wcomponent_ids: ids,
    composed_wc_id_map,
    knowledge_view_id,
    wcomponents_by_id,
    editing,
    bulk_edit_knowledge_view_entries,
    bulk_add_to_knowledge_view,
    bulk_remove_from_knowledge_view,
    snap_to_grid_knowledge_view_entries,
    bulk_edit_wcomponents
  } = props;
  const wcomponent_ids = Array.from(ids);
  const wcomponents = get_wcomponents_id_map(wcomponents_by_id, wcomponent_ids).filter(is_defined);
  const all_wcomponent_ids_present_in_current_kv = calc_all_wcomponent_ids_present_in_current_kv(wcomponent_ids, composed_wc_id_map);
  const label_ids_set = new Set();
  wcomponents.forEach((wc) => (wc.label_ids || []).forEach((id) => label_ids_set.add(id)));
  const label_ids = Array.from(label_ids_set).sort();
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h2", null, editing ? "Bulk editing" : "Viewing", " ", wcomponent_ids.length, " components"), editing && /* @__PURE__ */ h("p", null, "Position:", /* @__PURE__ */ h(EditablePosition, {
    point: {left: 0, top: 0},
    on_update: (p) => {
      bulk_edit_knowledge_view_entries({
        wcomponent_ids,
        change_left: p.left,
        change_top: p.top
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(Button, {
    disabled: !knowledge_view_id,
    value: "Snap to grid",
    onClick: () => {
      if (!knowledge_view_id)
        return;
      snap_to_grid_knowledge_view_entries({wcomponent_ids, knowledge_view_id});
    },
    is_left: true
  })), (editing || label_ids.length > 0) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(LabelsEditor, {
    label_ids,
    on_change: (label_ids2) => bulk_edit_wcomponents({wcomponent_ids, change: {label_ids: label_ids2}})
  })), /* @__PURE__ */ h("hr", null), editing && /* @__PURE__ */ h("p", null, "Add to knowledge view", all_wcomponent_ids_present_in_current_kv ? /* @__PURE__ */ h(SelectKnowledgeView, {
    exclude_ids: new Set(knowledge_view_id ? [knowledge_view_id] : []),
    on_change: (knowledge_view_id2) => {
      if (!knowledge_view_id2)
        return;
      bulk_add_to_knowledge_view({
        wcomponent_ids: Array.from(wcomponent_ids),
        knowledge_view_id: knowledge_view_id2
      });
    }
  }) : " (Disabled - not all components present in current view)"), editing && /* @__PURE__ */ h("p", null, "Remove from current knowledge view", /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    on_delete: () => {
      bulk_remove_from_knowledge_view({wcomponent_ids: Array.from(wcomponent_ids)});
    }
  })));
}
export const WComponentMultipleForm = connector(_WComponentMultipleForm);
function calc_all_wcomponent_ids_present_in_current_kv(wcomponent_ids, composed_wc_id_map) {
  if (!composed_wc_id_map)
    return false;
  return wcomponent_ids.find((id) => !composed_wc_id_map[id]) === void 0;
}
