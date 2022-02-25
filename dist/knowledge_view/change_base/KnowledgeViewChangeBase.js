import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ConfirmatoryButton} from "../../form/ConfirmatoryButton.js";
import {Button} from "../../sharedf/Button.js";
import {get_supabase} from "../../supabase/get_supabase.js";
import {calc_ids_to_move_and_conflicts} from "./calc_ids_to_move_and_conflicts.js";
import {SelectBaseToMoveTo} from "./SelectBaseToMoveTo.js";
import {WComponentMoveConflicts} from "./WComponentMoveConflicts.js";
const map_state = (state) => ({
  nested_knowledge_view_ids_map: state.derived.nested_knowledge_view_ids.map,
  knowledge_views_by_id: state.specialised_objects.knowledge_views_by_id,
  wcomponents_by_id: state.specialised_objects.wcomponents_by_id,
  chosen_base_id: state.user_info.chosen_base_id
});
const connector = connect(map_state);
function _KnowledgeViewChangeBase(props) {
  const {knowledge_view, nested_knowledge_view_ids_map, knowledge_views_by_id, wcomponents_by_id, chosen_base_id} = props;
  const [wcomponents_move_conflicts, set_wcomponents_move_conflicts] = useState(void 0);
  const [ids_to_move, set_ids_to_move] = useState(void 0);
  const [base_id_to_move_to, set_base_id_to_move_to] = useState(void 0);
  const [result, set_result] = useState(void 0);
  if (chosen_base_id === void 0)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Change base of knowledge view"), "Need to select a base first");
  if (!wcomponents_move_conflicts || !ids_to_move)
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Change base of knowledge view"), /* @__PURE__ */ h(Button, {
      value: "Check if safe to move",
      onClick: () => {
        const {ids_to_move: ids_to_move2, wcomponents_move_conflicts: wcomponents_move_conflicts2} = calc_ids_to_move_and_conflicts({
          knowledge_view,
          nested_knowledge_view_ids_map,
          knowledge_views_by_id,
          wcomponents_by_id
        });
        set_wcomponents_move_conflicts(wcomponents_move_conflicts2);
        set_ids_to_move(ids_to_move2);
      }
    }));
  const wcomponent_conflict_number = Object.keys(wcomponents_move_conflicts).length;
  const ids_to_move_without_conflict = ids_to_move.filter((id) => !wcomponents_move_conflicts[id]);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Change base of knowledge view"), wcomponent_conflict_number > 0 && /* @__PURE__ */ h("p", null, "There are other knowledge views which are not nested under this knowledge view and that contain ", /* @__PURE__ */ h("span", {
    style: {color: "darkred"}
  }, wcomponent_conflict_number, " non-deleted, and therefore conflicting, component"), " entries.  These entries can be moved to the new base or left assigned to this base.  All the knowledge views will be moved regardless, even if their corresponding component remains in a different base."), wcomponent_conflict_number > 0 && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("i", null, /* @__PURE__ */ h("b", null, wcomponent_conflict_number, " component(s) in other knowledge views:")), /* @__PURE__ */ h(WComponentMoveConflicts, {
    wcomponents_move_conflicts
  })), wcomponent_conflict_number === 0 && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("i", null, /* @__PURE__ */ h("b", null, "Safe to move!")), "   All of the knowledge views and components in and nested under this knowledge view are contained in this knowledge view.  None of them are present in any other knowledge views that are not nested under this knowledge view."), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("i", null, /* @__PURE__ */ h("b", null, "Step 2 of 3: Select base to move to")), /* @__PURE__ */ h(SelectBaseToMoveTo, {
    base_id_to_move_to,
    on_change: (new_base_id_to_move_to) => set_base_id_to_move_to(new_base_id_to_move_to)
  })), base_id_to_move_to !== void 0 && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ConfirmatoryButton, {
    disabled: ids_to_move.length === 0,
    button_text: `Move all ${ids_to_move.length} to new base (including conflicted)`,
    on_click: () => {
      move_ids_to_new_base(ids_to_move, chosen_base_id, base_id_to_move_to, set_result);
    }
  }), /* @__PURE__ */ h(ConfirmatoryButton, {
    disabled: ids_to_move_without_conflict.length === 0,
    button_text: `Move ${ids_to_move_without_conflict.length} (no conflicts) to new base`,
    on_click: () => {
      move_ids_to_new_base(ids_to_move_without_conflict, chosen_base_id, base_id_to_move_to, set_result);
    }
  })), result && /* @__PURE__ */ h("p", null, result.error && /* @__PURE__ */ h("div", {
    style: {backgroundColor: "pink"}
  }, "Got error whilst trying to change base id of components ", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("pre", null, JSON.stringify(result.error, null, 2))), result.data && /* @__PURE__ */ h("div", {
    style: {backgroundColor: "lightgreen"}
  }, "Successfully changed base id of ", result.data, " components & knowledge views.  Reloading page in ", RELOAD_PAGE_DELAY_IN_SECONDS, " seconds")));
}
export const KnowledgeViewChangeBase = connector(_KnowledgeViewChangeBase);
const RELOAD_PAGE_DELAY_IN_SECONDS = 2;
async function move_ids_to_new_base(ids, from_base_id, base_id_to_move_to, set_result) {
  const supabase = get_supabase();
  const result = await supabase.rpc("move_ids_to_new_base", {ids, from_base_id, to_base_id: base_id_to_move_to});
  set_result(result);
  if (!result.error)
    setTimeout(() => document.location.reload(), RELOAD_PAGE_DELAY_IN_SECONDS * 1e3);
}
