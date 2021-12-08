import {h} from "../../../snowpack/pkg/preact.js";
import "./UncertainDateTimeForm.css.proxy.js";
import {EditableCustomDateTime} from "../../form/EditableCustomDateTime.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
const map_state = (state) => ({
  show_unused_fields: !state.display_options.consumption_formatting
});
const connector = connect(map_state);
function _UncertainDateTimeForm(props) {
  const {datetime, on_change, show_unused_fields} = props;
  return /* @__PURE__ */ h("div", {
    className: "datetimes"
  }, datetime.min && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Minimum datetime",
    value: datetime.min,
    on_change: (min) => on_change({...datetime, min})
  }))), (show_unused_fields || datetime.value) && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Expected datetime",
    value: datetime.value,
    on_change: (value) => on_change({...datetime, value})
  }))), datetime.max && /* @__PURE__ */ h("div", {
    className: "datetime_section"
  }, /* @__PURE__ */ h("div", {
    className: "datetime_value"
  }, /* @__PURE__ */ h(EditableCustomDateTime, {
    title: "Maximum datetime",
    value: datetime.max,
    on_change: (max) => on_change({...datetime, max})
  }))));
}
export const UncertainDateTimeForm = connector(_UncertainDateTimeForm);
