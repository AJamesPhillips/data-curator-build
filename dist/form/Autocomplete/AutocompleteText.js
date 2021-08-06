import {h} from "../../../snowpack/pkg/preact.js";
import fuzzysort from "../../../snowpack/pkg/fuzzysort.js";
import "./AutocompleteText.css.proxy.js";
import {sort_list} from "../../shared/utils/sort.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Options} from "./Options.js";
import {throttle} from "../../utils/throttle.js";
import {useEffect, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _AutocompleteText(props) {
  const prepared_targets = useRef([]);
  const options = useRef([]);
  useEffect(() => {
    const results = prepare_options_and_targets(props.options);
    prepared_targets.current = results.prepared_targets;
    options.current = results.new_internal_options;
  });
  const actively_selected_option = useRef({actively_chosen: false, id: void 0});
  const selected_title = get_selected_option_title_str();
  const [temp_value_str, set_temp_value_str] = useState("");
  useEffect(() => {
    set_temp_value_str(props.initial_search_term || selected_title || "");
  }, [props.initial_search_term, selected_title]);
  const {throttled: handle_on_change, flush: flush_temp_value_str} = throttle(set_temp_value_str, 300);
  const [editing_options, set_editing_options] = useState(false);
  useEffect(() => {
    set_editing_options(!!props.start_expanded);
  }, [props.start_expanded]);
  const [options_to_display, set_options_to_display] = useState([]);
  useEffect(() => {
    const options_to_display2 = get_options_to_display(temp_value_str, !!props.allow_none, options.current, prepared_targets.current);
    set_options_to_display(options_to_display2);
    flush_temp_value_str();
  }, [temp_value_str]);
  const [highlighted_option_index, set_highlighted_option_index] = useState(0);
  function get_selected_option_title_str() {
    const selected_option = get_selected_option(props, props.options);
    return selected_option ? selected_option.title : "-";
  }
  const handle_key_down = async (e, displayed_options) => {
    const key = e.key;
    const is_arrow_down = key === "ArrowDown";
    const is_arrow_up = key === "ArrowUp";
    const is_enter = key === "Enter";
    const is_escape = key === "Escape";
    if (is_enter || is_escape) {
      if (is_enter && highlighted_option_index !== void 0) {
        const selected_option = displayed_options[highlighted_option_index];
        if (selected_option)
          conditional_on_change(selected_option.id);
      } else if (is_escape) {
        conditional_on_change(props.selected_option_id);
      }
    } else if (is_arrow_down || is_arrow_up) {
      let new_highlighted_option_index = highlighted_option_index + (is_arrow_down ? 1 : -1);
      new_highlighted_option_index = new_highlighted_option_index % displayed_options.length;
      set_highlighted_option_index(new_highlighted_option_index);
    }
  };
  const set_to_not_editing = () => {
    set_editing_options(false);
    set_temp_value_str(get_selected_option_title_str());
    set_highlighted_option_index(0);
  };
  const conditional_on_change = (id) => {
    set_to_not_editing();
    actively_selected_option.current = {actively_chosen: true, id};
  };
  const handle_on_blur = () => {
    set_to_not_editing();
    const {actively_chosen, id} = actively_selected_option.current;
    if (!actively_chosen)
      return;
    actively_selected_option.current = {actively_chosen: false, id: void 0};
    const original_id = props.selected_option_id;
    if (original_id === id) {
      props.on_choose_same && props.on_choose_same(id);
    } else {
      props.on_change(id);
    }
  };
  const final_value = get_valid_value(options_to_display, temp_value_str);
  const valid = !final_value || temp_value_str.toLowerCase() === final_value.title.toLowerCase();
  const {
    placeholder,
    on_mouse_over_option = () => {
    },
    on_mouse_leave_option = () => {
    }
  } = props;
  return /* @__PURE__ */ h("div", {
    class: "editable_field autocomplete " + (valid ? "" : "invalid "),
    style: props.extra_styles
  }, /* @__PURE__ */ h("input", {
    disabled: props.always_allow_editing ? false : props.presenting,
    ref: (r) => {
      if (!r)
        return;
      else if (!editing_options)
        setTimeout(() => r.blur(), 0);
      else
        setTimeout(() => r.focus(), 0);
    },
    type: "text",
    placeholder,
    value: temp_value_str,
    onFocus: (e) => {
      setTimeout(() => set_editing_options(true), 0);
      const none_value_selected = !final_value || final_value.id === void 0;
      if (none_value_selected && e.currentTarget.value === "-") {
        set_temp_value_str("");
      } else {
        e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
      }
    },
    onChange: (e) => handle_on_change(e.currentTarget.value),
    onKeyDown: (e) => handle_key_down(e, options_to_display),
    onBlur: () => handle_on_blur()
  }), /* @__PURE__ */ h(Options, {
    editing_options,
    options_to_display,
    is_option_wrapper_highlighted: (_, index) => index === highlighted_option_index,
    conditional_on_change,
    set_highlighted_option_index,
    on_mouse_over_option,
    on_mouse_leave_option
  }));
}
const ConnectedAutocompleteText = connector(_AutocompleteText);
export function AutocompleteText(props) {
  return /* @__PURE__ */ h(ConnectedAutocompleteText, {
    ...props
  });
}
function get_selected_option(props, options) {
  if (props.selected_option_id === void 0) {
    return props.allow_none ? void 0 : options[0];
  }
  return options.find(({id}) => id === props.selected_option_id);
}
function get_valid_value(options, value_str) {
  const lower_value_str = value_str.toLowerCase();
  const match = options.find((option) => option.title.toLowerCase() === lower_value_str);
  if (match)
    return match;
  return options[0];
}
function prepare_options_and_targets(options) {
  const new_internal_options = options.filter(({is_hidden}) => !is_hidden).map((o) => ({
    ...o,
    total_text: o.title + (o.subtitle ? " " + o.subtitle : "")
  }));
  const prepared_targets = new_internal_options.map(({total_text}) => {
    return fuzzysort.prepare(total_text);
  });
  return {new_internal_options, prepared_targets};
}
function get_options_to_display(temp_value_str, allow_none, options, prepared_targets) {
  const option_none = {id: void 0, title: "-", total_text: ""};
  if (!temp_value_str) {
    if (allow_none)
      return [option_none, ...options];
    else
      return options;
  }
  const search_options = {
    limit: 100,
    allowTypo: true,
    threshold: -1e4
  };
  const results = fuzzysort.go(temp_value_str, prepared_targets, search_options);
  const map_target_to_score = {};
  results.forEach(({target, score}) => map_target_to_score[target] = score);
  const options_to_display = sort_list(options, (o) => {
    const score = map_target_to_score[o.total_text];
    return score === void 0 ? -1e4 : score;
  }, "descending");
  return options_to_display;
}
