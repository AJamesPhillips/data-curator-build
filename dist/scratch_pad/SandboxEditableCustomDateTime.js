import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
export function SandboxEditableCustomDateTime() {
  const [custom_date, set_custom_date] = useState(void 0);
  return /* @__PURE__ */ h("div", null, "EditableCustomDateTime", /* @__PURE__ */ h(EditableCustomDateTime, {
    value: custom_date,
    on_change: (custom_date2) => custom_date2 && set_custom_date(custom_date2)
  }));
}
