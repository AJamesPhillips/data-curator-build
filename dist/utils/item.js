import {h} from "../../_snowpack/pkg/preact.js";
import {LabelsList} from "../labels/LabelsList.js";
import {ObjectDescription} from "../objects/ObjectDescription.js";
export function is_statement(s) {
  return !is_object(s) && !is_item(s);
}
export function is_item(s) {
  return s.hasOwnProperty("name");
}
export function is_object(s) {
  return s.hasOwnProperty("pattern_id");
}
export function description_statement(statement) {
  return /* @__PURE__ */ h("div", null, statement.content, /* @__PURE__ */ h("div", {
    style: {display: "inline-block"}
  }, /* @__PURE__ */ h(LabelsList, {
    labels: statement.labels
  })));
}
export function description_pattern(pattern) {
  return pattern.name;
}
export function description(item) {
  if (is_object(item)) {
    return /* @__PURE__ */ h(ObjectDescription, {
      object: item
    });
  }
  if (is_statement(item)) {
    return description_statement(item);
  }
  return item.name;
}
