import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {ObjectsList} from "../objects/ObjectsList.js";
import {ObjectForm} from "../objects/ObjectForm.js";
import {ObjectBulkImport} from "../objects/ObjectBulkImport/ObjectBulkImport.js";
import {ObjectBulkImportSetup} from "../objects/ObjectBulkImport/ObjectBulkImportSetup.js";
const map_state = (state) => ({
  object: state.objects.find(({id}) => id === state.routing.item_id),
  show_bulk_import: state.routing.sub_route === "objects_bulk_import",
  show_bulk_import_setup: state.routing.sub_route === "objects_bulk_import/setup",
  object_count: state.objects.length
});
const connector = connect(map_state);
function _Objects(props) {
  if (props.show_bulk_import)
    return /* @__PURE__ */ h(ObjectBulkImport, null);
  if (props.show_bulk_import_setup)
    return /* @__PURE__ */ h(ObjectBulkImportSetup, null);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ObjectForm, {
    object: props.object
  }), /* @__PURE__ */ h("hr", null), "Objects: ", props.object_count, /* @__PURE__ */ h(ObjectsList, null));
}
export const Objects = connector(_Objects);
