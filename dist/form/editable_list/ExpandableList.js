import {h} from "../../../_snowpack/pkg/preact.js";
import {useState} from "../../../_snowpack/pkg/preact/hooks.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
import {ListHeader} from "./ListHeader.js";
export var ExpandedListStates;
(function(ExpandedListStates2) {
  ExpandedListStates2[ExpandedListStates2["collapsed"] = 0] = "collapsed";
  ExpandedListStates2[ExpandedListStates2["partial_expansion"] = 1] = "partial_expansion";
  ExpandedListStates2[ExpandedListStates2["expanded"] = 2] = "expanded";
})(ExpandedListStates || (ExpandedListStates = {}));
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _ExpandableList(props) {
  const expanded_initial_state = props.expanded_initial_state || (props.disable_collapsed ? props.disable_partial_collapsed ? 2 : 1 : 0);
  const [expanded_items, set_expanded_items] = useState(expanded_initial_state);
  const expanded_item_rows = expanded_items === 2;
  const {
    header_content = () => null,
    content,
    items_count,
    item_descriptor,
    items_descriptor = get_items_descriptor(item_descriptor, items_count, props.editing),
    disable_partial_collapsed = false
  } = props;
  function toggle_expansion() {
    let new_expansion = (expanded_items + 1) % 3;
    if (props.disable_collapsed && new_expansion === 0)
      ++new_expansion;
    if (disable_partial_collapsed && new_expansion === 1)
      ++new_expansion;
    set_expanded_items(new_expansion);
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ListHeader, {
    items_descriptor,
    on_click_header: toggle_expansion,
    other_content: header_content
  }), content({disable_partial_collapsed, expanded_items: expanded_items > 0, expanded_item_rows}));
}
export const ExpandableList = connector(_ExpandableList);
export function get_items_descriptor(item_descriptor, items_count, editing = true) {
  if (editing || items_count !== void 0 && items_count !== 0) {
    item_descriptor += ` (${items_count})`;
  }
  return item_descriptor;
}
