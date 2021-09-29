import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Box, ButtonGroup, IconButton, Slider} from "../../snowpack/pkg/@material-ui/core.js";
import NavigateBeforeIcon from "../../snowpack/pkg/@material-ui/icons/NavigateBefore.js";
import NavigateNextIcon from "../../snowpack/pkg/@material-ui/icons/NavigateNext.js";
import "./time_slider.css.proxy.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {find_nearest_index_in_sorted_list} from "../utils/binary_search.js";
import {NowButton} from "./NowButton.js";
import {floor_mseconds_to_resolution} from "../shared/utils/datetime.js";
import {date2str_auto} from "../shared/utils/date_helpers.js";
const map_state = (state, {get_handle_ms}) => ({
  handle_datetime_ms: get_handle_ms(state),
  time_resolution: state.display_options.time_resolution
});
const connector = connect(map_state);
function _TimeSlider(props) {
  const event_start_datetimes_ms = props.events.map((event) => {
    let ms = event.datetime.getTime();
    ms = floor_mseconds_to_resolution(ms, props.time_resolution);
    return ms;
  });
  const earliest_ms = event_start_datetimes_ms[0];
  const latest_ms = event_start_datetimes_ms[event_start_datetimes_ms.length - 1];
  const current_index = find_nearest_index_in_sorted_list(event_start_datetimes_ms, (i) => i, props.handle_datetime_ms);
  function changed_handle_position(new_handle_datetime_ms) {
    if (typeof new_handle_datetime_ms !== "number")
      return;
    props.change_handle_ms(new_handle_datetime_ms);
  }
  function move_to_event_datetime(direction) {
    return () => {
      let next_index = current_index.index + direction;
      if (!current_index.exact) {
        if (direction === 1)
          next_index = Math.ceil(current_index.index);
        else
          next_index = Math.floor(current_index.index);
      }
      let new_datetime_ms = event_start_datetimes_ms[next_index];
      while (new_datetime_ms === props.handle_datetime_ms) {
        next_index += direction;
        new_datetime_ms = event_start_datetimes_ms[next_index];
      }
      if (!new_datetime_ms)
        return;
      props.change_handle_ms(new_datetime_ms);
    };
  }
  return /* @__PURE__ */ h(Box, {
    className: "time_slider",
    my: 2,
    px: 5
  }, /* @__PURE__ */ h(Box, {
    className: "slider_container",
    display: "flex"
  }, /* @__PURE__ */ h(ButtonGroup, {
    size: "small"
  }, /* @__PURE__ */ h(IconButton, {
    onClick: move_to_event_datetime(-1),
    disabled: current_index.bounds === "n/a" || current_index.index <= 0,
    title: "Previous " + props.title + " datetime"
  }, /* @__PURE__ */ h(NavigateBeforeIcon, null)), /* @__PURE__ */ h(IconButton, {
    onClick: move_to_event_datetime(1),
    disabled: current_index.bounds === "n/a" || current_index.index >= event_start_datetimes_ms.length - 1,
    title: "Next " + props.title + " datetime"
  }, /* @__PURE__ */ h(NavigateNextIcon, null))), /* @__PURE__ */ h(Box, {
    flexGrow: 1,
    title: props.title + " datetimes"
  }, /* @__PURE__ */ h(Slider, {
    onChange: (e, value) => changed_handle_position(value),
    color: "secondary",
    value: props.handle_datetime_ms,
    getAriaValueText: value_text,
    valueLabelFormat: get_value_label_format,
    step: 1,
    min: earliest_ms,
    max: latest_ms,
    valueLabelDisplay: "auto",
    marks: event_start_datetimes_ms.map((r) => {
      return {value: r, label: ""};
    })
  }))), /* @__PURE__ */ h(Box, {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: props.title,
    value: new Date(props.handle_datetime_ms),
    on_change: (new_datetime) => new_datetime && props.change_handle_ms(new_datetime.getTime()),
    show_now_shortcut_button: false,
    show_today_shortcut_button: false,
    always_allow_editing: true
  }), /* @__PURE__ */ h(NowButton, {
    title: "Set " + props.title + " to now",
    change_datetime_ms: (datetime_ms) => props.change_handle_ms(datetime_ms)
  })));
}
export const TimeSlider = connector(_TimeSlider);
const value_text = (value) => `${value}`;
const get_value_label_format = (value) => {
  const date_str = date2str_auto({date: new Date(value), time_resolution: "minute"});
  return /* @__PURE__ */ h("span", {
    style: {whiteSpace: "nowrap"}
  }, date_str);
};
