import {Component, h} from "../../../snowpack/pkg/preact.js";
import {useMemo} from "../../../snowpack/pkg/preact/hooks.js";
import {FormControl} from "../../../snowpack/pkg/@material-ui/core.js";
import "./EditableListEntry.css.proxy.js";
import {ConfirmatoryDeleteButton} from "../ConfirmatoryDeleteButton.js";
import {EditableCustomDateTime} from "../EditableCustomDateTime.js";
export class EditableListEntry extends Component {
  constructor(props) {
    super(props);
    const {calc_initial_custom_expansion_state: calc_initial_expanded} = props;
    const custom_expanded = calc_initial_expanded && calc_initial_expanded(props.item);
    const internal__expanded = custom_expanded !== void 0 ? custom_expanded : !!props.expanded;
    this.state = {internal__expanded};
  }
  componentDidUpdate(prev_props, prev_state) {
    if (this.props.expanded !== prev_props.expanded) {
      this.setState({internal__expanded: !!this.props.expanded});
    }
  }
  render() {
    const {
      item,
      get_created_at,
      get_custom_created_at,
      set_custom_created_at = (item2, custom_created_at2) => ({...item2, custom_created_at: custom_created_at2}),
      get_summary,
      get_details,
      get_details2,
      get_details3,
      disable_collapsable,
      crud,
      delete_button_text
    } = this.props;
    const {update_item, delete_item} = crud;
    const custom_created_at = get_custom_created_at ? get_custom_created_at(item) : void 0;
    const {internal__expanded} = this.state;
    const class_name__not_collapsable = disable_collapsable ? "not_collapsable" : "";
    const class_name__expanded = internal__expanded ? "expanded" : "";
    const extra_class_names = this.props.extra_class_names || "";
    const class_name = `editable_list_entry ${class_name__not_collapsable} ${class_name__expanded} ${extra_class_names}`;
    const on_delete = useMemo(() => delete_item && (() => delete_item(item)), [delete_item, item]);
    const date_on_change = (new_custom_created_at) => {
      update_item(set_custom_created_at(item, new_custom_created_at));
    };
    return /* @__PURE__ */ h("div", {
      className: class_name
    }, /* @__PURE__ */ h("div", {
      className: "summary_header"
    }, /* @__PURE__ */ h("div", {
      className: "summary"
    }, get_summary(item, crud)), /* @__PURE__ */ h("div", {
      className: "expansion_button",
      onClick: () => this.setState({internal__expanded: !internal__expanded})
    })), /* @__PURE__ */ h("div", {
      className: "details"
    }, get_details(item, crud), /* @__PURE__ */ h("div", {
      className: "details2"
    }, get_details2 && get_details2(item, crud)), /* @__PURE__ */ h("div", null, on_delete && /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
      on_delete,
      button_text: delete_button_text
    }), (get_created_at || get_custom_created_at) && /* @__PURE__ */ h(FormControl, null, /* @__PURE__ */ h(EditableCustomDateTime, {
      title: "Created at",
      invariant_value: get_created_at && get_created_at(item),
      value: custom_created_at,
      on_change: date_on_change
    }))), /* @__PURE__ */ h("div", {
      className: "details3"
    }, get_details3 && get_details3(item, crud))));
  }
}
