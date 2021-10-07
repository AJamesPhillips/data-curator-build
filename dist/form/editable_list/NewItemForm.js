import {h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import "./NewItemForm.css.proxy.js";
import {Button} from "../../sharedf/Button.js";
import {EditableListEntry} from "./EditableListEntry.js";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle} from "../../../snowpack/pkg/@material-ui/core.js";
export function NewItemForm(props) {
  const {new_item, set_new_item, item_descriptor, item_props} = props;
  const {crud} = item_props;
  const modified_crud = useMemo(() => ({...crud, update_item: set_new_item}), [crud, set_new_item]);
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
    ...item_props,
    expanded: true,
    crud: modified_crud
  })), /* @__PURE__ */ h(DialogActions, null, /* @__PURE__ */ h(Button, {
    onClick: () => {
      setTimeout(() => crud.create_item(new_item), 0);
    }
  }, "Add ", item_descriptor), /* @__PURE__ */ h(Button, {
    onClick: () => set_new_item(void 0)
  }, "Cancel"))));
}
