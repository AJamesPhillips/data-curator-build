import {h} from "../../../snowpack/pkg/preact.js";
import LinkOffIcon from "../../../snowpack/pkg/@material-ui/icons/LinkOff.js";
import "./ValuePossibilityLink.css.proxy.js";
import {AddLinkIcon} from "../../sharedf/icons/AddLinkIcon.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {LinkWorkingIcon} from "../../sharedf/icons/LinkWorkingIcon.js";
import {get_value_possibilities_by_value} from "../../wcomponent/value_possibilities/get_value_possibilities_by_value.js";
export function ValuePossibilityLink(props) {
  const {editing, VAP, value_possibilities, update_VAP} = props;
  const value_possibilities_by_value = useMemo(() => get_value_possibilities_by_value(props.value_possibilities, true), [props.value_possibilities]);
  if (value_possibilities === void 0)
    return /* @__PURE__ */ h("span", {
      title: "Need to first add value possibilities to link to.",
      className: "possible_value_link disabled"
    }, /* @__PURE__ */ h(LinkOffIcon, null));
  const value_possibility_linked = !!value_possibilities[VAP.value_id || ""];
  if (value_possibility_linked)
    return /* @__PURE__ */ h("span", {
      title: "Linked to possible value.  Click to unlink.",
      className: "possible_value_link " + (editing ? "clickable" : "disabled"),
      onClick: () => {
        const modified_VAP = {...VAP};
        delete modified_VAP.value_id;
        update_VAP(modified_VAP);
      }
    }, /* @__PURE__ */ h(LinkWorkingIcon, {
      className: "hide_on_hover"
    }), /* @__PURE__ */ h(LinkOffIcon, {
      className: "show_on_hover"
    }));
  const linkable_value_possibility = value_possibilities_by_value[VAP.value.toLowerCase()];
  if (linkable_value_possibility)
    return /* @__PURE__ */ h("span", {
      title: "Linkable to value possibility.  Click to link.",
      className: "possible_value_link " + (editing ? "clickable" : "disabled"),
      onClick: () => {
        const value_possibility = value_possibilities[linkable_value_possibility.id];
        const description = value_possibility.description || VAP.description;
        const modified_VAP = {
          ...VAP,
          value_id: linkable_value_possibility.id,
          description
        };
        update_VAP(modified_VAP);
      }
    }, /* @__PURE__ */ h(AddLinkIcon, null));
  return /* @__PURE__ */ h("span", {
    title: "No matching value possibility to link to.",
    className: "possible_value_link disabled"
  }, /* @__PURE__ */ h(LinkOffIcon, null));
}
