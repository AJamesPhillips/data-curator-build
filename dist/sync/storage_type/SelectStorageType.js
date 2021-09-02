import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {Modal} from "../../modal/Modal.js";
import {StorageOptionsForm} from "./StorageOptionsForm.js";
const map_state = (state) => {
  return {
    storage_type: state.sync.storage_type
  };
};
const connector = connect(map_state);
function _SelectStorageType(props) {
  const initial_storage_type_defined = props.storage_type !== void 0;
  return /* @__PURE__ */ h(Modal, {
    title: /* @__PURE__ */ h("div", {
      style: {margin: 10}
    }, /* @__PURE__ */ h("h2", {
      style: {display: "inline"}
    }, "Where would you like to store your data?"), /* @__PURE__ */ h("span", null, "  (You can change this at any time)")),
    size: "medium",
    on_close: !initial_storage_type_defined ? void 0 : (e) => {
      e?.stopImmediatePropagation();
      props.on_close();
    },
    child: /* @__PURE__ */ h(StorageOptionsForm, {
      storage_type: props.storage_type,
      on_close: props.on_close
    })
  });
}
export const SelectStorageType = connector(_SelectStorageType);
