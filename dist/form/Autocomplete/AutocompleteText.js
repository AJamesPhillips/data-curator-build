import {h} from "../../../snowpack/pkg/preact.js";
import FlexSearch from "../../../snowpack/pkg/flexsearch.js";
import fuzzysort from "../../../snowpack/pkg/fuzzysort.js";
import "./AutocompleteText.css.proxy.js";
import {sort_list} from "../../shared/utils/sort.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Options} from "./Options.js";
import {throttle} from "../../utils/throttle.js";
import {useEffect, useRef, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {TextField} from "../../../snowpack/pkg/@material-ui/core.js";
const map_state = (state) => ({
  presenting: state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _AutocompleteText(props) {
  const prepared_targets = useRef([]);
  const flexsearch_index = useRef(FlexSearch.Index());
  const internal_options = useRef([]);
  useEffect(() => {
    const limited_new_internal_options = prepare_options(props.options, 200, props.search_fields);
    const _prepared_targets = prepare_targets(limited_new_internal_options);
    prepared_targets.current = _prepared_targets;
    limited_new_internal_options.forEach((o) => {
      flexsearch_index.current = flexsearch_index.current.add(o.id_num, o.unlimited_total_text);
    });
    internal_options.current = limited_new_internal_options;
  }, [props.options, props.search_fields]);
  const actively_selected_option = useRef({actively_chosen: false, id: void 0});
  const selected_title = get_selected_option_title_str();
  const [temp_value_str, set_temp_value_str] = useState("");
  useEffect(() => {
    set_temp_value_str(props.initial_search_term || selected_title);
  }, [props.initial_search_term, selected_title]);
  const {throttled: handle_on_change, flush: flush_temp_value_str} = throttle(set_temp_value_str, 300);
  const [editing_options, set_editing_options] = useState(false);
  useEffect(() => {
    set_editing_options(!!props.start_expanded);
  }, [props.start_expanded]);
  const {threshold_minimum_score = false} = props;
  const [options_to_display, set_options_to_display] = useState([]);
  useEffect(() => {
    const result = get_options_to_display(temp_value_str, !!props.allow_none, internal_options.current, prepared_targets.current, flexsearch_index.current, props.search_type || "best", threshold_minimum_score);
    set_options_to_display(result.options);
    props.set_search_type_used && props.set_search_type_used(result.search_type_used);
    flush_temp_value_str();
  }, [temp_value_str, props.allow_none, internal_options.current, prepared_targets.current, flexsearch_index.current, props.search_type, threshold_minimum_score]);
  const [highlighted_option_index, set_highlighted_option_index] = useState(0);
  function get_selected_option_title_str() {
    const selected_option = get_selected_option(props, props.options);
    return selected_option ? selected_option.title : "";
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
    !props.retain_invalid_search_term_on_blur && set_temp_value_str(get_selected_option_title_str());
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
  }, /* @__PURE__ */ h(TextField, {
    disabled: props.allow_editing_when_presenting ? false : props.presenting,
    ref: (el) => {
      if (!el)
        return;
      const input_el = el.getElementsByTagName("input")[0];
      if (!input_el)
        return;
      if (!editing_options)
        setTimeout(() => input_el.blur(), 0);
      else
        setTimeout(() => input_el.focus(), 0);
    },
    placeholder,
    value: temp_value_str || (editing_options ? "" : "-"),
    onFocus: (e) => {
      setTimeout(() => set_editing_options(true), 0);
      e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
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
function prepare_options(options, limit, search_fields = "all") {
  let id_num = 1;
  const all = search_fields === "all";
  const new_internal_options = options.filter(({is_hidden}) => !is_hidden).map((o) => {
    const limited_total_text = get_total_text(o, limit, all);
    const unlimited_total_text = get_total_text(o, 0, all);
    return {...o, limited_total_text, unlimited_total_text, id_num: id_num++};
  });
  return new_internal_options;
}
function get_total_text(o, limit, all) {
  let total_text = limit_string_length(o.title, limit);
  if (all)
    total_text += o.subtitle ? " " + limit_string_length(o.subtitle, limit) : "";
  else
    total_text += o.raw_title ? " " + limit_string_length(o.raw_title, limit) : "";
  return total_text;
}
function limit_string_length(str, limit) {
  if (!limit)
    return str;
  return str.slice(0, limit) + (str.length > limit ? "..." : "");
}
function prepare_targets(new_internal_options) {
  return new_internal_options.map(({limited_total_text: total_text}) => fuzzysort.prepare(total_text));
}
const OPTION_NONE = {
  id: void 0,
  id_num: 0,
  title: "-",
  limited_total_text: "",
  unlimited_total_text: ""
};
function get_options_to_display(temp_value_str, allow_none, options, prepared_targets, flexsearch_index, search_type, threshold_minimum_score) {
  let search_type_used = void 0;
  if (!temp_value_str) {
    if (allow_none)
      return {options: [OPTION_NONE, ...options], search_type_used};
    else
      return {options, search_type_used};
  }
  let option_to_exact_score = (option) => 0;
  let option_to_score = (option) => 0;
  let exact_results = 0;
  if (search_type === "best" || search_type === "exact") {
    search_type_used = "exact";
    const results = flexsearch_index.search(temp_value_str);
    exact_results = results.length;
    const id_num_to_score = {};
    results.forEach((id, index) => id_num_to_score[id] = 1e4 - index);
    option_to_exact_score = (o) => id_num_to_score[o.id_num] || -1e4;
  }
  if (exact_results < 10 && (search_type === "best" || search_type === "fuzzy")) {
    search_type_used = "fuzzy";
    const search_options = {
      limit: 100,
      allowTypo: true,
      threshold: -1e4
    };
    const results = fuzzysort.go(temp_value_str, prepared_targets, search_options);
    const map_target_to_score = {};
    results.forEach(({target, score}) => map_target_to_score[target] = score);
    option_to_score = (o) => {
      const score = map_target_to_score[o.limited_total_text];
      return score === void 0 ? option_to_exact_score(o) : score;
    };
  } else
    option_to_score = option_to_exact_score;
  const filterd_options = threshold_minimum_score === false ? options : options.filter((o) => option_to_score(o) > threshold_minimum_score);
  const options_to_display = sort_list(filterd_options, option_to_score, "descending");
  return {options: options_to_display, search_type_used};
}
