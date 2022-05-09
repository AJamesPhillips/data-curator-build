import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {AutocompleteText} from "../../form/Autocomplete/AutocompleteText.js";
const map_state = (state) => ({
  bases_by_id: state.user_info.bases_by_id,
  chosen_base_id: state.user_info.chosen_base_id
});
const connector = connect(map_state);
function _SelectBaseToMoveTo(props) {
  const selected_option_id = props.base_id_to_move_to === void 0 ? void 0 : `${props.base_id_to_move_to}`;
  const options_of_other_editable_bases = Object.values(props.bases_by_id || {}).filter((b) => b.id !== props.chosen_base_id && b.can_edit).map((base) => ({id: `${base.id}`, title: base.title}));
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id,
    allow_none: true,
    options: options_of_other_editable_bases,
    on_change: (new_base_id_to_move_to_str) => {
      const new_base_id_to_move_to = new_base_id_to_move_to_str === void 0 ? void 0 : parseInt(new_base_id_to_move_to_str);
      props.on_change(new_base_id_to_move_to);
    }
  }));
}
export const SelectBaseToMoveTo = connector(_SelectBaseToMoveTo);
