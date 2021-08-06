import {h} from "../../snowpack/pkg/preact.js";
import "./SearchWindow.css.proxy.js";
import {Modal} from "../modal/Modal.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
export function SearchWindow(props) {
  return /* @__PURE__ */ h(Modal, {
    on_close: () => props.on_blur && props.on_blur(),
    title: props.search_window_title,
    child: () => /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(AutocompleteText, {
      placeholder: props.placeholder,
      selected_option_id: props.selected_option_id,
      initial_search_term: props.initial_search_term,
      options: props.options,
      allow_none: props.allow_none,
      on_change: (option_id) => {
        props.on_change(option_id);
        props.on_blur && props.on_blur();
      },
      on_mouse_over_option: props.on_mouse_over_option,
      on_mouse_leave_option: props.on_mouse_leave_option,
      extra_styles: props.extra_styles,
      start_expanded: true
    }))
  });
}
