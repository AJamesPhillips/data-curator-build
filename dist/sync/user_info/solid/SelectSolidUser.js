import {h} from "../../../../snowpack/pkg/preact.js";
import {Modal} from "../../../modal/Modal.js";
import {SolidSigninForm} from "./SolidSigninForm.js";
export function SelectSolidUser(props) {
  return /* @__PURE__ */ h(Modal, {
    title: /* @__PURE__ */ h("div", {
      style: {margin: 10}
    }, /* @__PURE__ */ h("h2", null, "Sign in to your Solid account")),
    size: "medium",
    on_close: (e) => {
      e?.stopImmediatePropagation();
      props.on_close();
    },
    child: /* @__PURE__ */ h(SolidSigninForm, {
      on_close: props.on_close
    })
  });
}
