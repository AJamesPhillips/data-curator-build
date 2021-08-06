import {h} from "../../snowpack/pkg/preact.js";
import {StatementProbability} from "./StatementProbability.js";
import "./StatementWithProbability.css.proxy.js";
export function StatementWithProbabililty(props) {
  return /* @__PURE__ */ h("div", {
    className: "statement_with_probability"
  }, /* @__PURE__ */ h("div", {
    className: "statement"
  }, props.statement), /* @__PURE__ */ h(StatementProbability, {
    probability: props.probability
  }));
}
export function DemoStatementProbability() {
  const props = {
    statement: "Some statement",
    probability: 4
  };
  return /* @__PURE__ */ h(StatementWithProbabililty, {
    ...props
  });
}
