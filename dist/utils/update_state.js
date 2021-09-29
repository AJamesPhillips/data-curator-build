export function update_state(root_state, path1, replacement_state) {
  const current = root_state[path1];
  if (current === replacement_state)
    return root_state;
  return {
    ...root_state,
    [path1]: replacement_state
  };
}
export function update_substate(root_state, path1, path2, replacement_substate) {
  const replacement_state = update_state(root_state[path1], path2, replacement_substate);
  return update_state(root_state, path1, replacement_state);
}
export function update_subsubstate(root_state, path1, path2, path3, replacement_subsubstate) {
  const replacement_substate = update_state(root_state[path1][path2], path3, replacement_subsubstate);
  const replacement_state = update_state(root_state[path1], path2, replacement_substate);
  return update_state(root_state, path1, replacement_state);
}
export function update_subsubsubstate(root_state, path1, path2, path3, path4, replacement_subsubsubstate) {
  const replacement_subsubstate = update_state(root_state[path1][path2][path3], path4, replacement_subsubsubstate);
  const replacement_substate = update_state(root_state[path1][path2], path3, replacement_subsubstate);
  const replacement_state = update_state(root_state[path1], path2, replacement_substate);
  return update_state(root_state, path1, replacement_state);
}
