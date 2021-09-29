import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {TextField} from "../../snowpack/pkg/@material-ui/core.js";
import "./Editable.css.proxy.js";
import {date_to_string, correct_datetime_for_local_time_zone, valid_date} from "./datetime_utils.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {Button} from "../sharedf/Button.js";
import {date2str, get_today_str} from "../shared/utils/date_helpers.js";
const map_state = (state) => ({
  time_resolution: state.display_options.time_resolution,
  presenting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _EditableCustomDateTime(props) {
  const display_value = props_to_str_value(props);
  const [editing, set_editing] = useState(false);
  const no_entry_class_name = display_value ? "" : "no_entry";
  const {on_change} = props;
  if (!on_change)
    return /* @__PURE__ */ h("div", {
      className: no_entry_class_name
    }, display_value);
  const {invariant_value, show_now_shortcut_button = false, show_today_shortcut_button = true} = props;
  const valid = is_value_valid(display_value);
  const not_editable = props.always_allow_editing ? false : props.presenting;
  const class_name = `editable_field ${valid ? "" : "invalid"} ${no_entry_class_name} ${not_editable ? "not_editable" : ""}`;
  const title = (props.title || "DateTime") + (props.invariant_value && props.value ? " (custom)" : "");
  return /* @__PURE__ */ h("div", {
    className: class_name,
    title
  }, /* @__PURE__ */ h(TextField, {
    disabled: not_editable,
    type: "text",
    label: title,
    value: display_value,
    onFocus: () => set_editing(true),
    inputRef: (r) => {
      if (!r || !editing)
        return;
      const date = props_value(props);
      const new_working_value = date_to_string({date, time_resolution: "minute", trim_midnight: false});
      r.value = new_working_value;
      r.setSelectionRange(0, r.value.length);
    },
    onChange: (e) => {
      const valid2 = is_value_valid(e.currentTarget.value);
      if (valid2)
        e.currentTarget.classList.remove("invalid");
      else
        e.currentTarget.classList.add("invalid");
    },
    onBlur: (e) => {
      const working_value = e.currentTarget.value;
      const new_value = handle_on_blur({working_value, invariant_value});
      on_change(new_value);
      set_editing(false);
    },
    size: "small",
    variant: "outlined",
    fullWidth: true
  }), editing && show_now_shortcut_button && /* @__PURE__ */ h(NowButton, {
    on_change
  }), editing && show_today_shortcut_button && /* @__PURE__ */ h(Button, {
    value: "Today",
    onClick: () => {
      const today_dt_str = get_today_str();
      on_change(new Date(today_dt_str));
    }
  }));
}
export const EditableCustomDateTime = connector(_EditableCustomDateTime);
function is_value_valid(str) {
  const working_value_date = correct_datetime_for_local_time_zone(str);
  return !!working_value_date && valid_date(working_value_date);
}
function NowButton(props) {
  return /* @__PURE__ */ h(Button, {
    value: "Now",
    onClick: () => {
      const datetime = new Date(new Date().getTime() + 3e4);
      const new_working_value = date2str(datetime, "yyyy-MM-dd hh:mm");
      props.on_change(new Date(new_working_value));
    }
  });
}
function props_value(args) {
  const value = args.value || args.invariant_value;
  return value;
}
function props_to_str_value(args) {
  const date = props_value(args);
  const working_value = date_to_string({date, time_resolution: args.time_resolution});
  return working_value;
}
function handle_on_blur(args) {
  const {working_value, invariant_value} = args;
  let new_value = correct_datetime_for_local_time_zone(working_value);
  if (new_value && new_value.getTime() === (invariant_value && invariant_value.getTime())) {
    new_value = void 0;
  }
  return new_value;
}
