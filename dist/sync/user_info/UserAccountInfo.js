import {h} from "../../../snowpack/pkg/preact.js";
import {Modal} from "../../modal/Modal.js";
import {UserAccountInfoForm} from "./UserAccountInfoForm.js";
export function UserAccountInfo(props) {
  const {on_close} = props;
  return /* @__PURE__ */ h(Modal, {
    title: /* @__PURE__ */ h("div", {
      style: {margin: 10, textAlign: "center"}
    }, /* @__PURE__ */ h("h2", null, "User Account")),
    size: "medium",
    on_close: !on_close ? void 0 : (e) => {
      e?.stopImmediatePropagation();
      on_close();
    },
    child: /* @__PURE__ */ h("div", {
      style: {textAlign: "center"}
    }, /* @__PURE__ */ h(UserAccountInfoForm, {
      on_close
    }))
  });
}
