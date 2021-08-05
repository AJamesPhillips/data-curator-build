import {h} from "../../_snowpack/pkg/preact.js";
import {StatementProbabilityChange} from "./StatementProbabilityChange.js";
import "./StatementProbabilityExplorer.css.proxy.js";
import {StatementProbability} from "./StatementProbability.js";
export function StatementProbabilityExplorer(props) {
  const {statement, probability, changes} = props;
  return /* @__PURE__ */ h("div", {
    className: "statement_probability_explorer"
  }, /* @__PURE__ */ h("div", {
    className: "statement"
  }, statement), changes.map((change) => [
    /* @__PURE__ */ h("br", null),
    /* @__PURE__ */ h("br", null),
    /* @__PURE__ */ h(StatementProbability, {
      probability: change.new_probability
    }),
    /* @__PURE__ */ h("br", null),
    /* @__PURE__ */ h("br", null),
    /* @__PURE__ */ h(StatementProbabilityChange, {
      change
    })
  ]));
}
export function DemoStatementProbabilityExplorer() {
  const changes = [
    {
      new_probability: 90,
      datetime: new Date("2021-01-10 12:00"),
      perception: "Event: Recording actions and project prioties was very illuminating",
      explanation: "This meta work has paid dividends already and I have a gut feel there's a lot more value in recording and later reviewing our knowledge, decisions and how the two related to each other."
    },
    {
      new_probability: 50,
      datetime: new Date("2020-12-10"),
      perception: "Process: we are not doing much to track or try and parse complexity",
      explanation: "Suggests that meta work might help."
    }
  ];
  return /* @__PURE__ */ h(StatementProbabilityExplorer, {
    statement: "Meta work will help us be more productive in the medium and long term",
    probability: 90,
    changes
  });
}
