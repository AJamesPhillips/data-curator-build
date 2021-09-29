import {h} from "../../../snowpack/pkg/preact.js";
import {Modal} from "../../modal/Modal.js";
import {UserSigninRegisterForm} from "./UserSigninRegisterForm.js";
export function UserSigninRegister(props) {
  return /* @__PURE__ */ h(Modal, {
    title: /* @__PURE__ */ h("div", {
      style: {margin: 10, textAlign: "center"}
    }, /* @__PURE__ */ h("h2", null, "Signin / Register")),
    size: "medium",
    on_close: props.on_close,
    child: /* @__PURE__ */ h("div", {
      style: {textAlign: "center"}
    }, /* @__PURE__ */ h(UserSigninRegisterForm, null))
  });
}
