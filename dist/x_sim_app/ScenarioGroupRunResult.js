import {h} from "../../snowpack/pkg/preact.js";
import {date2str_auto} from "../shared/utils/date_helpers.js";
import "./ScenarioGroupRunResult.css.proxy.js";
export function ScenarioGroupRunResultComponent(props) {
  const {scenario_group_run_result: result} = props;
  return /* @__PURE__ */ h("div", {
    className: "scenario_group_run_result"
  }, date2str_auto({date: result.started, time_resolution: "second"}));
}
