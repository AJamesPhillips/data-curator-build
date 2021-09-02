import {h} from "../../snowpack/pkg/preact.js";
import "./KnowledgeTimeView.css.proxy.js";
import {WComponentCanvasNode} from "../knowledge/canvas_node/WComponentCanvasNode.js";
import {MainArea} from "../layout/MainArea.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {sort_list} from "../shared/utils/sort.js";
import {wcomponent_has_VAP_sets} from "../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {get_created_at_ms, get_sim_datetime_ms} from "../shared/wcomponent/utils_datetime.js";
import {Box} from "../../snowpack/pkg/@material-ui/core.js";
import {ConnectedValueAndPredictionSetSummary} from "../knowledge/multiple_values/ConnectedValueAndPredictionSetSummary.js";
const map_state = (state) => {
  const {ready_for_reading: ready} = state.sync;
  const {current_composed_knowledge_view} = state.derived;
  if (ready && !current_composed_knowledge_view)
    console.log(`No current_composed_knowledge_view`);
  const {selected_wcomponent_ids_map} = state.meta_wcomponents;
  const cdate = new Date(state.routing.args.created_at_ms);
  const sdate = new Date(state.routing.args.sim_ms);
  const minute_time_resolution = "minute";
  const default_time_resolution = "day";
  let wcomponent_nodes = [];
  if (current_composed_knowledge_view) {
    wcomponent_nodes = current_composed_knowledge_view.wcomponent_nodes;
  }
  return {
    ready,
    wcomponent_nodes,
    wcomponent_connections: current_composed_knowledge_view && current_composed_knowledge_view.wcomponent_connections,
    presenting: state.display_options.consumption_formatting,
    selected_wcomponent_ids_map,
    cdate,
    sdate,
    time_resolution: default_time_resolution
  };
};
const connector = connect(map_state);
class DateRange {
  constructor(dates, props) {
    this.scale = "months";
    this.single_time_units = this._ms(1, false);
    this.scales = Object.keys(this.single_time_units);
    this.dates = [];
    this.cdate = new Date();
    this.sdate = new Date();
    this.time_resolution = "hour";
    this.timeline_spacing = true;
    if (dates.length === 0)
      return;
    this.time_resolution = props.time_resolution;
    this.scale = this.time_resolution + "s";
    this.cdate = props.cdate;
    this.sdate = props.sdate;
    this.dates = dates.sort((a, b) => a.getTime() - b.getTime());
  }
  _ms(ms, convert = true) {
    const operator = convert ? "/" : "*";
    return {
      milliseconds: ms,
      get seconds() {
        return eval(`${ms} ${operator} 1000`);
      },
      get minutes() {
        return eval(`${this.seconds} ${operator} 60`);
      },
      get hours() {
        return eval(`${this.minutes} ${operator} 60`);
      },
      get days() {
        return eval(`${this.hours} ${operator} 24`);
      },
      get months() {
        return eval(`${this.days} ${operator} 365 / 12`);
      },
      get years() {
        return eval(`${this.days} ${operator} 365`);
      }
    };
  }
  get scale_index() {
    return this.scales.indexOf(this.scale);
  }
  increment(date, count = 1, scale = this.scale) {
    let new_date = new Date(date.getTime());
    let fn = this.get_date_prop_func_names(scale);
    Object(new_date)[fn.set](Object(new_date)[fn.get]() + count);
    return new_date;
  }
  get range_dates() {
    const dates = [];
    const end_date = this.round_date(this.increment(this.end_date, 1), true, this.scale);
    let current_date = this.round_date(this.increment(this.start_date, -1), false, this.scale);
    dates.push(current_date);
    dates.push(end_date);
    return dates;
  }
  get start_date() {
    const d = this.dates.slice(0)[0];
    return typeof d === typeof new Date() ? d : new Date();
  }
  get end_date() {
    const d = this.dates.slice(-1)[0];
    return typeof d === typeof new Date() ? d : new Date();
  }
  get range_start_date() {
    const d = this.range_dates.slice(0)[0];
    return typeof d === typeof new Date() ? d : new Date();
  }
  get range_end_date() {
    const d = this.range_dates.slice(-1)[0];
    return typeof d === typeof new Date() ? d : new Date();
  }
  get_date_offset_percent(date) {
    let percent = 0;
    const date_ms = date.getTime();
    const start_ms = this.range_start_date.getTime();
    const end_ms = this.range_end_date.getTime();
    percent = (date_ms - start_ms) / (end_ms - start_ms) * 100;
    return percent;
  }
  get_date_prop_func_names(date_unit) {
    let getter, setter = null;
    const prop_name = date_unit.charAt(0).toUpperCase() + date_unit.slice(1);
    const date = new Date();
    const default_getter_name = `get${prop_name}`;
    switch (date_unit) {
      case "days":
        getter = "getDate";
        break;
      default:
        if (Object(date)[default_getter_name]) {
          getter = default_getter_name;
        } else if (Object(date)[default_getter_name.replace(/s$/, "")]) {
          getter = default_getter_name.replace(/s$/, "");
        }
    }
    if (getter) {
      setter = getter.replace(/^get/, "set");
    }
    return {
      get: getter,
      set: setter
    };
  }
  round_date(date, round_up = false, scale = this.scale) {
    let rounded_date = new Date(date.getTime());
    this.scales.forEach((scale2, i) => {
      const date_prop_fns = this.get_date_prop_func_names(scale2);
      const adjusted_value = scale2 === "days" ? 1 : 0;
      if (round_up) {
        if (i === this.scale_index) {
          Object(rounded_date)[date_prop_fns.set](Object(rounded_date)[date_prop_fns.get]() + 1);
        } else if (i < this.scale_index) {
          Object(rounded_date)[date_prop_fns.set](adjusted_value);
        }
      } else {
        if (i < this.scale_index) {
          if (date_prop_fns.set && Object(rounded_date)[date_prop_fns.set]) {
            Object(rounded_date)[date_prop_fns.set](adjusted_value);
          }
        }
      }
    });
    if (round_up) {
      rounded_date.setTime(rounded_date.getTime() - 1);
    }
    return rounded_date;
  }
  render(wcomponent_nodes) {
    if (wcomponent_nodes.length === 0)
      return;
    let current_date = new Date(this.range_start_date.getTime());
    let all_range_dates = [];
    all_range_dates.push(new Date(current_date.getTime()));
    while (current_date.getTime() <= this.range_end_date.getTime()) {
      let fns = this.get_date_prop_func_names(this.scale);
      let current_value = Object(current_date)[fns.get]();
      Object(current_date)[fns.set](current_value + 1);
      all_range_dates.push(new Date(current_date.getTime()));
    }
    let max_width = this.timeline_spacing ? `${100 + all_range_dates.length * 1.42}%` : "100%";
    return /* @__PURE__ */ h(Box, {
      id: "knowledge_time_view",
      className: `time_view scroll_area_x ${this.scale} ${this.timeline_spacing ? "timeline_spacing" : "event_spacing"}`,
      flexGrow: 1,
      flexShrink: 1,
      position: "relative",
      onScroll: (e) => {
        let scrolled_element = e.target;
        let scrolled_offset = scrolled_element.scrollLeft;
        let nodes = document.getElementsByClassName("wc");
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node) {
            node.style.marginLeft = `${scrolled_offset}px`;
          }
        }
      }
    }, /* @__PURE__ */ h(Box, {
      className: `timeline`,
      display: this.timeline_spacing ? "block" : "none",
      height: 1,
      maxHeight: 1,
      position: "absolute",
      minWidth: max_width,
      width: max_width,
      maxWidth: max_width,
      top: 0,
      right: "auto",
      bottom: 0,
      left: 0,
      zIndex: 1
    }, /* @__PURE__ */ h(Box, {
      width: 1,
      maxWidth: 1,
      height: 1,
      maxHeight: 1,
      display: "flex",
      flexDirection: "row",
      flexWrap: true
    }, all_range_dates.map((d, i) => {
      return /* @__PURE__ */ h(Box, {
        className: "unit",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
        position: "relative",
        overflow: "visible"
      }, /* @__PURE__ */ h(Box, {
        position: "absolute",
        className: "tick",
        width: 0,
        height: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }, /* @__PURE__ */ h(Box, {
        className: "rotater",
        whiteSpace: "nowrap"
      }, /* @__PURE__ */ h(Box, {
        component: "small",
        className: "days weeks months years"
      }, d.toLocaleDateString()), /* @__PURE__ */ h(Box, {
        component: "small",
        className: "hours"
      }, d.toLocaleTimeString()))));
    }))), /* @__PURE__ */ h(Box, {
      minWidth: max_width,
      width: max_width,
      maxWidth: max_width,
      minHeight: 1,
      height: 1,
      maxHeight: 1,
      overflow: "hidden"
    }, /* @__PURE__ */ h(Box, {
      className: "scroll_area_y",
      minWidth: "100%",
      maxWidth: "100%",
      position: "relative",
      zIndex: 10,
      height: 1,
      maxHeight: 1
    }, /* @__PURE__ */ h(Box, {
      className: "contents",
      mt: this.timeline_spacing ? 50 : 0
    }, wcomponent_nodes.map((wc) => {
      const VAP_sets = wcomponent_has_VAP_sets(wc) ? wc.values_and_prediction_sets : [];
      return /* @__PURE__ */ h(Box, {
        width: 1,
        maxWidth: 1,
        overflow: "hidden",
        position: "relative"
      }, /* @__PURE__ */ h(Box, {
        id: `WC-${wc.id}`,
        className: "wc",
        display: "inline-block",
        position: "relative",
        top: 0
      }, /* @__PURE__ */ h(WComponentCanvasNode, {
        id: wc.id,
        on_graph: false
      })), /* @__PURE__ */ h(Box, {
        className: "vaps",
        width: 1,
        maxWidth: 1,
        overflow: "hidden",
        minHeight: "7em",
        height: "7em",
        maxHeight: "7em",
        p: this.timeline_spacing ? 0 : 3,
        position: "relative",
        display: `${this.timeline_spacing ? "block" : "flex"}`,
        flexDirection: "row",
        justifyContent: "start"
      }, VAP_sets.map((VAP) => {
        const sim_datetime_ms = get_sim_datetime_ms(VAP);
        if (sim_datetime_ms) {
          const sim_datetime = new Date(sim_datetime_ms);
          const vap_percent = this.get_date_offset_percent(sim_datetime);
          return /* @__PURE__ */ h(Box, {
            className: "vap",
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: "auto",
            display: "inline-block",
            border: 1,
            minHeight: "100%",
            height: "100%",
            maxHeight: "100%",
            position: `${this.timeline_spacing ? "absolute" : "static"}`,
            zIndex: 1,
            left: `${vap_percent}%`
          }, /* @__PURE__ */ h(ConnectedValueAndPredictionSetSummary, {
            wcomponent: wc,
            VAP_set: VAP
          }));
        } else {
          return;
        }
      })));
    })))));
  }
}
function _KnowledgeTimeView(props) {
  let {wcomponent_nodes} = props;
  const {selected_wcomponent_ids_map} = props;
  const dates = [];
  const get_key = (wc) => {
    const entry = selected_wcomponent_ids_map[wc.id];
    if (entry !== void 0)
      return entry;
    else
      return get_created_at_ms(wc);
  };
  wcomponent_nodes = sort_list(wcomponent_nodes, get_key, "ascending");
  wcomponent_nodes.forEach((wc) => {
    const VAP_sets = wcomponent_has_VAP_sets(wc) ? wc.values_and_prediction_sets : [];
    dates.push(wc.created_at);
    VAP_sets.forEach((VAP) => {
      dates.push(VAP.created_at);
    });
  });
  let date_range = new DateRange(dates, props);
  let content = date_range.render(wcomponent_nodes);
  return /* @__PURE__ */ h(MainArea, {
    main_content: content ? content : /* @__PURE__ */ h(Box, null)
  });
}
export const KnowledgeTimeView = connector(_KnowledgeTimeView);
const no_svg_upper_children = [];
const get_svg_upper_children = ({wcomponent_connections}) => {
  return null;
};
