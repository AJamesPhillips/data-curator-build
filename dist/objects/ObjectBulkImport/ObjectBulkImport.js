import {Component, h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {LinkButton} from "../../sharedf/Link.js";
import {get_data_from_air_table, replace_temp_ids, temp_id_factory} from "./get_data_from_air_table.js";
import {PATTERN_ID_ACTION_V2, PATTERN_ID_PRIORITY, PATTERN_ID_EVENT} from "./_common.js";
const map_state = (state) => {
  const pattern_action = state.patterns.find(({id}) => id === PATTERN_ID_ACTION_V2);
  const pattern_priority = state.patterns.find(({id}) => id === PATTERN_ID_PRIORITY);
  const pattern_event = state.patterns.find(({id}) => id === PATTERN_ID_EVENT);
  const ready = state.sync.ready;
  if (!pattern_action && ready)
    throw new Error(`Pattern "Action v2" for id: ${PATTERN_ID_ACTION_V2} not found`);
  if (!pattern_priority && ready)
    throw new Error(`Pattern "Priority" for id: ${PATTERN_ID_PRIORITY} not found`);
  if (!pattern_event && ready)
    throw new Error(`Pattern "Event" for id: ${PATTERN_ID_EVENT} not found`);
  return {
    existing_objects: state.objects,
    patterns_available: !!pattern_action && !!pattern_event,
    patterns: {
      action: pattern_action,
      priority: pattern_priority,
      event: pattern_event
    }
  };
};
const map_dispatch = {
  upsert_objects: ACTIONS.object.upsert_objects,
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
class _ObjectBulkImport extends Component {
  constructor(props) {
    super(props);
    this.state = {statuses: []};
  }
  render() {
    const add_status = (status) => this.setState({statuses: [...this.state.statuses, status]});
    const set_statuses = (statuses2) => this.setState({statuses: statuses2});
    const on_new_objects = (object_type, objects, error) => {
      if (error) {
        add_status(error);
        return;
      }
      add_status(`Successfully fetched ${objects.length} ${object_type} objects`);
      this.props.upsert_objects({objects});
    };
    const get_data = async () => {
      if (!this.props.patterns_available) {
        set_statuses(["Can not fetch objects from AirTable API, patterns not available"]);
        setTimeout(() => set_statuses([]), 5e3);
        return;
      }
      const {patterns, existing_objects} = this.props;
      const {temporary_ids_map, get_temp_id} = temp_id_factory();
      set_statuses(["Fetching objects from AirTable API", ""]);
      const actions_result = await get_data_from_air_table(patterns.action, existing_objects, get_temp_id);
      const priorities_result = await get_data_from_air_table(patterns.priority, existing_objects, get_temp_id);
      const objects_with_temp_ids = [
        ...actions_result.objects_with_temp_ids,
        ...priorities_result.objects_with_temp_ids
      ];
      const objects = replace_temp_ids({
        objects_with_temp_ids,
        existing_objects,
        temporary_ids_map
      });
      on_new_objects("of all types of", objects, actions_result.error);
      setTimeout(() => set_statuses([]), 5e3);
    };
    let {statuses} = this.state;
    if (statuses.length)
      statuses = ["Status:", ...statuses];
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("b", null, "Object Bulk Import"), /* @__PURE__ */ h(LinkButton, {
      route: "objects",
      sub_route: "objects_bulk_import/setup",
      item_id: void 0,
      args: void 0,
      name: "Bulk import setup",
      style: {float: "right"}
    }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("b", null, "Get AirTable data"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
      type: "button",
      value: this.props.patterns_available ? "Get data" : "(Patterns not available)",
      onClick: get_data,
      disabled: !!statuses.length || !this.props.patterns_available
    }), /* @__PURE__ */ h("br", null), statuses.map((status, i) => /* @__PURE__ */ h("div", {
      key: status + i
    }, /* @__PURE__ */ h("b", null, status), /* @__PURE__ */ h("br", null))));
  }
}
export const ObjectBulkImport = connector(_ObjectBulkImport);
