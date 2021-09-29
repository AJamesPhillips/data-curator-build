import {h} from "../../../snowpack/pkg/preact.js";
import {Modal} from "../../modal/Modal.js";
import {StorageOptionsForm} from "./StorageOptionsForm.js";
export function SelectStorage(props) {
  const {on_close} = props;
  return /* @__PURE__ */ h(Modal, {
    title: /* @__PURE__ */ h("div", {
      style: {margin: 10}
    }, /* @__PURE__ */ h("h2", {
      style: {display: "inline"}
    }, "Knowledge Bases")),
    size: "medium",
    on_close: on_close && ((e) => {
      e?.stopImmediatePropagation();
      on_close();
    }),
    child: /* @__PURE__ */ h(StorageOptionsForm, {
      on_close
    })
  });
}
