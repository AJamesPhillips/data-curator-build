import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import "./ActionsListView.css.proxy.js";
import {MainArea} from "../layout/MainArea.js";
import {wcomponent_is_action} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_current_composed_knowledge_view_from_state, get_wcomponents_from_ids} from "../state/specialised_objects/accessors.js";
import {ACTIONS} from "../state/actions.js";
import {PrioritisableAction} from "./PrioritisableAction.js";
import {SortDirection, sort_list} from "../shared/utils/sort.js";
import {get_created_at_ms} from "../shared/utils_datetime/utils_datetime.js";
import {selector_chosen_base_id} from "../state/user_info/selector.js";
import {get_wcomponent_state_value_and_probabilities} from "../wcomponent_derived/get_wcomponent_state_value.js";
import {ACTION_VALUE_POSSIBILITY_ID} from "../wcomponent/value/parse_value.js";
import {SIDE_PANEL_WIDTH} from "../side_panel/width.js";
import {useMemo, useRef, useState} from "../../snowpack/pkg/preact/hooks.js";
import {get_default_parent_goal_or_action_ids} from "./get_default_parent_goal_or_action_ids.js";
import {AddNewActionButton} from "./AddNewActionButton.js";
export function ActionsListView(props) {
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(ActionsListViewContent, null)
  });
}
const map_state = (state) => {
  const {wcomponents_by_id, knowledge_views_by_id} = state.specialised_objects;
  let filtered_by_knowledge_view_id = "";
  const filter_by_knowledge_view = false;
  let action_ids = void 0;
  const composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  if (filter_by_knowledge_view) {
    if (composed_knowledge_view) {
      filtered_by_knowledge_view_id = composed_knowledge_view.id;
      action_ids = composed_knowledge_view.wc_ids_by_type.action;
    }
  } else
    action_ids = state.derived.wcomponent_ids_by_type.action;
  return {
    composed_knowledge_view,
    filtered_by_knowledge_view_id,
    action_ids,
    wcomponents_by_id,
    knowledge_views_by_id,
    base_id: selector_chosen_base_id(state),
    display_side_panel: state.controls.display_side_panel
  };
};
const map_dispatch = {
  upsert_wcomponent: ACTIONS.specialised_object.upsert_wcomponent
};
const connector = connect(map_state, map_dispatch);
function _ActionsListViewContent(props) {
  const {composed_knowledge_view, action_ids, wcomponents_by_id, knowledge_views_by_id, base_id} = props;
  const [max_done_visible, set_max_done_visible] = useState(5);
  const [pointer_down_at, set_pointer_down_at] = useState(void 0);
  const initial_scroll = useRef(void 0);
  const action_list_view_content_el = useRef(void 0);
  if (base_id === void 0)
    return /* @__PURE__ */ h("div", null, "No base id chosen");
  if (action_ids === void 0)
    return /* @__PURE__ */ h("div", null, "No actions");
  const now = new Date().getTime();
  let actions = Array.from(action_ids).map((id) => wcomponents_by_id[id]).filter(wcomponent_is_action);
  actions = sort_list(actions, get_modified_or_created_at, SortDirection.descending);
  const actions_icebox = [];
  const actions_todo = [];
  const actions_in_progress = [];
  const actions_done_or_rejected = [];
  actions.forEach((action) => {
    const attribute_values = get_wcomponent_state_value_and_probabilities({
      wcomponent: action,
      VAP_set_id_to_counterfactual_v2_map: {},
      created_at_ms: now,
      sim_ms: now
    });
    const most_probable = attribute_values.most_probable_VAP_set_values[0];
    if (most_probable?.value_id === ACTION_VALUE_POSSIBILITY_ID.action_in_progress)
      actions_in_progress.push(action);
    else if (most_probable?.value_id === ACTION_VALUE_POSSIBILITY_ID.action_completed || most_probable?.value_id === ACTION_VALUE_POSSIBILITY_ID.action_rejected || most_probable?.value_id === ACTION_VALUE_POSSIBILITY_ID.action_failed) {
      actions_done_or_rejected.push(action);
    } else if (action.todo_index)
      actions_todo.push(action);
    else
      actions_icebox.push(action);
  });
  const hidden_done = actions_done_or_rejected.length - max_done_visible;
  const sorted_actions_todo = sort_list(actions_todo, (a) => a.todo_index || 0, SortDirection.descending);
  const action_ids_for_current_kv = composed_knowledge_view?.wc_ids_by_type?.action;
  const most_recent_action_id = useMemo(() => {
    let actions_on_current_kv = get_wcomponents_from_ids(wcomponents_by_id, action_ids_for_current_kv).filter(wcomponent_is_action);
    actions_on_current_kv = sort_list(actions_on_current_kv, get_created_at_ms, SortDirection.descending);
    const most_recent_action_id2 = (actions_on_current_kv || [])[0]?.id || "";
    return most_recent_action_id2;
  }, [action_ids_for_current_kv]);
  const knowledge_view_id = composed_knowledge_view?.id;
  const parent_goal_or_action_ids = get_default_parent_goal_or_action_ids(knowledge_view_id, knowledge_views_by_id, wcomponents_by_id);
  return /* @__PURE__ */ h("div", {
    className: `action_list_view_content ${pointer_down_at === void 0 ? "" : "moving"}`,
    ref: (e) => action_list_view_content_el.current = e || void 0,
    onPointerDown: (e) => {
      e.preventDefault();
      const el = action_list_view_content_el.current;
      if (!el)
        return;
      set_pointer_down_at({x: e.clientX, y: e.clientY});
      initial_scroll.current = {left: el.scrollLeft, top: el.scrollTop};
    },
    onPointerMove: (e) => {
      if (pointer_down_at === void 0)
        return;
      if (initial_scroll.current === void 0)
        return;
      if (!action_list_view_content_el.current)
        return;
      const left = initial_scroll.current.left - (e.clientX - pointer_down_at.x);
      const top = initial_scroll.current.top - (e.clientY - pointer_down_at.y);
      action_list_view_content_el.current.scroll(left, top);
    },
    onPointerUp: (e) => set_pointer_down_at(void 0),
    onPointerLeave: (e) => set_pointer_down_at(void 0),
    onPointerOut: (e) => set_pointer_down_at(void 0)
  }, /* @__PURE__ */ h("div", {
    className: "action_list icebox"
  }, /* @__PURE__ */ h("h1", null, "Icebox", /* @__PURE__ */ h(AddNewActionButton, {
    list_type: "icebox",
    most_recent_action_id,
    composed_knowledge_view,
    wcomponents_by_id,
    parent_goal_or_action_ids,
    base_id
  })), actions_icebox.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action,
    show_icebox_actions: true
  }))), /* @__PURE__ */ h("div", {
    className: "action_list todo"
  }, /* @__PURE__ */ h("h1", null, "Todo", /* @__PURE__ */ h(AddNewActionButton, {
    list_type: "todo",
    most_recent_action_id,
    composed_knowledge_view,
    wcomponents_by_id,
    parent_goal_or_action_ids,
    base_id
  })), sorted_actions_todo.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action,
    show_todo_actions: true
  }))), /* @__PURE__ */ h("div", {
    className: "action_list in_progress"
  }, /* @__PURE__ */ h("h1", null, "In progress", /* @__PURE__ */ h(AddNewActionButton, {
    list_type: "in_progress",
    most_recent_action_id,
    composed_knowledge_view,
    wcomponents_by_id,
    parent_goal_or_action_ids,
    base_id
  })), actions_in_progress.map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  }))), /* @__PURE__ */ h("div", {
    className: "action_list done_or_rejected"
  }, /* @__PURE__ */ h("h1", null, "Done", /* @__PURE__ */ h(AddNewActionButton, {
    list_type: "done",
    most_recent_action_id,
    composed_knowledge_view,
    wcomponents_by_id,
    parent_goal_or_action_ids,
    base_id
  })), actions_done_or_rejected.slice(0, max_done_visible).map((action) => /* @__PURE__ */ h(PrioritisableAction, {
    key: action.id,
    action
  })), hidden_done > 0 && /* @__PURE__ */ h("div", {
    style: {textAlign: "center", margin: 40, cursor: "pointer"},
    onClick: () => set_max_done_visible(max_done_visible + 50)
  }, "... ", hidden_done, " hidden ...")), /* @__PURE__ */ h("div", {
    className: "side_panel_padding",
    style: {minWidth: props.display_side_panel ? SIDE_PANEL_WIDTH : 0}
  }));
}
const ActionsListViewContent = connector(_ActionsListViewContent);
function get_modified_or_created_at(a) {
  if (a.modified_at)
    return a.modified_at.getTime();
  return get_created_at_ms(a);
}
