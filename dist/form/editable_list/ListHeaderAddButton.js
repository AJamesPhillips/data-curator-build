import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {Button} from "../../sharedf/Button.js";
export function ListHeaderAddButton(props) {
  const {
    new_item_descriptor,
    on_pointer_down_new_list_entry
  } = props;
  return /* @__PURE__ */ h(Box, {
    mb: 2
  }, /* @__PURE__ */ h(Button, {
    fullWidth: true,
    onClick: () => on_pointer_down_new_list_entry()
  }, `New ${new_item_descriptor}`));
}
