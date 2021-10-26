const clicked_wcomponent_type = "clicked_wcomponent";
const clicked_wcomponent = (args) => {
  return {type: clicked_wcomponent_type, ...args};
};
export const is_clicked_wcomponent = (action) => {
  return action.type === clicked_wcomponent_type;
};
const clear_selected_wcomponents_type = "clear_selected_wcomponents";
const clear_selected_wcomponents = (args) => {
  return {type: clear_selected_wcomponents_type, ...args};
};
export const is_clear_selected_wcomponents = (action) => {
  return action.type === clear_selected_wcomponents_type;
};
const set_selected_wcomponents_type = "set_selected_wcomponents";
const set_selected_wcomponents = (args) => {
  return {type: set_selected_wcomponents_type, ...args};
};
export const is_set_selected_wcomponents = (action) => {
  return action.type === set_selected_wcomponents_type;
};
const pointerupdown_on_connection_terminal_type = "pointerupdown_on_connection_terminal";
const pointerupdown_on_connection_terminal = (args) => {
  return {type: pointerupdown_on_connection_terminal_type, ...args};
};
const is_pointerupdown_on_connection_terminal = (action) => {
  return action.type === pointerupdown_on_connection_terminal_type;
};
export const is_pointerup_on_connection_terminal = (action) => {
  return is_pointerupdown_on_connection_terminal(action) && action.up_down === "up";
};
export const is_pointerdown_on_connection_terminal = (action) => {
  return is_pointerupdown_on_connection_terminal(action) && action.up_down === "down";
};
const clear_pointerupdown_on_connection_terminal_type = "clear_pointerupdown_on_connection_terminal";
const clear_pointerupdown_on_connection_terminal = (args) => {
  return {type: clear_pointerupdown_on_connection_terminal_type, ...args};
};
export const is_clear_pointerupdown_on_connection_terminal = (action) => {
  return action.type === clear_pointerupdown_on_connection_terminal_type;
};
const set_wcomponent_ids_to_move_type = "set_wcomponent_ids_to_move";
const set_wcomponent_ids_to_move = (args) => {
  return {type: set_wcomponent_ids_to_move_type, ...args};
};
export const is_set_wcomponent_ids_to_move = (action) => {
  return action.type === set_wcomponent_ids_to_move_type;
};
export const selecting_actions = {
  clicked_wcomponent,
  clear_selected_wcomponents,
  set_selected_wcomponents,
  pointerupdown_on_connection_terminal,
  clear_pointerupdown_on_connection_terminal,
  set_wcomponent_ids_to_move
};
