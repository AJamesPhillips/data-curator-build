import {h} from "../../snowpack/pkg/preact.js";
import {ExpandableListWithAddButton} from "../form/editable_list/ExpandableListWithAddButton.js";
import {factory_render_list_content} from "../form/editable_list/render_list_content.js";
import {Link} from "../sharedf/Link.js";
import {create_new_knowledge_view} from "./create_new_knowledge_view.js";
import {optional_view_type} from "../views/optional_view_type.js";
import {ExpandableList, ExpandedListStates} from "../form/editable_list/ExpandableList.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
import {factory_get_kv_details, make_default_kv_title} from "./common.js";
export function KnowledgeViewList(props) {
  const {parent_knowledge_view_id, knowledge_views, current_view, sort_type} = props;
  if (!props.editing && knowledge_views.length === 0)
    return null;
  const render_list_content = factory_render_list_content({
    items: knowledge_views,
    get_id: (kv) => kv.id,
    item_props: {
      get_summary: factory_get_summary(current_view),
      get_details: factory_get_kv_details(props),
      get_details3,
      calc_initial_custom_expansion_state: factory_calc_initial_custom_expansion_state(props),
      crud: {
        update_item: (modified_kv) => {
          props.upsert_knowledge_view({knowledge_view: modified_kv});
        }
      }
    },
    debug_item_descriptor: "View"
  });
  const expanded_initial_state = calc_expanded_initial_state(props);
  if (sort_type === "hidden" || sort_type === "archived") {
    return /* @__PURE__ */ h(ExpandableList, {
      items_count: knowledge_views.length,
      content: render_list_content,
      item_descriptor: sentence_case(sort_type) + " " + (props.item_descriptor || "View"),
      disable_collapsed: false,
      expanded_initial_state
    });
  }
  const item_descriptor = (sort_type === "priority" ? "Priority " : "") + (props.item_descriptor || "View");
  return /* @__PURE__ */ h(ExpandableListWithAddButton, {
    items_count: knowledge_views.length,
    on_click_new_item: () => {
      create_new_knowledge_view({
        knowledge_view: {
          title: make_default_kv_title(),
          parent_knowledge_view_id,
          sort_type
        },
        creation_context: props.creation_context
      });
    },
    content: render_list_content,
    item_descriptor,
    disable_collapsed: true,
    expanded_initial_state
  });
}
function factory_get_summary(current_view) {
  const view = optional_view_type(current_view);
  return (knowledge_view, crud) => /* @__PURE__ */ h(Link, {
    route: void 0,
    sub_route: void 0,
    item_id: void 0,
    args: {view, subview_id: knowledge_view.id},
    selected_on: new Set(["route", "args.subview_id"])
  }, knowledge_view.title);
}
function get_details3() {
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null));
}
function calc_expanded_initial_state(props) {
  const {current_kv_parent_ids, knowledge_views, current_subview_id} = props;
  const knowledge_views_contain_current_kv = !!knowledge_views.find(({id}) => {
    return id === current_subview_id || current_kv_parent_ids.has(id);
  });
  return knowledge_views_contain_current_kv ? ExpandedListStates.partial_expansion : void 0;
}
function factory_calc_initial_custom_expansion_state(props) {
  return (item) => {
    return props.current_kv_parent_ids.has(item.id) ? true : void 0;
  };
}
