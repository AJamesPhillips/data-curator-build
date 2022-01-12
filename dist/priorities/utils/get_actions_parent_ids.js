import {test} from "../../shared/utils/test.js";
import {cloneable_generator_factory} from "../../utils/generators.js";
import {random_int} from "../../utils/random.js";
import {prepare_new_contextless_wcomponent_object} from "../../wcomponent/CRUD_helpers/prepare_new_wcomponent_object.js";
import {
  wcomponent_is_action,
  wcomponent_is_goal
} from "../../wcomponent/interfaces/SpecialisedObjects.js";
export function prepare_args_for_actions_parent_ids(args) {
  const {all_action_ids, all_goal_ids, wcomponents_by_id} = args;
  const actions = Array.from(all_action_ids).map((id) => wcomponents_by_id[id]).filter(wcomponent_is_action);
  const actions_by_id = {};
  actions.forEach((action) => actions_by_id[action.id] = action);
  const goals = Array.from(all_goal_ids).map((id) => wcomponents_by_id[id]).filter(wcomponent_is_goal);
  const goals_by_id = {};
  goals.forEach((goal) => goals_by_id[goal.id] = goal);
  return {actions_by_id, goals_by_id};
}
export function* get_actions_parent_ids(args) {
  const {action, actions_by_id, goals_by_id} = args;
  let parent = action;
  let parent_goal_or_action_ids = [];
  let parent_goal_or_action_ids_already_seen = new Set([parent.id]);
  while (true) {
    ;
    (parent.parent_goal_or_action_ids || []).forEach((id) => {
      if (parent_goal_or_action_ids_already_seen.has(id)) {
        console.warn(`Parent action/goal id already seen: "${id}".  May be circular, may just be a common ancestor.`);
        return;
      }
      parent_goal_or_action_ids_already_seen.add(id);
      const exists = actions_by_id[id] || goals_by_id[id];
      if (!exists) {
        console.log(`Parent goal or action for id "${id}" not found.  Might be from another base?`);
        return;
      }
      parent_goal_or_action_ids.push(id);
    });
    const has_valid_parents = parent_goal_or_action_ids.length > 0;
    const consumed_last_id = yield parent.id;
    if (consumed_last_id || !has_valid_parents)
      return void 0;
    const next_parent_id = parent_goal_or_action_ids.shift();
    if (!next_parent_id)
      return void 0;
    const next_parent = actions_by_id[next_parent_id] || goals_by_id[next_parent_id];
    if (!next_parent)
      return void 0;
    parent = next_parent;
  }
}
export function run_tests() {
  function make_goal(title, parent_goal_or_action_ids = []) {
    return prepare_new_contextless_wcomponent_object({
      type: "goal",
      base_id: -1,
      title,
      id: title + ` ${random_int(4)}`,
      parent_goal_or_action_ids
    });
  }
  function make_action(title, parent_goal_or_action_ids = []) {
    return prepare_new_contextless_wcomponent_object({
      type: "action",
      base_id: -1,
      title,
      id: title + ` ${random_int(4)}`,
      parent_goal_or_action_ids
    });
  }
  function get_derived_state(wcomponents) {
    const wcomponents_by_id = {};
    const all_action_ids = new Set();
    const all_goal_ids = new Set();
    wcomponents.forEach((wc) => {
      wcomponents_by_id[wc.id] = wc;
      if (wc.type === "action")
        all_action_ids.add(wc.id);
      else
        all_goal_ids.add(wc.id);
    });
    return prepare_args_for_actions_parent_ids({all_action_ids, all_goal_ids, wcomponents_by_id});
  }
  function get_cloneable_actions_parent_ids(action, all_actions_and_goals) {
    const args = {
      action,
      ...get_derived_state(all_actions_and_goals)
    };
    return cloneable_generator_factory(args, get_actions_parent_ids);
  }
  function no_parents_only_self() {
    const action0 = make_action("action0", []);
    const actions_parent_ids = get_cloneable_actions_parent_ids(action0, [action0]);
    const result = actions_parent_ids.next();
    test(result.value, action0.id, "Should return own id");
    test(result.done, false, "Should have no more ids");
  }
  no_parents_only_self();
  function branching_parents_grandparents() {
    const goal1 = make_goal("goal1");
    const goal2 = make_goal("goal2");
    const goal3 = make_goal("goal3");
    const subgoal2_3 = make_goal("subgoal2&3", [goal2.id, goal3.id]);
    const action1 = make_action("action1", [goal1.id, subgoal2_3.id]);
    let actions_parent_ids = get_cloneable_actions_parent_ids(action1, [
      action1,
      goal1,
      goal2,
      goal3,
      subgoal2_3
    ]);
    let result = actions_parent_ids.next();
    test(result.value, action1.id, "Should return own id");
    test(result.done, false, "Should have more ids ready");
    let saved_actions_parent_ids = actions_parent_ids.clone();
    result = actions_parent_ids.next(true);
    test(result.value, void 0, "Should return nothing when last id was own id and was also consumed");
    test(result.done, true, "Should have no more ids ready when last id was own id and was also consumed");
    actions_parent_ids = saved_actions_parent_ids;
    result = actions_parent_ids.next(false);
    test(result.value, goal1.id, "Should return next parent id, when last was own id and was not consumed");
    saved_actions_parent_ids = actions_parent_ids.clone();
    result = actions_parent_ids.next(true);
    test(result.value, void 0, "Should return nothing when last id was consumed");
    test(result.done, true, "Should have no more ids ready when last id was consumed");
    actions_parent_ids = saved_actions_parent_ids;
    result = actions_parent_ids.next(false);
    test(result.value, subgoal2_3.id, "Should return next parent id, when last was not consumed but there is a sibling id");
    saved_actions_parent_ids = actions_parent_ids.clone();
    result = actions_parent_ids.next(true);
    test(result.value, void 0, "Should return nothing when last id was consumed");
    test(result.done, true, "Should have no more ids ready when last id was consumed");
    actions_parent_ids = saved_actions_parent_ids;
    result = actions_parent_ids.next(false);
    test(result.value, goal2.id, "Should return next parent id, when last was not consumed but there is a grandparent");
    saved_actions_parent_ids = actions_parent_ids.clone();
    result = actions_parent_ids.next(true);
    test(result.value, void 0, "Should return nothing when last id was consumed");
    test(result.done, true, "Should have no more ids ready when last id was consumed");
    actions_parent_ids = saved_actions_parent_ids;
    result = actions_parent_ids.next(false);
    test(result.value, goal3.id, "Should return next parent id, when last was not consumed and there is a grandparent sibling");
    saved_actions_parent_ids = actions_parent_ids.clone();
    result = actions_parent_ids.next(true);
    test(result.value, void 0, "Should return nothing when last id was consumed");
    test(result.done, true, "Should have no more ids ready when last id was consumed");
    actions_parent_ids = saved_actions_parent_ids;
    result = actions_parent_ids.next(false);
    test(result.value, void 0, "Should return undefined when exhausted parent and grandparent ids");
    test(result.done, true, "Should have no more ids");
  }
  branching_parents_grandparents();
  function action_parents() {
    const action1 = make_action("action1");
    const action2 = make_action("action2");
    const action3 = make_action("action3");
    const subaction2_3 = make_action("subaction2&3", [action2.id, action3.id]);
    const action4 = make_action("action1", [action1.id, subaction2_3.id]);
    let actions_parent_ids = get_cloneable_actions_parent_ids(action4, [
      action1,
      action2,
      action3,
      subaction2_3,
      action4
    ]);
    let result = actions_parent_ids.next();
    test(result.value, action4.id, "Should return own id");
    result = actions_parent_ids.next();
    test(result.value, action1.id, "Should return next id");
    result = actions_parent_ids.next();
    test(result.value, subaction2_3.id, "Should return next id");
    result = actions_parent_ids.next();
    test(result.value, action2.id, "Should return next id");
    result = actions_parent_ids.next();
    test(result.value, action3.id, "Should return next id");
    result = actions_parent_ids.next();
    test(result.value, void 0, "Should return no more ids");
    test(result.done, true, "Should be done");
  }
  action_parents();
  function circular_parents() {
    const goal1 = make_goal("goal1");
    const action1 = make_action("action1", [goal1.id]);
    goal1.parent_goal_or_action_ids = [action1.id];
    const action2 = make_action("action2", [goal1.id]);
    let actions_parent_ids = get_cloneable_actions_parent_ids(action2, [
      action1,
      action2,
      goal1
    ]);
    let result = actions_parent_ids.next();
    test(result.value, action2.id, "Should return own id");
    test(result.done, false, "Should have more ids ready");
    result = actions_parent_ids.next();
    test(result.value, goal1.id, "Should return next id");
    test(result.done, false, "Should have more ids ready");
    result = actions_parent_ids.next();
    test(result.value, action1.id, "Should return next id");
    test(result.done, false, "Should have not finished");
    result = actions_parent_ids.next();
    test(result.done, true, "Should have finished");
  }
  circular_parents();
  function spread_iterator_containing_one_parent() {
    const goal1 = make_goal("goal1");
    const action1 = make_action("action1", [goal1.id]);
    const actions_parent_ids = get_cloneable_actions_parent_ids(action1, [
      action1,
      goal1
    ]);
    const result = [...actions_parent_ids];
    test(result, [action1.id, goal1.id], "Should return both ids");
  }
  spread_iterator_containing_one_parent();
}
