import {h} from "../../../snowpack/pkg/preact.js";
import {useRef} from "../../../snowpack/pkg/preact/hooks.js";
import "../Editable.css.proxy.js";
import {WComponentSearchWindow} from "../../search/WComponentSearchWindow.js";
export function ConditionalWComponentSearchWindow(props) {
  const {
    value,
    id_insertion_point,
    conditional_on_change,
    on_close
  } = props;
  const initial_search_term = get_initial_search_term({value, id_insertion_point});
  const has_inserted_id = useRef(false);
  return /* @__PURE__ */ h(WComponentSearchWindow, {
    initial_search_term,
    on_change: (id_to_insert) => {
      const new_value = insert_id_into_text({
        value,
        id_to_insert,
        id_insertion_point
      });
      const end_of_inserted_id = id_insertion_point + (id_to_insert?.length || 0);
      const end_of_search_term = end_of_inserted_id + (initial_search_term?.length || 0);
      const on_focus_set_selection = {start: end_of_inserted_id, end: end_of_search_term};
      has_inserted_id.current = true;
      conditional_on_change({new_value, on_focus_set_selection});
    },
    on_blur: () => {
      if (has_inserted_id.current)
        return;
      const end_of_search_term = id_insertion_point + (initial_search_term?.length || 0);
      const on_focus_set_selection = {start: id_insertion_point, end: end_of_search_term};
      on_close(on_focus_set_selection);
    }
  });
}
function get_initial_search_term(args) {
  const text_after_insertion_point = args.value.slice(args.id_insertion_point);
  const search_term_match = text_after_insertion_point.match(/^(\w+)/);
  return search_term_match ? search_term_match[1] || "" : "";
}
function insert_id_into_text(args) {
  const {value, id_to_insert, id_insertion_point} = args;
  if (id_to_insert === void 0)
    return value;
  return value.slice(0, id_insertion_point) + id_to_insert + value.slice(id_insertion_point);
}
