import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ObjectListEntry} from "./ObjectListEntry.js";
const map_state = (state, props) => {
  let objects = [...state.objects].reverse();
  if (props.object_ids) {
    const include_ids = new Set(props.object_ids);
    objects = objects.filter(({id}) => include_ids.has(id));
  }
  return {objects};
};
const connector = connect(map_state);
function _ObjectsList(props) {
  return /* @__PURE__ */ h("table", {
    class: "list"
  }, /* @__PURE__ */ h("tbody", null, props.objects.map((object) => /* @__PURE__ */ h("tr", null, ObjectListEntry({object})))));
}
export const ObjectsList = connector(_ObjectsList);
