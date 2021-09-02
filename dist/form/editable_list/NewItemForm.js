import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "./NewItemForm.css.proxy.js";
import {Button} from "../../sharedf/Button.js";
import {EditableListEntry} from "./EditableListEntry.js";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle} from "../../../snowpack/pkg/@material-ui/core.js";
export function NewItemForm(props) {
  const {new_item, set_new_item, item_descriptor, item_top_props, add_item} = props;
  const [adding_item, set_adding_item] = useState(false);
  useEffect(() => {
    if (!adding_item)
      return;
    if (new_item)
      add_item(new_item);
    set_adding_item(false);
  }, [add_item, adding_item]);
  if (!new_item)
    return null;
  return /* @__PURE__ */ h(Box, null, /* @__PURE__ */ h(Dialog, {
    "aria-labelledby": "new_item_title",
    open: true,
    onClose: () => set_new_item(void 0)
  }, /* @__PURE__ */ h(DialogTitle, {
    id: "new_item_title"
  }, "New ", item_descriptor), /* @__PURE__ */ h(DialogContent, null, /* @__PURE__ */ h(EditableListEntry, {
    item: new_item,
    ...item_top_props,
    expanded: true,
    disable_collapsable: true,
    on_change: (item) => {
      set_new_item(item);
    }
  })), /* @__PURE__ */ h(DialogActions, null, /* @__PURE__ */ h(Button, {
    onClick: () => set_adding_item(true)
  }, `Add ${item_descriptor}`), /* @__PURE__ */ h(Button, {
    onClick: () => set_new_item(void 0)
  }, "Cancel"))));
}
