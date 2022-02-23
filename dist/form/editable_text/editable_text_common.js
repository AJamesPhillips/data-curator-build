import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useMemo, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "../Editable.css.proxy.js";
import {get_store} from "../../state/store.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {RichMarkDown} from "../../sharedf/RichMarkDown.js";
import {ACTIONS} from "../../state/actions.js";
import {ConditionalWComponentSearchWindow} from "./ConditionalWComponentSearchWindow.js";
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
  const {
    placeholder,
    conditional_on_change: user_conditional_on_change,
    conditional_on_blur,
    always_on_blur,
    disabled,
    presenting,
    force_editable,
    select_all_on_focus,
    force_focus_on_first_render,
    set_editing_text_flag
  } = props;
  const [value, set_value] = useState(props.value);
  useEffect(() => set_value(props.value), [props.value]);
  const el_ref = useRef(void 0);
  const id_insertion_point = useRef(void 0);
  const [is_editing_this_specific_text, set_is_editing_this_specific_text] = useState(false);
  const set_is_editing = useMemo(() => (is_editing) => {
    set_editing_text_flag(is_editing);
    set_is_editing_this_specific_text(is_editing);
  }, [set_editing_text_flag, set_is_editing_this_specific_text]);
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
  const conditional_on_change = useMemo(() => (new_value) => {
    if (props.use_creation_context) {
      new_value = custom_creation_context_replace_text(props.creation_context, new_value);
    }
    if (new_value !== value)
      user_conditional_on_change && user_conditional_on_change(new_value);
    set_value(new_value);
  }, [props.creation_context, user_conditional_on_change]);
  useEffect(() => {
    return pub_sub.global_keys.sub("key_down", handle_general_key_down(is_editing_this_specific_text, el_ref.current, conditional_on_change));
  });
  const class_name = `editable_field ${value ? "" : "placeholder"}`;
  const on_render = useMemo(() => (el) => {
    if (el_ref.current === el)
      return;
    el_ref.current = el;
    handle_text_field_render({el, force_focus_on_first_render});
  }, []);
  const on_focus = useMemo(() => (e) => {
    handle_text_field_focus({e, set_is_editing, select_all_on_focus});
  }, [set_is_editing, select_all_on_focus]);
  const wrapped_conditional_on_change = useMemo(() => (e) => {
    if (id_insertion_point.current !== void 0)
      return;
    handle_text_field_change({e, id_insertion_point, conditional_on_change});
  }, [conditional_on_change]);
  const wrapped_on_blur = useMemo(() => (e) => {
    if (id_insertion_point.current !== void 0)
      return;
    handle_text_field_blur({e, initial_value: props.value, conditional_on_blur, always_on_blur, set_is_editing});
  }, [props.value, conditional_on_blur, always_on_blur, set_is_editing]);
  const [_, force_refreshing_render] = useState({});
  const refocus_after_search_window = useMemo(() => (on_focus_set_selection) => {
    el_ref.current?.focus();
    id_insertion_point.current = void 0;
    force_refreshing_render({});
    el_ref.current?.setSelectionRange(on_focus_set_selection.start, on_focus_set_selection.end);
  }, []);
  const input_component = useMemo(() => {
    return props.component({
      value,
      on_render,
      on_focus,
      on_change: wrapped_conditional_on_change,
      on_blur: wrapped_on_blur
    });
  }, [value, on_render, on_focus, wrapped_conditional_on_change, wrapped_on_blur]);
  return /* @__PURE__ */ h("div", {
    className: class_name,
    style: props.style
  }, input_component, id_insertion_point.current !== void 0 && /* @__PURE__ */ h("div", {
    style: {fontSize: "initial", fontWeight: "initial"}
  }, /* @__PURE__ */ h(ConditionalWComponentSearchWindow, {
    value,
    id_insertion_point: id_insertion_point.current,
    conditional_on_change: ({new_value, on_focus_set_selection}) => {
      conditional_on_change(new_value);
      setTimeout(() => refocus_after_search_window(on_focus_set_selection), 0);
    },
    on_close: (on_focus_set_selection) => {
      refocus_after_search_window(on_focus_set_selection);
    }
  })));
}
export const EditableTextCommon = connector(_EditableTextCommon);
function handle_text_field_render(args) {
  if (args.force_focus_on_first_render) {
    setTimeout(() => args.el.focus(), 0);
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
  const new_id_insertion_point = get_id_insertion_point(args.e.currentTarget);
  if (new_id_insertion_point !== void 0)
    args.id_insertion_point.current = new_id_insertion_point;
  args.conditional_on_change(args.e.currentTarget.value);
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
