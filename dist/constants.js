import {h} from "../snowpack/pkg/preact.js";
export const CONTACT_EMAIL_ADDRESS = "ajp@centerofci.org";
export const CONTACT_EMAIL_ADDRESS_TAG = /* @__PURE__ */ h("a", {
  href: `mailto: ${CONTACT_EMAIL_ADDRESS}`,
  target: "_blank"
}, CONTACT_EMAIL_ADDRESS);
