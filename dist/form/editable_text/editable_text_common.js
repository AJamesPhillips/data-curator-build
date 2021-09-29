import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "../Editable.css.proxy.js";
import {get_store} from "../../state/store.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {RichMarkDown} from "../../sharedf/RichMarkDown.js";
import {ACTIONS} from "../../state/actions.js";
import {ConditionalWComponentSearchWindow} from "../ConditionalWComponentSearchWindow.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting
});
const map_dispatch = {
  set_editing_text_flag: ACTIONS.user_activity.set_editing_text_flag
};
const connector = connect(map_state, map_dispatch);
function _EditableTextCommon(props) {
  const [value, set_value] = useState(props.value);
  useEffect(() => set_value(props.value), [props.value]);
  const [id_insertion_point, set_id_insertion_point] = useState(void 0);
  const on_focus_set_selection = useRef(void 0);
  const {
    placeholder,
    conditional_on_change: user_conditional_on_change,
    conditional_on_blur,
    always_on_blur,
    disabled,
    presenting,
    always_allow_editing,
    select_all_on_focus,
    force_focus,
    set_editing_text_flag
  } = props;
  if (!user_conditional_on_change && !conditional_on_blur && !always_on_blur || disabled || presenting && !always_allow_editing) {
    const class_name2 = disabled ? "disabled" : "";
    return /* @__PURE__ */ h("div", {
      className: class_name2
    }, /* @__PURE__ */ h(RichMarkDown, {
      text: value || placeholder
    }));
  }
  const conditional_on_change = (new_value) => {
    if (new_value !== value)
      user_conditional_on_change && user_conditional_on_change(new_value);
    set_value(new_value);
  };
  const class_name = `editable_field ${value ? "" : "placeholder"}`;
  const on_render = (el) => {
    handle_text_field_render({id_insertion_point, on_focus_set_selection, el, force_focus});
  };
  const on_focus = (e) => {
    handle_text_field_focus({e, set_editing_text_flag, select_all_on_focus});
  };
  const wrapped_conditional_on_change = (e) => {
    if (id_insertion_point !== void 0)
      return;
    handle_text_field_change({e, set_id_insertion_point, conditional_on_change});
  };
  const wrapped_on_blur = (e) => {
    if (id_insertion_point !== void 0)
      return;
    handle_text_field_blur({e, initial_value: props.value, conditional_on_blur, always_on_blur, set_editing_text_flag});
  };
  return /* @__PURE__ */ h("div", {
    className: class_name
  }, props.component({
    value,
    on_render,
    on_focus,
    on_change: wrapped_conditional_on_change,
    on_blur: wrapped_on_blur
  }), id_insertion_point !== void 0 && /* @__PURE__ */ h("div", {
    style: {fontSize: "initial", fontWeight: "initial"}
  }, /* @__PURE__ */ h(ConditionalWComponentSearchWindow, {
    value,
    id_insertion_point,
    set_id_insertion_point,
    on_focus_set_selection,
    conditional_on_change
  })));
}
export const EditableTextCommon = connector(_EditableTextCommon);
function handle_text_field_render(args) {
  if (args.id_insertion_point !== void 0)
    return;
  const position = args.on_focus_set_selection.current;
  args.on_focus_set_selection.current = void 0;
  const should_gain_focus = position || args.force_focus;
  if (should_gain_focus) {
    setTimeout(() => {
      args.el.focus();
      if (position)
        args.el.setSelectionRange(position[0], position[1]);
    }, 0);
  }
}
function handle_text_field_focus(args) {
  args.set_editing_text_flag(true);
  if (args.select_all_on_focus) {
    const el = args.e.currentTarget;
    el.setSelectionRange(0, el.value.length);
  }
}
function handle_text_field_change(args) {
  const id_insertion_point = get_id_insertion_point(args.e.currentTarget);
  args.conditional_on_change(args.e.currentTarget.value);
  if (id_insertion_point !== void 0) {
    args.set_id_insertion_point(id_insertion_point);
  }
}
function handle_text_field_blur(args) {
  const {value} = args.e.currentTarget;
  const {set_editing_text_flag, initial_value, conditional_on_blur, always_on_blur} = args;
  set_editing_text_flag(false);
  if (initial_value !== value)
    conditional_on_blur && conditional_on_blur(value);
  always_on_blur && always_on_blur(value);
}
function get_id_insertion_point({selectionStart, value}) {
  if (typeof selectionStart === "number") {
    const char1 = value[selectionStart - 2];
    const char2 = value[selectionStart - 1];
    if (char1 === "@" && char2 === "@") {
      const store = get_store();
      if (store.getState().global_keys.last_key === "@") {
        return selectionStart;
      }
    }
  }
  return void 0;
}
