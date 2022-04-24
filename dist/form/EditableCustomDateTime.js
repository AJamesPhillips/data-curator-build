import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {TextField} from "../../snowpack/pkg/@material-ui/core.js";
import "./Editable.css.proxy.js";
import {date_to_string, correct_datetime_for_local_time_zone, valid_date} from "./datetime_utils.js";
import {useEffect, useRef, useState} from "../../snowpack/pkg/preact/hooks.js";
import {Button} from "../sharedf/Button.js";
import {date2str, get_today_str} from "../shared/utils/date_helpers.js";
import {find_parent_element_by_class} from "../utils/html.js";
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
  const not_editable = props.force_editable !== void 0 ? !props.force_editable : props.presenting;
  const class_name = `editable_field ${valid ? "" : "invalid"} ${no_entry_class_name} ${not_editable ? "not_editable" : ""}`;
  const title = (props.title || "DateTime") + (props.invariant_value && props.value ? " (custom)" : "");
  function conditional_on_change(new_value) {
    if (!on_change)
      return;
    if (diff_value(props.value, new_value))
      on_change(new_value);
  }
  const el_ref = useRef(void 0);
  const ref_conditional_on_change = useRef(conditional_on_change);
  ref_conditional_on_change.current = conditional_on_change;
  useEffect(() => {
    return () => {
      if (!el_ref.current)
        return;
      const is_editing_this_specific_text = document.activeElement === el_ref.current;
      if (!is_editing_this_specific_text)
        return;
      const new_value = handle_on_blur({working_value: el_ref.current.value, invariant_value});
      ref_conditional_on_change.current(new_value);
    };
  }, []);
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
      if (!r)
        return;
      el_ref.current = r;
      if (!editing)
        return;
      const date = props_value(props);
      const new_working_value = date_to_string({date, time_resolution: "minute", trim_midnight: false});
      r.value = new_working_value;
      r.setSelectionRange(0, r.value.length);
    },
    onKeyDown: (e) => {
      const is_enter = e.key === "Enter";
      const is_escape = e.key === "Escape";
      if (is_enter || is_escape)
        e.target?.blur();
    },
    onChange: (e) => {
      const valid2 = is_value_valid(e.currentTarget.value);
      const el = find_parent_element_by_class(e.currentTarget, "editable_field");
      if (!el)
        return;
      if (valid2)
        el.classList.remove("invalid");
      else
        el.classList.add("invalid");
    },
    onBlur: (e) => {
      const working_value = e.currentTarget.value;
      const new_value = handle_on_blur({working_value, invariant_value});
      conditional_on_change(new_value);
      set_editing(false);
    },
    size: "small",
    variant: "outlined",
    fullWidth: true
  }), editing && show_now_shortcut_button && /* @__PURE__ */ h(NowButton, {
    on_change: conditional_on_change
  }), editing && show_today_shortcut_button && /* @__PURE__ */ h(Button, {
    value: "Today",
    onPointerDown: () => {
      const today_dt_str = get_today_str();
      conditional_on_change(new Date(today_dt_str));
    }
  }));
}
export const EditableCustomDateTime = connector(_EditableCustomDateTime);
function is_value_valid(str) {
  if (!str.trim())
    return true;
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
function diff_value(value1, value2) {
  const value1_ms = value1?.getTime();
  const value2_ms = value2?.getTime();
  return value1_ms !== value2_ms;
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
