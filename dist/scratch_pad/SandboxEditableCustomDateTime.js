import {h} from "../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {get_today_str} from "../shared/utils/date_helpers.js";
import {ACTIONS} from "../state/actions.js";
const map_state = (state) => ({
  editing: !state.display_options.consumption_formatting
});
const map_dispatch = {
  toggle_consumption_formatting: ACTIONS.display.toggle_consumption_formatting
};
const connector = connect(map_state, map_dispatch);
function _SandboxEditableCustomDateTime(props) {
  const today_dt_str = get_today_str();
  const [custom_date, set_custom_date] = useState(new Date(today_dt_str));
  useEffect(() => {
    if (!props.editing)
      props.toggle_consumption_formatting({});
  }, []);
  return /* @__PURE__ */ h("div", null, "EditableCustomDateTime", /* @__PURE__ */ h(EditableCustomDateTime, {
    value: custom_date,
    on_change: (custom_date2) => custom_date2 && set_custom_date(custom_date2)
  }));
}
export const SandboxEditableCustomDateTime = connector(_SandboxEditableCustomDateTime);
