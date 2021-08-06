import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {ProbablitySelection} from "../probability/ProbabililtySelection.js";
import {get_probability_option} from "../shared/uncertainty/probabilities.js";
import {ProbabilityGraph} from "../probability/ProbabilityGraph.js";
import {factory_scaled_weibull} from "../probability/weibulll.js";
import "./PredictionsGraph.css.proxy.js";
const max_conviction = 100;
function PredictionsGraphCell(props) {
  return /* @__PURE__ */ h("div", {
    className: "prediction_cell",
    style: {height: props.cell_height, borderWidth: props.border_width},
    onClick: (e) => props.clicked && props.clicked(true),
    onContextMenu: (e) => {
      e.preventDefault();
      props.clicked && props.clicked(false);
    },
    title: props.title
  }, /* @__PURE__ */ h("div", {
    style: {backgroundColor: props.filled ? "#777" : "#DDD", height: "100%"}
  }));
}
function is_filled(args) {
  return max_conviction - args.y * args.conviction_increment <= args.conviction;
}
const column_width = (args) => {
  const extra_width = Math.max(0, 2 - args.border_width);
  return args.progress * args.graph_size + args.border_width * 2 + extra_width;
};
function PredictionsGraphColumn(props) {
  const conviction_increment = max_conviction / props.y_divs;
  const handle_clicked_cell = props.changed_conviction ? (left_button) => {
    if (left_button) {
      if (props.conviction < max_conviction)
        props.changed_conviction(props.conviction + conviction_increment);
    } else {
      if (props.conviction > 0)
        props.changed_conviction(props.conviction - conviction_increment);
    }
  } : void 0;
  const handle_bulk_toggle = props.changed_conviction ? () => {
    if (props.conviction < max_conviction)
      props.changed_conviction(max_conviction);
    else if (props.conviction > 0)
      props.changed_conviction(0);
  } : void 0;
  const width = column_width(props);
  const cell_height = props.graph_size / props.y_divs;
  return /* @__PURE__ */ h("div", {
    className: "prediction_column_container"
  }, /* @__PURE__ */ h("div", {
    className: "prediction_column",
    style: {width}
  }, Array.from(Array(props.y_divs)).map((_, y) => {
    let title = `${props.conviction.toFixed(2)}%`;
    if (props.progress !== 0.5) {
      title += ` ${Math.round(props.start * 100)}-${Math.round((props.start + props.progress) * 100)}%`;
    }
    return /* @__PURE__ */ h(PredictionsGraphCell, {
      filled: is_filled({y, conviction: props.conviction, conviction_increment}),
      title,
      clicked: handle_clicked_cell,
      cell_height,
      border_width: props.border_width
    });
  })), props.changed_conviction && /* @__PURE__ */ h(PredictionsGraphColumnBulkEdit, {
    width,
    toggle_column: handle_bulk_toggle
  }));
}
function PredictionsGraphColumnBulkEdit(props) {
  return /* @__PURE__ */ h("input", {
    type: "button",
    value: "",
    title: "Toggle column",
    onClick: () => props.toggle_column && props.toggle_column(),
    style: {width: props.width - 2, margin: 1}
  });
}
function PredictionsGraphRowBulkEdit(props) {
  return /* @__PURE__ */ h("div", {
    style: {
      verticalAlign: "top",
      display: "inline-block",
      width: 80,
      marginLeft: 10
    }
  }, /* @__PURE__ */ h("input", {
    type: "button",
    value: "+",
    onClick: () => props.change_row(true)
  }), /* @__PURE__ */ h("input", {
    type: "button",
    value: "-",
    onClick: () => props.change_row(false)
  }));
}
export function PredictionsGraph(props) {
  const [data, _set_data] = useState(props.data);
  const x_divs = Math.max(1, data.length);
  const x_increment = 1 / x_divs;
  const y_divs = Math.max(1, props.y_divs || 10);
  const conviction_increment = max_conviction / y_divs;
  function set_data_safely(data2) {
    data2.forEach((d) => {
      d.conviction = Math.max(0, Math.min(d.conviction, max_conviction));
    });
    _set_data(data2);
  }
  function factor_changed_column(column) {
    return (new_conviction) => {
      const new_data = [...data];
      new_data[column] = {progress: new_data[column].progress, conviction: new_conviction};
      set_data_safely(new_data);
    };
  }
  function change_row(increase) {
    const new_data = data.map((d) => {
      if (increase && d.conviction < max_conviction) {
        return {...d, conviction: d.conviction + conviction_increment};
      } else if (!increase && d.conviction > 0) {
        return {...d, conviction: d.conviction - conviction_increment};
      }
      return d;
    });
    set_data_safely(new_data);
  }
  const invalid = props.invalid;
  return /* @__PURE__ */ h("div", {
    className: "prediction_graph " + (invalid ? "invalid" : "")
  }, /* @__PURE__ */ h("div", {
    style: {float: "left", position: "relative"}
  }, /* @__PURE__ */ h("div", null, props.outcome_a), /* @__PURE__ */ h("div", {
    style: {position: "absolute", top: 0, right: 0}
  }, props.outcome_b), data.map((args, i) => /* @__PURE__ */ h(PredictionsGraphColumn, {
    ...args,
    start: i * x_increment,
    changed_conviction: factor_changed_column(i),
    y_divs,
    border_width: 2,
    graph_size: 400
  }))), /* @__PURE__ */ h(PredictionsGraphRowBulkEdit, {
    change_row
  }), /* @__PURE__ */ h("div", null, "Sum: ", get_sum(data)), /* @__PURE__ */ h("div", null, JSON.stringify(data)));
}
export function PredictionsGraphMini(props) {
  const x_divs = Math.max(1, props.data.length);
  const x_increment = 1 / x_divs;
  const y_divs = Math.max(1, props.y_divs || 10);
  const invalid = props.invalid;
  return /* @__PURE__ */ h("div", {
    className: "prediction_graph mini " + (invalid ? "invalid" : "")
  }, /* @__PURE__ */ h("div", {
    style: {float: "left", position: "relative"}
  }, /* @__PURE__ */ h("div", {
    className: "label",
    title: props.outcome_a
  }, "A"), /* @__PURE__ */ h("div", {
    className: "label label_b",
    title: props.outcome_b
  }, "B"), props.data.map((args, i) => /* @__PURE__ */ h(PredictionsGraphColumn, {
    ...args,
    start: i * x_increment,
    y_divs,
    border_width: 0.5,
    graph_size: 40
  }))));
}
function get_sum(data) {
  let sum = 0;
  data.forEach(({progress, conviction}) => {
    sum += conviction;
  });
  return sum;
}
function is_invalid_data(data) {
  const sum = get_sum(data);
  return sum.toFixed(2) !== "100.00";
}
function WeibullGraphMaker() {
  const [probability, _set_probability] = useState(1);
  const [lambda, set_lambda] = useState(1);
  const [k, set_k] = useState(1);
  const [reverse, set_reverse] = useState(false);
  function set_probability(p) {
    _set_probability(p);
    const probability_option = get_probability_option(p);
    if (probability_option) {
      set_lambda(probability_option.lambda);
      set_k(probability_option.k);
      set_reverse(probability_option.reverse);
    }
  }
  const scale = 100;
  const calc_x = factory_scaled_weibull({lambda, k, scale});
  return /* @__PURE__ */ h("div", null, "Probability: ", probability, "%", /* @__PURE__ */ h(ProbabilityGraph, {
    calc_x,
    size: scale * 4,
    reverse
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(ProbablitySelection, {
    probability,
    set_probability
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Lambda: ", lambda, /* @__PURE__ */ h("input", {
    type: "range",
    value: lambda,
    max: 10,
    step: 0.1,
    onChange: (e) => set_lambda(parseFloat(e.currentTarget.value.slice(0, 4)))
  }), "k: ", k, /* @__PURE__ */ h("input", {
    type: "range",
    value: k,
    max: 10,
    step: 0.1,
    onChange: (e) => set_k(parseFloat(e.currentTarget.value.slice(0, 4)))
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("br", null));
}
export function DemoPredictionsGraph() {
  return /* @__PURE__ */ h(WeibullGraphMaker, null);
}
