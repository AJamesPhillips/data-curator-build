import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ConfirmatoryDeleteButton} from "../../form/ConfirmatoryDeleteButton.js";
import {ACTIONS} from "../../state/actions.js";
import {get_current_knowledge_view_from_state} from "../../state/specialised_objects/accessors.js";
import {WComponentPresenceInOtherKVs} from "./WComponentPresenceInOtherKVs.js";
const map_state = (state, own_props) => {
  const current_knowledge_view = get_current_knowledge_view_from_state(state);
  const knowledge_view_entry = current_knowledge_view && current_knowledge_view.wc_id_map[own_props.wcomponent_id];
  return {
    knowledge_view_title: current_knowledge_view && current_knowledge_view.title,
    knowledge_view_entry,
    editing: !state.display_options.consumption_formatting
  };
};
const map_dispatch = {
  bulk_remove_from_knowledge_view: ACTIONS.specialised_object.bulk_remove_from_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _NotFoundWComponentKnowledgeViewForm(props) {
  const {
    wcomponent_id,
    knowledge_view_title,
    knowledge_view_entry,
    editing
  } = props;
  return /* @__PURE__ */ h("div", null, editing && knowledge_view_entry && !knowledge_view_entry.passthrough && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete from knowledge view (allow passthrough from foundations)",
    tooltip_text: "Delete from current knowledge view (" + knowledge_view_title + ") and allow passthrough from foundations",
    on_delete: () => {
      props.bulk_remove_from_knowledge_view({
        wcomponent_ids: [wcomponent_id],
        remove_type: "passthrough"
      });
    }
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentPresenceInOtherKVs, {
    wcomponent_id
  })));
}
export const NotFoundWComponentKnowledgeViewForm = connector(_NotFoundWComponentKnowledgeViewForm);
