import {Component, h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {PatternListEntry} from "../patterns/PatternListEntry.js";
import {StatementListEntry} from "../statements/StatementListEntry.js";
import {CORE_IDS} from "../state/core_data.js";
import {ObjectListEntry} from "../objects/ObjectListEntry.js";
import {is_object_id, is_pattern_id, is_statement_id} from "../shared/utils/ids.js";
function add_search_props(item) {
  return {
    ...item,
    search: {
      weight: 0,
      match: true
    }
  };
}
function map_state(state, own_props) {
  const {filtered_by_string, filter_type} = own_props;
  const terms = filtered_by_string.toLowerCase().split(" ");
  let statements = state.statements.map((i) => add_search_props(i));
  let patterns = state.patterns.map((i) => add_search_props(i));
  let objects = state.objects.map(add_search_props);
  if (filter_type === "simple_types" || filter_type === "types") {
    statements = statements.filter((s) => s.labels.includes(CORE_IDS.sType));
  } else if (filter_type === "patterns") {
    statements = [];
  }
  statements.forEach((i) => {
    terms.forEach((term) => {
      const match = i.content.toLowerCase().includes(term);
      if (match)
        i.search.weight += 1;
    });
  });
  if (filter_type === "types" || filter_type === "patterns") {
    patterns = patterns.filter((i) => {
      let any_match = false;
      terms.forEach((term) => {
        const match = i.name.toLowerCase().includes(term) || i.content.toLowerCase().includes(term);
        if (match)
          i.search.weight += 1;
        any_match = any_match || match;
      });
      return any_match;
    });
  } else {
    patterns = [];
  }
  if (filter_type !== "all_concrete") {
    objects = [];
  }
  objects = objects.filter((i) => {
    let matches = 0;
    terms.forEach((term) => {
      const match = i.content.toLowerCase().includes(term) || i.rendered.toLowerCase().includes(term) || i.pattern_name.toLowerCase().includes(term);
      matches += match ? 1 : 0;
    });
    i.search.weight += matches;
    return matches > 0;
  });
  let items = [];
  items = items.concat(statements).concat(patterns).concat(objects);
  items.forEach((i) => {
    if (!own_props.specific_type_id)
      return;
    let matches = 0;
    if (i.hasOwnProperty("labels")) {
      const t = i;
      matches += t.labels.includes(own_props.specific_type_id) ? 1 : 0;
    }
    if (i.hasOwnProperty("pattern_name")) {
      const t = i;
      matches += t.pattern_id === own_props.specific_type_id ? 1 : 0;
    }
    i.search.weight += matches;
    i.search.match = matches > 0;
  });
  let max_weight = 0;
  items.forEach((i) => max_weight = Math.max(max_weight, i.search.weight));
  items.forEach((i) => i.search.weight = i.search.weight / max_weight);
  items = items.sort(({search: {weight: a}}, {search: {weight: b}}) => a === b ? 0 : a > b ? -1 : 1);
  return {
    items
  };
}
const connector = connect(map_state);
class _ListOfTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return /* @__PURE__ */ h("table", {
      class: "list"
    }, /* @__PURE__ */ h("tbody", null, this.props.items.map((item) => /* @__PURE__ */ h("tr", {
      key: item.id,
      className: item.search.match ? "match" : "",
      onClick: () => this.props.on_click(item)
    }, /* @__PURE__ */ h("td", null, /* @__PURE__ */ h("div", {
      style: {
        width: 5,
        height: `${3 + item.search.weight * 18}px`,
        backgroundColor: `rgba(255, ${(1 - item.search.weight) * 255},0,${item.search.weight})`
      }
    })), is_statement_id(item.id) && StatementListEntry({
      statement: item,
      on_click: () => this.props.on_click(item)
    }), is_pattern_id(item.id) && PatternListEntry({
      pattern: item,
      on_click: () => this.props.on_click(item)
    }), is_object_id(item.id) && ObjectListEntry({
      object: item,
      on_click: () => this.props.on_click(item)
    }))), /* @__PURE__ */ h("tr", null, /* @__PURE__ */ h("td", null), /* @__PURE__ */ h("td", null, "                                                                                                                                           "))));
  }
}
export const ListOfTypes = connector(_ListOfTypes);
