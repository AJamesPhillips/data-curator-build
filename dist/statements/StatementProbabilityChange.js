import {h} from "../../_snowpack/pkg/preact.js";
import {date2str} from "../shared/utils/date_helpers.js";
import "./StatementProbabilityChange.css.proxy.js";
export function StatementProbabilityChange(props) {
  const {datetime, perception, explanation} = props.change;
  return /* @__PURE__ */ h("div", {
    className: "statement_probability_change"
  }, /* @__PURE__ */ h("div", null, date2str(datetime, "yyyy-MM-dd")), /* @__PURE__ */ h("div", {
    className: "perception"
  }, perception), /* @__PURE__ */ h("div", {
    className: "explanation"
  }, explanation));
}
