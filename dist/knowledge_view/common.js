import {h} from "../../snowpack/pkg/preact.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {EditableText} from "../form/editable_text/EditableText.js";
import {EditableTextSingleLine} from "../form/editable_text/EditableTextSingleLine.js";
import {get_today_str} from "../shared/utils/date_helpers.js";
import {is_defined} from "../shared/utils/is_defined.js";
import {knowledge_view_sort_types} from "../shared/interfaces/knowledge_view.js";
import {FoundationKnowledgeViewsList} from "./FoundationKnowledgeViewsList.js";
import {KnowledgeViewActiveCounterFactuals} from "./KnowledgeViewActiveCounterfactuals.js";
import {KnowledgeViewListsSet} from "./KnowledgeViewListsSet.js";
import {KnowledgeViewDatetimeLinesConfigForm} from "./KnowledgeViewDatetimeLinesConfigForm.js";
import {Link} from "../sharedf/Link.js";
import {ExternalLinkIcon} from "../sharedf/icons/ExternalLinkIcon.js";
import {create_wcomponent} from "../state/specialised_objects/wcomponents/create_wcomponent_type.js";
import {KnowledgeViewChangeBase} from "./change_base/KnowledgeViewChangeBase.js";
import {SelectKnowledgeView} from "./SelectKnowledgeView.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {EditableTextOnBlurType} from "../form/editable_text/editable_text_common.js";
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
export const factory_get_kv_details = (props) => (knowledge_view, crud) => {
  const {editing, nested_knowledge_view_ids} = props;
  const nested_kv = nested_knowledge_view_ids.map[knowledge_view.id];
  const children = (nested_kv?.child_ids || []).map((id) => props.knowledge_views_by_id[id]).filter(is_defined);
  const has_wcomponent = !!props.wcomponents_by_id[knowledge_view?.id || ""];
  const is_current_kv = props.current_subview_id === knowledge_view.id;
  const allow_nest_under_knowledge_view_ids = useMemo(() => new Set(props.possible_parent_knowledge_view_ids), [props.possible_parent_knowledge_view_ids]);
  return /* @__PURE__ */ h("div", {
    style: {backgroundColor: "white", border: "thin solid #aaa", borderRadius: 3, padding: 5, margin: 5}
  }, /* @__PURE__ */ h("p", {
    style: {display: "inline-flex"}
  }, /* @__PURE__ */ h(EditableTextSingleLine, {
    placeholder: "Title",
    value: knowledge_view.title,
    on_blur: (new_title) => {
      const default_title = knowledge_view.is_base ? "All" : make_default_kv_title();
      crud.update_item({...knowledge_view, title: new_title ?? default_title});
    },
    on_blur_type: EditableTextOnBlurType.conditional
  }), has_wcomponent && /* @__PURE__ */ h(Link, {
    route: "wcomponents",
    sub_route: void 0,
    item_id: knowledge_view.id,
    args: void 0
  }, /* @__PURE__ */ h(ExternalLinkIcon, null), "Component"), !has_wcomponent && editing && /* @__PURE__ */ h("span", {
    style: {cursor: "pointer"},
    onClick: () => {
      create_wcomponent({wcomponent: {
        base_id: knowledge_view.base_id,
        id: knowledge_view.id,
        title: knowledge_view.title,
        type: "statev2"
      }});
    }
  }, /* @__PURE__ */ h(ExternalLinkIcon, null), "Create Component")), (editing || knowledge_view.description) && /* @__PURE__ */ h("p", null, editing && /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Description"), "  ", /* @__PURE__ */ h(EditableText, {
    placeholder: "...",
    value: knowledge_view.description,
    on_blur: (description) => {
      crud.update_item({...knowledge_view, description});
    },
    on_blur_type: EditableTextOnBlurType.conditional
  })), /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Active assumptions (counterfactuals)"), /* @__PURE__ */ h(KnowledgeViewActiveCounterFactuals, {
    knowledge_view_id: knowledge_view.id,
    on_change: (ids) => crud.update_item({...knowledge_view, active_counterfactual_v2_ids: ids})
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(FoundationKnowledgeViewsList, {
    owner_knowledge_view: knowledge_view,
    on_change: (foundation_knowledge_view_ids) => {
      crud.update_item({...knowledge_view, foundation_knowledge_view_ids});
    }
  })), (editing || nested_kv?.ERROR_is_circular) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Nest under"), nested_kv?.ERROR_is_circular && /* @__PURE__ */ h("div", {
    style: {backgroundColor: "pink"}
  }, "Is circularly nested"), /* @__PURE__ */ h(SelectKnowledgeView, {
    selected_option_id: knowledge_view.parent_knowledge_view_id,
    allowed_ids: allow_nest_under_knowledge_view_ids,
    on_change: (parent_knowledge_view_id) => {
      crud.update_item({...knowledge_view, parent_knowledge_view_id});
    }
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Sort status"), /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id: knowledge_view.sort_type,
    options: knowledge_view_sort_types.map((type) => ({id: type, title: type})),
    allow_none: false,
    on_change: (sort_type) => sort_type && crud.update_item({...knowledge_view, sort_type})
  })), /* @__PURE__ */ h("hr", null), editing && !is_current_kv && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: void 0,
    args: {subview_id: knowledge_view.id}
  }, "Change to this knowledge view"), " to edit datetime lines config and change the base."), editing && is_current_kv && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(KnowledgeViewDatetimeLinesConfigForm, {
    editing,
    knowledge_view,
    knowledge_views_by_id: props.knowledge_views_by_id,
    update_item: crud.update_item
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(KnowledgeViewChangeBase, {
    knowledge_view
  }), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null)), (editing || children.length > 0) && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(KnowledgeViewListsSet, {
    ...props,
    parent_knowledge_view_id: knowledge_view.id,
    knowledge_views: children,
    item_descriptor: "Nested"
  })), /* @__PURE__ */ h("br", null));
};
