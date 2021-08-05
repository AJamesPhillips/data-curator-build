import {h} from "../../_snowpack/pkg/preact.js";
import {useRef} from "../../_snowpack/pkg/preact/hooks.js";
import "./Editable.css.proxy.js";
import {WComponentSearchWindow} from "../search/WComponentSearchWindow.js";
export function ConditionalWComponentSearchWindow(props) {
  const id_to_insert = useRef(void 0);
  const {
    value,
    id_insertion_point,
    on_focus_set_selection,
    conditional_on_change,
    set_id_insertion_point
  } = props;
  const initial_search_term = get_initial_search_term({value, id_insertion_point});
  return /* @__PURE__ */ h(WComponentSearchWindow, {
    initial_search_term,
    on_change: (_id_to_insert) => id_to_insert.current = _id_to_insert,
    on_blur: () => {
      const new_value = insert_id_into_text({
        value,
        id_to_insert: id_to_insert.current,
        id_insertion_point
      });
      const end_of_inserted_id = id_insertion_point + (id_to_insert.current !== void 0 ? id_to_insert.current.length : 0);
      const end_of_search_term = end_of_inserted_id + (initial_search_term !== void 0 ? initial_search_term.length : 0);
      on_focus_set_selection.current = [end_of_inserted_id, end_of_search_term];
      set_id_insertion_point(void 0);
      conditional_on_change(new_value);
    }
  });
}
function get_initial_search_term(args) {
  const text_after_insertion_point = args.value.slice(args.id_insertion_point);
  const search_term_match = text_after_insertion_point.match(/^(\w+)/);
  return search_term_match ? search_term_match[1] : "";
}
function insert_id_into_text(args) {
  const {value, id_to_insert, id_insertion_point} = args;
  if (id_to_insert === void 0)
    return value;
  return value.slice(0, id_insertion_point) + id_to_insert + value.slice(id_insertion_point);
}
