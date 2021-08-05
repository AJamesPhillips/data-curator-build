import {h} from "../../_snowpack/pkg/preact.js";
import {MainArea} from "../layout/MainArea.js";
import {performance_logger} from "../utils/performance.js";
import {ObjectivesGraph} from "./ObjectivesGraph.js";
export function Objectives() {
  performance_logger("Objectives...");
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(ObjectivesGraph, null)
  });
}
