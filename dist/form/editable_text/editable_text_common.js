import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "../Editable.css.proxy.js";
import {get_store} from "../../state/store.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {RichMarkDown} from "../../sharedf/RichMarkDown.js";
import {ACTIONS} from "../../state/actions.js";
import {ConditionalWComponentSearchWindow} from "../ConditionalWComponentSearchWindow.js";
import {pub_sub} from "../../state/pub_sub/pub_sub.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting,
  use_creation_context: state.creation_context.use_creation_context,
  creation_context: state.creation_context.creation_context
});
const map_dispatch = {
  set_editing_text_flag: ACTIONS.user_activity.set_editing_text_flag
};
const connector = connect(map_state, map_dispatch);
function _EditableTextCommon(props) {
  const [value, set_value] = useState(props.value);
  useEffect(() => set_value(props.value), [props.value]);
  const el_ref = useRef(void 0);
  const [id_insertion_point, set_id_insertion_point] = useState(void 0);
  const on_focus_set_selection = useRef(void 0);
  const [is_editing_this_specific_text, set_is_editing_this_specific_text] = useState(false);
  function set_is_editing(is_editing) {
    set_editing_text_flag(is_editing);
    set_is_editing_this_specific_text(is_editing);
  }
  const {
    placeholder,
    conditional_on_change: user_conditional_on_change,
    conditional_on_blur,
    always_on_blur,
    disabled,
    presenting,
    force_editable,
    select_all_on_focus,
    force_focus,
    set_editing_text_flag
  } = props;
  if (force_editable === false || !user_conditional_on_change && !conditional_on_blur && !always_on_blur || disabled || presenting && force_editable !== true) {
    const class_name2 = disabled ? "disabled" : "";
    const have_value = props.value !== void 0;
    return /* @__PURE__ */ h("div", {
      className: class_name2
    }, have_value && !props.hide_label && /* @__PURE__ */ h("span", {
      className: "description_label"
    }, props.placeholder, " "), /* @__PURE__ */ h(RichMarkDown, {
      text: value || placeholder
    }));
  }
  const conditional_on_change = (new_value) => {
    if (props.use_creation_context) {
      new_value = custom_creation_context_replace_text(props.creation_context, new_value);
    }
    if (new_value !== value)
      user_conditional_on_change && user_conditional_on_change(new_value);
    set_value(new_value);
  };
  useEffect(() => {
    return pub_sub.global_keys.sub("key_down", handle_general_key_down(is_editing_this_specific_text, el_ref.current, conditional_on_change));
  });
  const class_name = `editable_field ${value ? "" : "placeholder"}`;
  const on_render = (el) => {
    el_ref.current = el;
    handle_text_field_render({id_insertion_point, on_focus_set_selection, el, force_focus});
  };
  const on_focus = (e) => {
    handle_text_field_focus({e, set_is_editing, select_all_on_focus});
  };
  const wrapped_conditional_on_change = (e) => {
    if (id_insertion_point !== void 0)
      return;
    handle_text_field_change({e, set_id_insertion_point, conditional_on_change});
  };
  const wrapped_on_blur = (e) => {
    if (id_insertion_point !== void 0)
      return;
    handle_text_field_blur({e, initial_value: props.value, conditional_on_blur, always_on_blur, set_is_editing});
  };
  return /* @__PURE__ */ h("div", {
    className: class_name,
    style: props.style
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
  args.set_is_editing(true);
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
  const {set_is_editing, initial_value, conditional_on_blur, always_on_blur} = args;
  set_is_editing(false);
  if (initial_value !== value)
    conditional_on_blur && conditional_on_blur(value);
  always_on_blur && always_on_blur(value);
}
var ReplacingTextType;
(function(ReplacingTextType2) {
  ReplacingTextType2[ReplacingTextType2["url"] = 0] = "url";
  ReplacingTextType2[ReplacingTextType2["title"] = 1] = "title";
  ReplacingTextType2[ReplacingTextType2["nothing"] = 2] = "nothing";
})(ReplacingTextType || (ReplacingTextType = {}));
function handle_general_key_down(is_editing_this_specific_text, el, conditional_on_change) {
  return (k) => {
    if (!is_editing_this_specific_text)
      return;
    if (!el)
      return;
    if (!k.ctrl_key || k.key !== "k")
      return;
    const {value, selectionStart} = el;
    let {selectionEnd} = el;
    if (typeof selectionStart !== "number")
      return;
    if (typeof selectionEnd !== "number")
      selectionEnd = selectionStart;
    const selected_text = value.slice(selectionStart, selectionEnd);
    const replacing_text = selected_text ? selected_text.startsWith("http") ? 0 : 1 : 2;
    const title_text = replacing_text === 1 ? selected_text : "title";
    const url_text = replacing_text === 0 ? selected_text : "url";
    const new_value = value.slice(0, selectionStart) + "[" + title_text + "](" + url_text + ")" + value.slice(selectionEnd);
    conditional_on_change(new_value);
    let start = selectionStart + 1;
    let end = start + title_text.length;
    if (replacing_text === 1) {
      start = selectionEnd + 3;
      end = start + url_text.length;
    }
    setTimeout(() => el.setSelectionRange(start, end), 0);
  };
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
function custom_creation_context_replace_text(creation_context, new_value) {
  if (creation_context?.replace_text_target && creation_context?.replace_text_replacement) {
    new_value = new_value.replaceAll(creation_context.replace_text_target, creation_context.replace_text_replacement);
  }
  return new_value;
}
