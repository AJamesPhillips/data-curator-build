export function factory_on_pointer_down(args) {
  const {
    wcomponent_id: id,
    shift_or_control_keys_are_down,
    change_route,
    clicked_wcomponent,
    clear_selected_wcomponents,
    is_current_item
  } = args;
  return (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
    clicked_wcomponent({id});
    if (shift_or_control_keys_are_down) {
      change_route({route: "wcomponents", sub_route: "wcomponents_edit_multiple", item_id: null});
    } else {
      if (is_current_item) {
        change_route({route: "wcomponents", sub_route: null, item_id: null});
        clear_selected_wcomponents({});
      } else {
        change_route({route: "wcomponents", sub_route: null, item_id: id});
      }
    }
  };
}
