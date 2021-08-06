import {h} from "../../snowpack/pkg/preact.js";
import {Modal} from "../modal/Modal.js";
import {ObjectsList} from "./ObjectsList.js";
export function ObjectsListModal(props) {
  return /* @__PURE__ */ h(Modal, {
    on_close: props.on_close,
    title: props.title || "Objects",
    child: () => /* @__PURE__ */ h(ObjectsList, {
      object_ids: props.object_ids
    })
  });
}
