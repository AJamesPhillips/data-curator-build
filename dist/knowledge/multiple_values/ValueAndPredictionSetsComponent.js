import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import Box from "../../../snowpack/pkg/@material-ui/core/Box.js";
import {
  EditableListEntry
} from "../../form/editable_list/EditableListEntry.js";
import {get_items_descriptor, ExpandableList} from "../../form/editable_list/ExpandableList.js";
import {ListHeader} from "../../form/editable_list/ListHeader.js";
import {ListHeaderAddButton} from "../../form/editable_list/ListHeaderAddButton.js";
import {NewItemForm} from "../../form/editable_list/NewItemForm.js";
import {Tense} from "../../shared/wcomponent/interfaces/datetime.js";
import {replace_element, remove_from_list_by_predicate} from "../../utils/list.js";
import {
  get_summary_for_single_VAP_set,
  get_details_for_single_VAP_set,
  get_details2_for_single_VAP_set
} from "./common.js";
import {new_value_and_prediction_set} from "./NewValueAndPredictionSet.js";
import {prepare_new_VAP_set} from "./utils.js";
import {ValueAndPredictionSetOlderVersions} from "./ValueAndPredictionSetOlderVersions.js";
export function ValueAndPredictionSetsComponent(props) {
  const [new_item, set_new_item] = useState(void 0);
  const {
    wcomponent_id,
    VAP_set_counterfactuals_map,
    item_descriptor,
    VAPs_represent,
    update_items,
    values_and_prediction_sets: all_VAP_sets,
    invalid_future_items,
    future_items,
    present_items,
    past_items,
    previous_versions_by_id,
    creation_context,
    editing
  } = props;
  const render_future_list_content = factory_render_VAP_set_list_content({
    subset_VAP_sets: future_items,
    previous_versions_by_id,
    all_VAP_sets,
    update_items,
    wcomponent_id,
    VAP_set_counterfactuals_map,
    VAPs_represent,
    tense: Tense.future,
    creation_context,
    editing
  });
  const render_present_list_content = factory_render_VAP_set_list_content({
    subset_VAP_sets: present_items,
    previous_versions_by_id,
    all_VAP_sets,
    update_items,
    wcomponent_id,
    VAP_set_counterfactuals_map,
    VAPs_represent,
    tense: Tense.present,
    creation_context,
    editing
  });
  const render_past_list_content = factory_render_VAP_set_list_content({
    subset_VAP_sets: past_items,
    previous_versions_by_id,
    all_VAP_sets,
    update_items,
    wcomponent_id,
    VAP_set_counterfactuals_map,
    VAPs_represent,
    tense: Tense.past,
    creation_context,
    editing
  });
  const new_VAP_set_form_item_props = {
    get_created_at: get_actual_created_at_datetime,
    get_custom_created_at: get_actual_custom_created_at_datetime,
    get_summary: new_value_and_prediction_set(VAPs_represent),
    get_details: () => /* @__PURE__ */ h("div", null),
    get_details2: () => /* @__PURE__ */ h("div", null),
    extra_class_names: `value_and_prediction_set new`,
    crud: {
      create_item: (new_VAP_set) => {
        update_items([...all_VAP_sets, new_VAP_set]);
        set_new_item(void 0);
      },
      update_item: (modified_VAP_set) => {
        const predicate = predicate_by_id_and_created_at(modified_VAP_set);
        const updated_VAP_sets = replace_element(all_VAP_sets, modified_VAP_set, predicate);
        update_items(updated_VAP_sets);
      }
    }
  };
  const title = editing ? get_items_descriptor(item_descriptor, all_VAP_sets.length, editing) : item_descriptor;
  const show_futures = editing || future_items.length > 0;
  const show_presents = editing || present_items.length > 0;
  const show_pasts = editing || past_items.length > 0;
  return /* @__PURE__ */ h("div", {
    className: "value_and_prediction_sets"
  }, /* @__PURE__ */ h(ListHeader, {
    items_descriptor: title,
    on_click_header: void 0,
    other_content: () => !editing ? null : /* @__PURE__ */ h(ListHeaderAddButton, {
      new_item_descriptor: item_descriptor,
      on_pointer_down_new_list_entry: () => {
        const new_VAP_set = prepare_new_VAP_set(VAPs_represent, all_VAP_sets, props.base_id, props.creation_context);
        set_new_item(new_VAP_set);
      }
    })
  }), /* @__PURE__ */ h(NewItemForm, {
    new_item,
    set_new_item,
    item_props: new_VAP_set_form_item_props,
    item_descriptor
  }), invalid_future_items.length > 0 && /* @__PURE__ */ h("div", null, "Hidden (", invalid_future_items.length, ")"), show_futures && /* @__PURE__ */ h(ExpandableList, {
    content: render_future_list_content,
    item_descriptor: "",
    items_descriptor: count_and_versions("Future", future_items, previous_versions_by_id, editing),
    disable_collapsed: true
  }), (show_futures || show_presents) && /* @__PURE__ */ h("hr", null), show_presents && /* @__PURE__ */ h(ExpandableList, {
    content: render_present_list_content,
    item_descriptor: "",
    items_descriptor: count_and_versions("Present", present_items, previous_versions_by_id, editing),
    disable_collapsed: true
  }), show_presents && show_pasts && /* @__PURE__ */ h("hr", null), show_pasts && /* @__PURE__ */ h(ExpandableList, {
    content: render_past_list_content,
    item_descriptor: "",
    items_descriptor: count_and_versions("Past", past_items, previous_versions_by_id, editing),
    disable_collapsed: true
  }));
}
function count_and_versions(title, all_latest, previous_versions_by_id, editing) {
  if (!editing)
    return title;
  let previous_version_count = 0;
  all_latest.forEach(({id}) => previous_version_count += (previous_versions_by_id[id] || []).length);
  if (previous_version_count === 0) {
    return get_items_descriptor(title, all_latest.length, editing);
  }
  return `${title} (${all_latest.length} (${all_latest.length + previous_version_count}))`;
}
function factory_render_VAP_set_list_content(args) {
  const {subset_VAP_sets, all_VAP_sets, previous_versions_by_id, update_items, VAPs_represent, tense, editing} = args;
  const render_VAP_set_list_content = (list_content_props) => {
    const {
      disable_partial_collapsed,
      expanded_items,
      expanded_item_rows
    } = list_content_props;
    const crud = {
      create_item: (item) => update_items([...all_VAP_sets, item]),
      update_item: (modified_VAP_set) => {
        const predicate = predicate_by_id_and_created_at(modified_VAP_set);
        const updated_VAP_sets = replace_element(all_VAP_sets, modified_VAP_set, predicate);
        update_items(updated_VAP_sets);
      },
      delete_item: (item) => {
        const predicate = predicate_by_id_and_created_at(item);
        const updated_VAP_sets = remove_from_list_by_predicate(all_VAP_sets, predicate);
        update_items(updated_VAP_sets);
      }
    };
    return /* @__PURE__ */ h("div", {
      style: {display: expanded_items ? "" : "none", cursor: "initial"},
      onClick: (e) => e.stopPropagation()
    }, subset_VAP_sets.map((item) => /* @__PURE__ */ h("div", {
      key: item.id
    }, /* @__PURE__ */ h("hr", {
      className: "entries_horizontal_dividers"
    }), /* @__PURE__ */ h(EditableListEntry, {
      item,
      get_created_at: get_actual_created_at_datetime,
      get_custom_created_at: get_actual_custom_created_at_datetime,
      get_summary: get_summary_for_single_VAP_set(VAPs_represent, false),
      get_details: get_details_for_single_VAP_set(VAPs_represent),
      get_details2: get_details2_for_single_VAP_set(VAPs_represent, editing),
      get_details3: get_details3(VAPs_represent, previous_versions_by_id),
      extra_class_names: `value_and_prediction_set ${tense === Tense.future ? "future" : tense === Tense.present ? "present" : "past"}`,
      expanded: expanded_item_rows,
      disable_collapsable: disable_partial_collapsed,
      crud,
      delete_button_text: "Delete Set of Value & Predictions"
    }))));
  };
  return render_VAP_set_list_content;
}
const get_actual_created_at_datetime = (item) => item.created_at;
const get_actual_custom_created_at_datetime = (item) => item.custom_created_at;
const predicate_by_id_and_created_at = (i1) => (i2) => {
  return i1.id === i2.id && i1.created_at.getTime() === i2.created_at.getTime();
};
const get_details3 = (VAPs_represent, previous_versions_by_id) => (latest_VAP_set, crud) => {
  return /* @__PURE__ */ h(Box, {
    className: "VAP_set_details"
  }, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(ValueAndPredictionSetOlderVersions, {
    VAPs_represent,
    current_VAP_set: latest_VAP_set,
    older_VAP_sets: previous_versions_by_id[latest_VAP_set.id] || [],
    create_item: crud.create_item,
    update_item: crud.update_item,
    delete_item: crud.delete_item
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
};
