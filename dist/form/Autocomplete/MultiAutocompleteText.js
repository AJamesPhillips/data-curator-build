import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {ACTIONS} from "../../state/actions.js";
import {AutocompleteText} from "./AutocompleteText.js";
import {SelectedOption} from "./SelectedOption.js";
import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
const map_state = (state, own_props) => ({
  editable: own_props.force_editable !== void 0 ? own_props.force_editable : !state.display_options.consumption_formatting
});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _MultiAutocompleteText(props) {
  const {editable, options, selected_option_ids} = props;
  const {filtered_options, missing_options_by_id} = useMemo(() => {
    const filtered_options2 = options.filter(({id}) => !selected_option_ids.includes(id));
    const missing_options_by_id2 = {};
    if (filtered_options2.length !== selected_option_ids.length) {
      const filtered_ids = new Set(filtered_options2.map(({id}) => id));
      const missing = selected_option_ids.filter((id) => !filtered_ids.has(id));
      missing.forEach((missing_id) => {
        const missing_option = {
          id: missing_id,
          title: "<Label Not found>"
        };
        missing_options_by_id2[missing_id] = missing_option;
        filtered_options2.push(missing_option);
      });
    }
    return {filtered_options: filtered_options2, missing_options_by_id: missing_options_by_id2};
  }, [options, selected_option_ids]);
  const options_by_id = useMemo(() => {
    const inner_option_by_id = {
      ...missing_options_by_id
    };
    options.forEach((option) => inner_option_by_id[option.id] = option);
    return inner_option_by_id;
  }, [options, missing_options_by_id]);
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
    force_editable: editable
  }), /* @__PURE__ */ h("div", {
    style: {display: "flex", flexDirection: "row", flexWrap: "wrap", overflow: "hidden"}
  }, selected_option_ids.map((id) => /* @__PURE__ */ h("div", {
    style: {flexGrow: 1, flexShrink: 1, flexBasis: "30%", maxWidth: "100%"}
  }, /* @__PURE__ */ h(SelectedOption, {
    editing: editable,
    option: options_by_id[id],
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
