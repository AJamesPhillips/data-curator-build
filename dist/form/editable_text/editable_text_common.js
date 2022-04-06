import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useMemo, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "../Editable.css.proxy.js";
import {get_store} from "../../state/store.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {RichMarkDown} from "../../sharedf/RichMarkDown.js";
import {ConditionalWComponentSearchWindow} from "./ConditionalWComponentSearchWindow.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting,
  use_creation_context: state.creation_context.use_creation_context,
  creation_context: state.creation_context.creation_context
});
const connector = connect(map_state);
function _EditableTextCommon(props) {
  const {
    placeholder,
    disabled,
    presenting,
    force_editable,
    select_all_on_focus,
    force_focus_on_first_render
  } = props;
  const [value, set_value] = useState(props.value);
  useEffect(() => set_value(props.value), [props.value]);
  const el_ref = useRef(void 0);
  const id_insertion_point = useRef(void 0);
  if (force_editable === false || !props.conditional_on_change && !props.conditional_on_blur && !props.always_on_blur || disabled || presenting && force_editable !== true) {
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
      props.conditional_on_change && props.conditional_on_change(new_value);
    set_value(new_value);
  }, [props.creation_context, props.conditional_on_change]);
  const class_name = `editable_field ${value ? "" : "placeholder"}`;
  const on_render = useMemo(() => (el) => {
    if (!el)
      return;
    const rendering_first_time = !el_ref.current;
    el_ref.current = el;
    if (rendering_first_time)
      handle_text_field_render({el, force_focus_on_first_render});
  }, []);
  const on_focus = useMemo(() => (e) => {
    handle_text_field_focus({e, select_all_on_focus});
  }, [select_all_on_focus]);
  const wrapped_conditional_on_change = useMemo(() => (e) => {
    if (id_insertion_point.current !== void 0)
      return;
    handle_text_field_change({e, id_insertion_point, conditional_on_change});
  }, [conditional_on_change]);
  const wrapped_on_blur = useMemo(() => (e) => {
    if (id_insertion_point.current !== void 0)
      return;
    const {value: value2} = e.currentTarget;
    handle_text_field_blur({
      value: value2,
      initial_value: props.value,
      conditional_on_blur: props.conditional_on_blur,
      always_on_blur: props.always_on_blur
    });
  }, [props.value, props.conditional_on_blur, props.always_on_blur]);
  const on_key_down = useMemo(() => (e) => {
    handle_general_key_down(e, el_ref.current, conditional_on_change);
  }, [conditional_on_change]);
  useEffect(() => {
    return () => {
      if (!el_ref.current)
        return;
      const is_editing_this_specific_text = document.activeElement === el_ref.current;
      if (!is_editing_this_specific_text)
        return;
      const {value: value2} = el_ref.current;
      handle_text_field_blur({
        value: value2,
        initial_value: props.value,
        conditional_on_blur: props.conditional_on_blur,
        always_on_blur: props.always_on_blur
      });
    };
  }, [props.value, props.conditional_on_blur, props.always_on_blur]);
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
      on_blur: wrapped_on_blur,
      on_key_down
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
  const {value, initial_value, conditional_on_blur, always_on_blur} = args;
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
function handle_general_key_down(e, el, conditional_on_change) {
  const is_editing_this_specific_text = document.activeElement === el;
  if (!is_editing_this_specific_text)
    return;
  if (!el)
    return;
  handle_ctrl_k_link_insert(e, el, conditional_on_change);
  handle_stop_propagation(e);
}
function handle_ctrl_k_link_insert(e, el, conditional_on_change) {
  if (!e.ctrlKey)
    return;
  if (e.key !== "k")
    return;
  e.preventDefault();
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
}
function handle_stop_propagation(e) {
  if (e.ctrlKey && e.key === "e")
    return;
  if (e.key === "Shift")
    return;
  if (e.key === "Control")
    return;
  e.stopImmediatePropagation();
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
