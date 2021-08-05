import {h} from "../../_snowpack/pkg/preact.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../form/editable_text/EditableTextSingleLine.js";
import {get_today_str} from "../shared/utils/date_helpers.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {knowledge_view_sort_types} from "../shared/wcomponent/interfaces/knowledge_view.js";
import {FoundationKnowledgeViewsList} from "./FoundationKnowledgeViewsList.js";
import {KnowledgeViewActiveCounterFactuals} from "./KnowledgeViewActiveCounterfactuals.js";
import {KnowledgeViewListsSet} from "./KnowledgeViewListsSet.js";
export function get_all_parent_knowledge_view_ids(nested_knowledge_view_ids_map, current_subview_id) {
  const all_parent_ids = new Set();
  let nested_entry = nested_knowledge_view_ids_map[current_subview_id];
  while (nested_entry && nested_entry.parent_id) {
    all_parent_ids.add(nested_entry.parent_id);
    nested_entry = nested_knowledge_view_ids_map[nested_entry.parent_id];
  }
  return all_parent_ids;
}
export const make_default_kv_title = () => get_today_str(false);
export const factory_get_kv_details = (props) => (knowledge_view, on_change) => {
  const {editing, nested_knowledge_view_ids} = props;
  const nested_kv = nested_knowledge_view_ids.map[knowledge_view.id];
  const children = (nested_kv?.child_ids || []).map((id) => props.knowledge_views_by_id[id]).filter(is_defined);
  return /* @__PURE__ */ h("div", {
    style: {backgroundColor: "white", border: "thin solid #aaa", borderRadius: 3, padding: 5, margin: 5}
  }, /* @__PURE__ */ h("p", {
    style: {display: "inline-flex"}
  }, editing && /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Title"), "  ", /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Title...",
    value: knowledge_view.title,
    conditional_on_blur: (new_title) => {
      const default_title = knowledge_view.is_base ? "Base" : make_default_kv_title();
      on_change({...knowledge_view, title: new_title || default_title});
    }
  })), (editing || knowledge_view.description) && /* @__PURE__ */ h("p", null, editing && /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Description"), "  ", /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: knowledge_view.description,
    conditional_on_blur: (description) => {
      on_change({...knowledge_view, description});
    }
  })), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Active assumptions (counterfactuals)"), /* @__PURE__ */ h(KnowledgeViewActiveCounterFactuals, {
    knowledge_view_id: knowledge_view.id,
    on_change: (ids) => on_change({...knowledge_view, active_counterfactual_v2_ids: ids})
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(FoundationKnowledgeViewsList, {
    owner_knowledge_view: knowledge_view,
    on_change: (foundation_knowledge_view_ids) => {
      on_change({...knowledge_view, foundation_knowledge_view_ids});
    }
  })), (editing || nested_kv?.ERROR_is_circular) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Nest under"), nested_kv?.ERROR_is_circular && /* @__PURE__ */ h("div", {
    style: {backgroundColor: "pink"}
  }, "Is circularly nested"), /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id: knowledge_view.parent_knowledge_view_id,
    allow_none: true,
    options: props.possible_parent_knowledge_view_options.filter(({id}) => id !== knowledge_view.id),
    on_change: (parent_knowledge_view_id) => {
      on_change({...knowledge_view, parent_knowledge_view_id});
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Sort status"), /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id: knowledge_view.sort_type,
    options: knowledge_view_sort_types.map((type) => ({id: type, title: type})),
    allow_none: false,
    on_change: (sort_type) => sort_type && on_change({...knowledge_view, sort_type})
  })), (editing || children.length > 0) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(KnowledgeViewListsSet, {
    ...props,
    parent_knowledge_view_id: knowledge_view.id,
    knowledge_views: children,
    item_descriptor: "Nested"
  })), /* @__PURE__ */ h("br", null));
};
