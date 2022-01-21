import {h} from "../../snowpack/pkg/preact.js";
import {EditableCustomDateTime} from "../form/EditableCustomDateTime.js";
import {EditableNumber} from "../form/EditableNumber.js";
import {DEFAULT_DATETIME_LINE_CONFIG} from "./datetime_line.js";
import {
  get_composed_datetime_lines_config,
  get_foundational_knowledge_views
} from "../state/specialised_objects/knowledge_views/knowledge_views_derived_reducer.js";
import {Button} from "../sharedf/Button.js";
export const KnowledgeViewDatetimeLinesConfigForm = (props) => {
  const {editing, knowledge_view} = props;
  const foundational_knowledge_view = get_foundational_knowledge_views(knowledge_view, props.knowledge_views_by_id, false);
  const composed = get_composed_datetime_lines_config(foundational_knowledge_view, false);
  const {datetime_line_config: orig_datetime_line_config = {}} = knowledge_view;
  const final_time_origin_ms = orig_datetime_line_config.time_origin_ms ?? composed.time_origin_ms;
  const update_item = (config) => {
    const new_datetime_line_config = {
      ...orig_datetime_line_config,
      ...config
    };
    props.update_item({...knowledge_view, datetime_line_config: new_datetime_line_config});
  };
  if (final_time_origin_ms === void 0) {
    if (!editing)
      return null;
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Configure X Axis Datetime"), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableCustomDateTime, {
      title: "Time origin",
      value: void 0,
      on_change: (new_time_origin_date) => {
        const new_time_origin_ms = new_time_origin_date ? new_time_origin_date.getTime() : void 0;
        update_item({time_origin_ms: new_time_origin_ms});
      }
    })));
  }
  const final_time_origin_x = inherit_or_default(orig_datetime_line_config, composed, "time_origin_x");
  const final_time_scale = inherit_or_default(orig_datetime_line_config, composed, "time_scale");
  const final_time_line_number = inherit_or_default(orig_datetime_line_config, composed, "time_line_number");
  const final_time_line_spacing_days = inherit_or_default(orig_datetime_line_config, composed, "time_line_spacing_days");
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Configure X Axis Datetime"), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Time origin",
    value: new Date(final_time_origin_ms),
    on_change: (new_time_origin_date) => {
      const new_time_origin_ms = new_time_origin_date ? new_time_origin_date.getTime() : void 0;
      update_item({time_origin_ms: new_time_origin_ms});
    }
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Time origin position",
    value: final_time_origin_x.value,
    allow_undefined: true,
    conditional_on_blur: (new_time_origin_x) => {
      update_item({time_origin_x: new_time_origin_x});
    },
    style: {width: "70%"}
  }), editing && /* @__PURE__ */ h(IndicateSource, {
    source: final_time_origin_x.source
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Time scale",
    value: final_time_scale.value,
    allow_undefined: true,
    conditional_on_blur: (new_time_scale) => {
      update_item({time_scale: new_time_scale});
    },
    style: {width: "70%"}
  }), editing && /* @__PURE__ */ h(IndicateSource, {
    source: final_time_scale.source
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Time line number",
    value: final_time_line_number.value,
    allow_undefined: true,
    conditional_on_blur: (new_time_line_number) => {
      update_item({time_line_number: new_time_line_number});
    },
    style: {width: "70%"}
  }), editing && /* @__PURE__ */ h(IndicateSource, {
    source: final_time_line_number.source
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(EditableNumber, {
    placeholder: "Days between time line",
    value: final_time_line_spacing_days.value,
    allow_undefined: true,
    conditional_on_blur: (new_time_line_spacing_days) => {
      update_item({time_line_spacing_days: new_time_line_spacing_days});
    },
    style: {width: "70%"}
  }), editing && /* @__PURE__ */ h(IndicateSource, {
    source: final_time_line_spacing_days.source
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(Button, {
    value: "Clear (to inherited or default to month)",
    fullWidth: true,
    onClick: () => {
      update_item({
        time_scale: void 0,
        time_line_number: void 0,
        time_line_spacing_days: void 0
      });
    }
  })), editing && /* @__PURE__ */ h("p", {
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  }, /* @__PURE__ */ h("div", null, "Defaults:"), "  ", /* @__PURE__ */ h(Button, {
    value: "Week",
    fullWidth: false,
    onClick: () => {
      update_item({
        time_scale: 3,
        time_line_number: 8,
        time_line_spacing_days: 7
      });
    }
  }), " ", /* @__PURE__ */ h(Button, {
    value: "Month",
    fullWidth: false,
    onClick: () => {
      update_item({
        time_scale: DEFAULT_DATETIME_LINE_CONFIG.time_scale,
        time_line_number: DEFAULT_DATETIME_LINE_CONFIG.time_line_number,
        time_line_spacing_days: DEFAULT_DATETIME_LINE_CONFIG.time_line_spacing_days
      });
    }
  }), " ", /* @__PURE__ */ h(Button, {
    value: "Year",
    fullWidth: false,
    onClick: () => {
      update_item({
        time_scale: 0.3,
        time_line_number: 2,
        time_line_spacing_days: 365
      });
    }
  })));
};
var ValueSource;
(function(ValueSource2) {
  ValueSource2[ValueSource2["own"] = 0] = "own";
  ValueSource2[ValueSource2["inherited"] = 1] = "inherited";
  ValueSource2[ValueSource2["default"] = 2] = "default";
})(ValueSource || (ValueSource = {}));
function inherit_or_default(current_config, inheritable_composed, key) {
  const value = current_config[key] ?? inheritable_composed[key] ?? DEFAULT_DATETIME_LINE_CONFIG[key];
  const source = value === current_config[key] ? 0 : value === inheritable_composed[key] ? 1 : 2;
  return {value, source};
}
function IndicateSource(props) {
  if (props.source === 0)
    return null;
  const title = props.source === 1 ? "Inherited from foundation" : "Default";
  return /* @__PURE__ */ h("div", {
    style: {color: "grey", fontSize: 11},
    title
  }, props.source === 1 ? "(Inherited)" : "(Default)");
}
