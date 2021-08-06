import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ExpandableList} from "./ExpandableList.js";
import {ListHeaderAddButton} from "./ListHeaderAddButton.js";
const map_state = (state) => ({
  consumption_formatting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _ExpandableListWithAddButton(props) {
  const {
    items_count,
    item_descriptor,
    new_item_descriptor = item_descriptor,
    consumption_formatting
  } = props;
  return /* @__PURE__ */ h(ExpandableList, {
    header_content: () => consumption_formatting ? null : /* @__PURE__ */ h(ListHeaderAddButton, {
      new_item_descriptor,
      on_pointer_down_new_list_entry: props.on_click_new_item
    }),
    content: props.content,
    items_count,
    items_descriptor: props.items_descriptor,
    item_descriptor,
    disable_collapsed: props.disable_collapsed,
    disable_partial_collapsed: props.disable_partial_collapsed,
    expanded_initial_state: props.expanded_initial_state
  });
}
export const ExpandableListWithAddButton = connector(_ExpandableListWithAddButton);
