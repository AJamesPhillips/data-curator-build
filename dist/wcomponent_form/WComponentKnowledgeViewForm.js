import {Box, FormControl, FormLabel, Slider} from "../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MoveToWComponentButton} from "../canvas/MoveToWComponentButton.js";
import {ConfirmatoryDeleteButton} from "../form/ConfirmatoryDeleteButton.js";
import {SelectKnowledgeView} from "../knowledge_view/SelectKnowledgeView.js";
import {Button} from "../sharedf/Button.js";
import {Link} from "../sharedf/Link.js";
import {ACTIONS} from "../state/actions.js";
import {get_middle_of_screen, lefttop_to_xy} from "../state/display_options/display.js";
import {
  get_current_knowledge_view_from_state,
  get_current_composed_knowledge_view_from_state,
  get_wcomponent_from_state
} from "../state/specialised_objects/accessors.js";
import {ExploreButtonHandle} from "../wcomponent_canvas/node/ExploreButtonHandle.js";
import {WComponentBackReferences} from "../wcomponent_ui/WComponentBackReferences.js";
import {AlignComponentForm} from "./AlignComponentForm.js";
const map_state = (state, own_props) => {
  const {wcomponent_id} = own_props;
  const current_knowledge_view = get_current_knowledge_view_from_state(state);
  const knowledge_view_entry = current_knowledge_view && current_knowledge_view.wc_id_map[wcomponent_id];
  const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  const composed_knowledge_view_entry = current_composed_knowledge_view && current_composed_knowledge_view.composed_wc_id_map[wcomponent_id];
  const all_knowledge_views = state.derived.knowledge_views;
  const middle_position = get_middle_of_screen(state);
  return {
    wcomponent: get_wcomponent_from_state(state, wcomponent_id),
    knowledge_view_id: current_knowledge_view && current_knowledge_view.id,
    knowledge_view_title: current_knowledge_view && current_knowledge_view.title,
    composed_knowledge_view_entry,
    knowledge_view_entry,
    all_knowledge_views,
    editing: !state.display_options.consumption_formatting,
    middle_position_left: middle_position.left,
    middle_position_top: middle_position.top
  };
};
const map_dispatch = {
  upsert_knowledge_view_entry: ACTIONS.specialised_object.upsert_knowledge_view_entry,
  bulk_remove_from_knowledge_view: ACTIONS.specialised_object.bulk_remove_from_knowledge_view
};
const connector = connect(map_state, map_dispatch);
function _WComponentKnowledgeViewForm(props) {
  const {
    wcomponent_id,
    wcomponent,
    knowledge_view_id,
    knowledge_view_title,
    composed_knowledge_view_entry,
    knowledge_view_entry,
    all_knowledge_views,
    editing
  } = props;
  if (!wcomponent)
    return /* @__PURE__ */ h("div", null, "Component of ID: ", wcomponent_id, " does not exist");
  const other_knowledge_views = all_knowledge_views.filter(({id}) => id !== knowledge_view_id).filter(({wc_id_map}) => wc_id_map[wcomponent_id] && !wc_id_map[wcomponent_id]?.deleted);
  function upsert_entry(knowledge_view_id2, new_entry_partial = {}) {
    const new_entry = {
      ...composed_knowledge_view_entry || {left: props.middle_position_left, top: props.middle_position_top},
      ...new_entry_partial
    };
    props.upsert_knowledge_view_entry({
      wcomponent_id,
      knowledge_view_id: knowledge_view_id2,
      entry: new_entry
    });
  }
  return /* @__PURE__ */ h("div", null, editing && knowledge_view_id && knowledge_view_entry && !knowledge_view_entry.deleted && /* @__PURE__ */ h(FormControl, {
    component: "fieldset",
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(FormLabel, {
    component: "legend"
  }, "Size"), /* @__PURE__ */ h(Slider, {
    color: "secondary",
    defaultValue: 1,
    marks: true,
    min: 0.25,
    max: 2,
    onChange: (e, val) => {
      const size = Array.isArray(val) ? val[0] : val;
      upsert_entry(knowledge_view_id, {s: size});
    },
    step: 0.25,
    value: knowledge_view_entry.s ? knowledge_view_entry.s : 1,
    valueLabelDisplay: "on"
  })), editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(AlignComponentForm, {
    wcomponent_id
  }), /* @__PURE__ */ h("br", null)), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, /* @__PURE__ */ h(MoveToWComponentButton, {
    wcomponent_id,
    disable_if_not_present: true
  }), /* @__PURE__ */ h(Box, {
    zIndex: 10,
    m: 4,
    class: "node_handle"
  }, /* @__PURE__ */ h(ExploreButtonHandle, {
    wcomponent_id,
    wcomponent_current_kv_entry: composed_knowledge_view_entry,
    is_highlighted: true
  }))), knowledge_view_id && (!knowledge_view_entry || knowledge_view_entry.deleted) && /* @__PURE__ */ h("div", null, (knowledge_view_entry?.deleted ? "Deleted from" : "Not present in") + " this knowledge view", composed_knowledge_view_entry && !composed_knowledge_view_entry.deleted && " but is present in a foundational knowledge view", /* @__PURE__ */ h("br", null), editing && /* @__PURE__ */ h(Button, {
    value: (knowledge_view_entry?.deleted ? "Re-add" : "Add") + " to current knowledge view",
    extra_class_names: "left",
    onClick: () => upsert_entry(knowledge_view_id, {deleted: void 0})
  })), editing && knowledge_view_entry && !knowledge_view_entry.deleted && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Remove from knowledge view (block)",
    tooltip_text: "Remove from current knowledge view (" + knowledge_view_title + ")",
    on_delete: () => {
      props.bulk_remove_from_knowledge_view({
        wcomponent_ids: [wcomponent_id],
        remove_type: "block"
      });
    }
  })), editing && /* @__PURE__ */ h("p", null, "Add to knowledge view", /* @__PURE__ */ h(SelectKnowledgeView, {
    on_change: (knowledge_view_id2) => {
      if (!knowledge_view_id2)
        return;
      upsert_entry(knowledge_view_id2);
    }
  })), other_knowledge_views.length > 0 && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), "Also in:", other_knowledge_views.map((kv) => {
    const entry = kv.wc_id_map[wcomponent_id];
    const pos = lefttop_to_xy(entry, true);
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(Link, {
      route: void 0,
      sub_route: void 0,
      item_id: void 0,
      args: {subview_id: kv.id, ...pos}
    }, kv.title));
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentBackReferences, {
    wcomponent_id
  })));
}
export const WComponentKnowledgeViewForm = connector(_WComponentKnowledgeViewForm);
