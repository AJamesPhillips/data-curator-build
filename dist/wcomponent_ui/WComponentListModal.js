import {h} from "../../snowpack/pkg/preact.js";
import {Modal} from "../modal/Modal.js";
import {WComponentsList} from "./WComponentsList.js";
export function WComponentListModal(props) {
  return /* @__PURE__ */ h(Modal, {
    on_close: props.on_close,
    title: props.title || "Objects",
    child: /* @__PURE__ */ h(WComponentsList, {
      wcomponent_ids: props.object_ids
    })
  });
}
