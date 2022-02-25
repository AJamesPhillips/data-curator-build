import {h} from "../../../snowpack/pkg/preact.js";
import {Button} from "../../sharedf/Button.js";
export function ListHeaderAddButton(props) {
  const {
    new_item_descriptor,
    on_pointer_down_new_list_entry
  } = props;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Button, {
    fullWidth: true,
    onClick: (e) => {
      e.stopImmediatePropagation();
      on_pointer_down_new_list_entry();
    }
  }, `New ${new_item_descriptor}`));
}
