import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import ArrowDownwardIcon from "../../snowpack/pkg/@material-ui/icons/ArrowDownward.js";
import ArrowUpwardIcon from "../../snowpack/pkg/@material-ui/icons/ArrowUpward.js";
import "./KnowledgeGraphTimeMarkers.css.proxy.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
import {SCALE_BY} from "../canvas/zoom_utils.js";
import {bounded} from "../shared/utils/bounded.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {date2str} from "../shared/utils/date_helpers.js";
import {time_scale_days_to_ms_pixels_fudge_factor} from "../shared/constants.js";
const map_state = (state) => {
  const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  const composed_datetime_line_config = current_composed_knowledge_view?.composed_datetime_line_config;
  return {
    display_time_marks: state.display_options.display_time_marks,
    time_origin_ms: composed_datetime_line_config?.time_origin_ms,
    time_origin_x: composed_datetime_line_config?.time_origin_x,
    time_scale: composed_datetime_line_config?.time_scale,
    time_line_number: composed_datetime_line_config?.time_line_number,
    time_line_spacing_days: composed_datetime_line_config?.time_line_spacing_days,
    x: state.routing.args.x,
    zoom: state.routing.args.zoom,
    sim_ms: state.routing.args.sim_ms
  };
};
const connector = connect(map_state);
function _KnowledgeGraphTimeMarkers(props) {
  const {
    sim_ms,
    time_origin_ms,
    time_origin_x,
    time_scale,
    time_line_number,
    time_line_spacing_days
  } = props;
  if (!props.display_time_marks || time_origin_ms === void 0 || time_origin_x === void 0 || time_scale === void 0)
    return null;
  const other_datetime_lines = useMemo(() => get_other_datetime_lines({
    time_line_number,
    time_line_spacing_days
  }), [time_line_number, time_line_spacing_days]);
  const {x, zoom} = props;
  const xd = zoom / SCALE_BY;
  const xm = (x - time_origin_x) * xd;
  const time_scale_ms_to_pixels_fudge = time_scale / time_scale_days_to_ms_pixels_fudge_factor * xd;
  return /* @__PURE__ */ h("div", {
    className: "datetime_lines_container"
  }, other_datetime_lines.map((config) => {
    return /* @__PURE__ */ h(DatetimeLine, {
      key: config.key,
      date_ms: sim_ms + config.offset,
      time_origin_ms,
      time_scale_ms_to_pixels_fudge,
      xm,
      xd,
      color: "black",
      opacity: config.opacity
    });
  }), /* @__PURE__ */ h(DatetimeLine, {
    date_ms: new Date().getTime(),
    time_origin_ms,
    time_scale_ms_to_pixels_fudge,
    xm,
    xd,
    color: "red",
    left_label_when_off_screen: true
  }), /* @__PURE__ */ h(DatetimeLine, {
    date_ms: sim_ms,
    time_origin_ms,
    time_scale_ms_to_pixels_fudge,
    xm,
    xd,
    color: "blue",
    left_label_when_off_screen: true
  }));
}
export const KnowledgeGraphTimeMarkers = connector(_KnowledgeGraphTimeMarkers);
const date_format = "yyyy-MM-dd";
function DatetimeLine(props) {
  const {color, opacity} = props;
  let screen_left = (props.date_ms - props.time_origin_ms) * props.time_scale_ms_to_pixels_fudge - props.xm;
  const max_screen_left = document.body.clientWidth - 20;
  const off_left = screen_left < 0;
  const off_right = screen_left > max_screen_left;
  const on_screen = !off_left && !off_right;
  if (!on_screen && !props.left_label_when_off_screen)
    return null;
  screen_left = bounded(screen_left, 0, max_screen_left);
  return /* @__PURE__ */ h("div", {
    className: "datetime_container",
    style: {color, borderColor: color, left: screen_left, opacity}
  }, /* @__PURE__ */ h("div", {
    className: "rotater"
  }, off_left && /* @__PURE__ */ h(ArrowUpwardIcon, {
    fontSize: "small"
  }), off_right && /* @__PURE__ */ h(ArrowDownwardIcon, {
    fontSize: "small"
  }), /* @__PURE__ */ h("div", {
    className: "date_label"
  }, date2str(new Date(props.date_ms), date_format))), on_screen && /* @__PURE__ */ h("div", {
    className: "datetime_line"
  }));
}
const milliseconds_in_day = 1e3 * 3600 * 24;
function get_other_datetime_lines(args) {
  const other_datetime_lines = [];
  const {time_line_number, time_line_spacing_days} = args;
  if (time_line_number === void 0 || time_line_spacing_days === void 0)
    return [];
  const time_line_spacing_ms = time_line_spacing_days * milliseconds_in_day;
  for (let i = time_line_number; i > 0; --i) {
    const opacity = i / time_line_number;
    const j = time_line_number - i + 1;
    other_datetime_lines.push({
      offset: time_line_spacing_ms * j,
      opacity,
      key: `plus${i}`
    });
    other_datetime_lines.push({
      offset: -time_line_spacing_ms * j,
      opacity,
      key: `minus${i}`
    });
  }
  return other_datetime_lines;
}
