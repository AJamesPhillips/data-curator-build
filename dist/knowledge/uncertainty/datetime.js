import {h} from "../../../_snowpack/pkg/preact.js";
import "./datetime.css.proxy.js";
import {EditableCustomDateTime} from "../../form/EditableCustomDateTime.js";
import {connect} from "../../../_snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  show_unused_fields: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _UncertainDateTime(props) {
  const {datetime, on_change, show_unused_fields} = props;
  return /* @__PURE__ */ h("div", {
    className: "datetimes"
  }, (show_unused_fields || datetime.min) && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_title description_label"
  }, "min"), /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Minimum datetime",
    value: datetime.min,
    on_change: (min) => on_change({...datetime, min})
  }))), (show_unused_fields || datetime.value) && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_title description_label"
  }, "DateTime"), /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Expected datetime",
    value: datetime.value,
    on_change: (value) => on_change({...datetime, value})
  }))), (show_unused_fields || datetime.max) && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_title description_label"
  }, "max"), /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Maximum datetime",
    value: datetime.max,
    on_change: (max) => on_change({...datetime, max})
  }))));
}
export const UncertainDateTime = connector(_UncertainDateTime);
