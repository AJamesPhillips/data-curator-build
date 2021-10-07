import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {Box} from "../../../snowpack/pkg/@material-ui/core.js";
import "../../form/editable_list/EditableListEntry.css.proxy.js";
import {Button} from "../../sharedf/Button.js";
import {get_items_by_id} from "../../shared/utils/get_items.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {ValuePossibilityComponent} from "./ValuePossibilityComponent.js";
import {prepare_new_value_possibility} from "./value_possibilities/prepare_new_value_possibility.js";
import {ValuePossibilityDuplicate} from "./ValuePossibilityDuplicate.js";
import {get_possibilities_from_VAP_sets} from "./value_possibilities/get_possibilities_from_VAP_sets.js";
export function ValuePossibilitiesComponent(props) {
  const [show_value_possibilities, set_show_value_possibilities] = useState(false);
  if (props.VAPs_represent === VAPsType.boolean)
    return null;
  const value_possibilities_list = value_possibilities_as_list(props.value_possibilities);
  const {count_of_value_possibilities, max_count} = get_count_of_value_possibilities(value_possibilities_list);
  const warning = max_count > 1 ? "Duplicate value possibilities present" : "";
  const class_name = `editable_list_entry ${show_value_possibilities ? "expanded" : ""}`;
  return /* @__PURE__ */ h("div", {
    className: class_name
  }, /* @__PURE__ */ h("div", {
    className: "summary_header",
    style: {cursor: "pointer"},
    onClick: () => set_show_value_possibilities(!show_value_possibilities)
  }, /* @__PURE__ */ h("div", {
    className: "summary"
  }, /* @__PURE__ */ h("h4", {
    style: {display: "inline-block"}
  }, "Possible Values ", !show_value_possibilities && `(${value_possibilities_list.length})`), /* @__PURE__ */ h("div", {
    style: {display: "inline-block", position: "relative", top: 7, left: 5}
  }, /* @__PURE__ */ h(ValuePossibilityDuplicate, {
    warning,
    label: ""
  }))), /* @__PURE__ */ h("div", {
    className: "expansion_button"
  })), show_value_possibilities && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Box, {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  }, value_possibilities_list.map((value_possibility) => /* @__PURE__ */ h(ValuePossibilityComponent, {
    editing: props.editing,
    value_possibility,
    count_of_value_possibilities,
    update_value_possibility: (new_value_possibility) => {
      const modified_value_possibilities = {...props.value_possibilities};
      if (!new_value_possibility) {
        delete modified_value_possibilities[value_possibility.id];
      } else {
        modified_value_possibilities[new_value_possibility.id] = new_value_possibility;
      }
      const any_left = Object.keys(modified_value_possibilities).length > 0;
      props.update_value_possibilities(any_left ? modified_value_possibilities : void 0);
    }
  }))), /* @__PURE__ */ h(Button, {
    value: "New possibility",
    fullWidth: true,
    onClick: () => {
      const new_value_possibility = prepare_new_value_possibility(props.value_possibilities);
      const modified_value_possibilities = {
        ...props.value_possibilities,
        [new_value_possibility.id]: new_value_possibility
      };
      props.update_value_possibilities(modified_value_possibilities);
    }
  }), props.value_possibilities === void 0 && /* @__PURE__ */ h(Button, {
    value: "Use defaults",
    fullWidth: true,
    onClick: () => {
      const possible_values = get_possibilities_from_VAP_sets(props.VAPs_represent, void 0, props.values_and_prediction_sets);
      const value_possibilities = get_items_by_id(possible_values, "default_possible_values");
      props.update_value_possibilities(value_possibilities);
    }
  })));
}
function get_count_of_value_possibilities(value_possibilities) {
  const count_of_value_possibilities = {};
  let max_count = 0;
  value_possibilities.forEach(({value}) => {
    value = value.toLowerCase();
    const count = (count_of_value_possibilities[value] || 0) + 1;
    count_of_value_possibilities[value] = count;
    max_count = Math.max(max_count, count);
  });
  return {count_of_value_possibilities, max_count};
}
function value_possibilities_as_list(value_possibilities) {
  return Object.values(value_possibilities || {}).sort((a, b) => a.order < b.order ? -1 : 1);
}
