import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {AutocompleteText} from "./AutocompleteText.js";
import {SelectedOption} from "./SelectedOption.js";
import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
const map_state = (state, own_props) => ({
  editable: own_props.always_allow_editing || !state.display_options.consumption_formatting
});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _MultiAutocompleteText(props) {
  const {editable, options, selected_option_ids} = props;
  const filtered_options = useMemo(() => options.filter(({id}) => !selected_option_ids.includes(id)), [options, selected_option_ids]);
  const option_by_id = useMemo(() => {
    const inner_option_by_id = {};
    options.forEach((option) => inner_option_by_id[option.id] = option);
    return inner_option_by_id;
  }, [options]);
  return /* @__PURE__ */ h(Box, {
    width: "100%",
    overflowX: "hidden"
  }, editable && /* @__PURE__ */ h(AutocompleteText, {
    ...props,
    selected_option_id: void 0,
    options: filtered_options,
    on_change: (id) => {
      if (id === void 0)
        return;
      props.on_change([...selected_option_ids, id]);
    },
    allow_editing_when_presenting: editable
  }), /* @__PURE__ */ h(Box, {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  }, selected_option_ids.map((id) => /* @__PURE__ */ h(Box, {
    p: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "30%",
    maxWidth: "100%"
  }, /* @__PURE__ */ h(SelectedOption, {
    editing: editable,
    option: option_by_id[id],
    on_remove_option: (removed_id) => {
      props.on_change(selected_option_ids.filter((id2) => id2 !== removed_id));
    },
    on_mouse_over_option: props.on_mouse_over_option,
    on_mouse_leave_option: props.on_mouse_leave_option,
    on_pointer_down_selected_option: (e, id2) => {
      props.change_route({item_id: id2});
    }
  })))));
}
const ConnectedMultiAutocompleteText = connector(_MultiAutocompleteText);
export function MultiAutocompleteText(props) {
  return /* @__PURE__ */ h(ConnectedMultiAutocompleteText, {
    ...props
  });
}
