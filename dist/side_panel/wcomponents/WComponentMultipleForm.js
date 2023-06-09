import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {EditablePosition} from "../../form/EditablePosition.js";
import {SelectKnowledgeView} from "../../knowledge_view/SelectKnowledgeView.js";
import {
  get_current_composed_knowledge_view_from_state,
  get_wcomponents_from_ids
} from "../../state/specialised_objects/accessors.js";
import {LabelsEditor} from "../../labels/LabelsEditor.js";
import {is_defined} from "../../shared/utils/is_defined.js";
import {ConfirmatoryDeleteButton} from "../../form/ConfirmatoryDeleteButton.js";
import {EditableCustomDateTime} from "../../form/EditableCustomDateTime.js";
import {AlignComponentForm} from "../../wcomponent_form/AlignComponentForm.js";
import {wcomponent_is_causal_link} from "../../wcomponent/interfaces/SpecialisedObjects.js";
import {BasicCausalLinkForm} from "../../wcomponent_form/WComponentCausalLinkForm.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
import {wcomponent_type_options} from "../../wcomponent_form/type_options.js";
import {prepare_new_contextless_wcomponent_object} from "../../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {WarningTriangle} from "../../sharedf/WarningTriangle.js";
import {get_middle_of_screen} from "../../state/display_options/display.js";
import {get_store} from "../../state/store.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const {selected_wcomponent_ids_set} = state.meta_wcomponents;
  const {wcomponents_by_id} = state.specialised_objects;
  return {
    ready: state.sync.ready_for_reading,
    selected_wcomponent_ids_set,
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
  bulk_edit_wcomponents: ACTIONS.specialised_object.bulk_edit_wcomponents,
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _WComponentMultipleForm(props) {
  if (!props.ready)
    return /* @__PURE__ */ h("div", null, "Loading...");
  const {
    selected_wcomponent_ids_set,
    composed_wc_id_map,
    knowledge_view_id,
    wcomponents_by_id,
    editing,
    bulk_edit_knowledge_view_entries,
    bulk_add_to_knowledge_view,
    bulk_remove_from_knowledge_view,
    snap_to_grid_knowledge_view_entries,
    bulk_edit_wcomponents,
    upsert_wcomponent
  } = props;
  const selected_wcomponents = get_wcomponents_from_ids(wcomponents_by_id, selected_wcomponent_ids_set).filter(is_defined);
  const selected_wcomponent_ids = Array.from(selected_wcomponent_ids_set);
  const all_wcomponent_ids_present_in_current_kv = calc_all_wcomponent_ids_present_in_current_kv(selected_wcomponent_ids, composed_wc_id_map);
  const label_ids_set = new Set();
  const causal_link_wcomponent_ids = [];
  let effect_when_true = void 0;
  let effect_when_false = void 0;
  selected_wcomponents.forEach((wc) => {
    (wc.label_ids || []).forEach((id) => label_ids_set.add(id));
    if (wcomponent_is_causal_link(wc)) {
      causal_link_wcomponent_ids.push(wc.id);
      effect_when_true = wc.effect_when_true;
      effect_when_false = wc.effect_when_false;
    }
  });
  const label_ids = Array.from(label_ids_set).sort();
  if (selected_wcomponent_ids.length === 0) {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h2", null, "No selected components"));
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h2", null, editing ? "Bulk editing" : "Viewing", " ", selected_wcomponent_ids.length, " components"), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("h3", null, "Position"), /* @__PURE__ */ h(EditablePosition, {
    on_update: (p) => {
      bulk_edit_knowledge_view_entries({
        wcomponent_ids: selected_wcomponent_ids,
        ...p
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(AlignComponentForm, {
    wcomponent_ids: selected_wcomponent_ids
  })), (editing || label_ids.length > 0) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("h3", null, "Labels"), /* @__PURE__ */ h(LabelsEditor, {
    label_ids,
    on_change: (new_label_ids) => {
      const new_label_ids_set = new Set(new_label_ids);
      const remove_label_ids = new Set(label_ids.filter((id) => !new_label_ids_set.has(id)));
      const add_label_ids = new Set(new_label_ids.filter((id) => !label_ids_set.has(id)));
      bulk_edit_wcomponents({
        wcomponent_ids: selected_wcomponent_ids,
        change: {},
        remove_label_ids,
        add_label_ids
      });
    }
  })), editing && causal_link_wcomponent_ids.length > 0 && /* @__PURE__ */ h("p", null, "Causal Connection Values", /* @__PURE__ */ h(BasicCausalLinkForm, {
    show_primary_effect: true,
    show_effect_when_false: true,
    VAPs_represent_number: true,
    effect_when_true,
    effect_when_false,
    editing,
    change_effect: (arg) => bulk_edit_wcomponents({
      wcomponent_ids: causal_link_wcomponent_ids,
      change: arg
    })
  })), editing && /* @__PURE__ */ h("p", null, "Component types", /* @__PURE__ */ h(AutocompleteText, {
    placeholder: "Type: ",
    selected_option_id: void 0,
    allow_none: true,
    options: wcomponent_type_options,
    on_change: (type) => {
      if (!type)
        return;
      selected_wcomponents.forEach((wcomponent) => {
        const vanilla = prepare_new_contextless_wcomponent_object({
          base_id: wcomponent.base_id,
          type
        });
        const new_wcomponent = {...vanilla, ...wcomponent};
        new_wcomponent.type = type;
        upsert_wcomponent({wcomponent: new_wcomponent});
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("h3", null, "Created at"), /* @__PURE__ */ h(EditableCustomDateTime, {
    value: void 0,
    on_change: (custom_created_at) => bulk_edit_wcomponents({
      wcomponent_ids: selected_wcomponent_ids,
      change: {custom_created_at}
    })
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("h3", null, "Add to knowledge view"), all_wcomponent_ids_present_in_current_kv ? "" : /* @__PURE__ */ h("span", null, /* @__PURE__ */ h(WarningTriangle, {
    message: "Not all components present in current view so will be added to center of view."
  }), "Not all components present in current view so will be added to center of view."), /* @__PURE__ */ h(SelectKnowledgeView, {
    on_change: (knowledge_view_id2) => {
      if (!knowledge_view_id2)
        return;
      const state = get_store().getState();
      const default_entry = get_middle_of_screen(state);
      bulk_add_to_knowledge_view({
        wcomponent_ids: selected_wcomponent_ids,
        knowledge_view_id: knowledge_view_id2,
        default_entry
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete from knowledge view",
    tooltip_text: "Delete from knowledge view",
    on_delete: () => {
      bulk_remove_from_knowledge_view({
        wcomponent_ids: selected_wcomponent_ids,
        remove_type: "passthrough"
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete and Block from knowledge view",
    tooltip_text: "Delete and Block from showing in current knowledge view",
    on_delete: () => {
      bulk_remove_from_knowledge_view({
        wcomponent_ids: selected_wcomponent_ids,
        remove_type: "block"
      });
    }
  })));
}
export const WComponentMultipleForm = connector(_WComponentMultipleForm);
function calc_all_wcomponent_ids_present_in_current_kv(wcomponent_ids, composed_wc_id_map) {
  if (!composed_wc_id_map)
    return false;
  return wcomponent_ids.find((id) => !composed_wc_id_map[id]) === void 0;
}
