import {h} from "../../../_snowpack/pkg/preact.js";
import {ObjectsListModal} from "../../objects/ObjectsListModal.js";
export function DailyActionsList(props) {
  return /* @__PURE__ */ h(ObjectsListModal, {
    object_ids: props.action_ids_to_show,
    on_close: props.on_close,
    title: "Actions"
  });
}
