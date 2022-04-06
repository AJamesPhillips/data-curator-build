import {Box, FormControl, FormLabel, Slider} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {MoveToWComponentButton} from "../../canvas/MoveToWComponentButton.js";
import {grid_small_step, h_step, v_step} from "../../canvas/position_utils.js";
import {ConfirmatoryDeleteButton} from "../../form/ConfirmatoryDeleteButton.js";
import {SelectKnowledgeView} from "../../knowledge_view/SelectKnowledgeView.js";
import {Button} from "../../sharedf/Button.js";
import {ColorPicker} from "../../sharedf/ColorPicker.js";
import {ACTIONS} from "../../state/actions.js";
import {get_middle_of_screen} from "../../state/display_options/display.js";
import {
  get_current_knowledge_view_from_state,
  get_current_composed_knowledge_view_from_state
} from "../../state/specialised_objects/accessors.js";
import {ExploreButtonHandle} from "../../wcomponent_canvas/node/ExploreButtonHandle.js";
import {WComponentBackReferences} from "../../wcomponent_ui/WComponentBackReferences.js";
import {AlignComponentForm} from "../AlignComponentForm.js";
import {default_frame_color} from "./default_frame_color.js";
import {WComponentPresenceInOtherKVs} from "./WComponentPresenceInOtherKVs.js";
const map_state = (state, own_props) => {
  const {wcomponent_id} = own_props;
  const current_knowledge_view = get_current_knowledge_view_from_state(state);
  const knowledge_view_entry = current_knowledge_view && current_knowledge_view.wc_id_map[wcomponent_id];
  const current_composed_knowledge_view = get_current_composed_knowledge_view_from_state(state);
  const composed_knowledge_view_entry = current_composed_knowledge_view && current_composed_knowledge_view.composed_wc_id_map[wcomponent_id];
  const middle_position = get_middle_of_screen(state);
  return {
    knowledge_view_id: current_knowledge_view && current_knowledge_view.id,
    knowledge_view_title: current_knowledge_view && current_knowledge_view.title,
    composed_knowledge_view_entry,
    knowledge_view_entry,
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
    knowledge_view_id,
    knowledge_view_title,
    composed_knowledge_view_entry,
    knowledge_view_entry,
    editing
  } = props;
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
  const not_present = !knowledge_view_entry || knowledge_view_entry.blocked || knowledge_view_entry.passthrough;
  const can_delete_frame = knowledge_view_entry?.frame_width !== void 0 && knowledge_view_entry?.frame_height !== void 0;
  return /* @__PURE__ */ h("div", null, editing && knowledge_view_id && knowledge_view_entry && !knowledge_view_entry.blocked && /* @__PURE__ */ h(FormControl, {
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
  })), editing && knowledge_view_id && knowledge_view_entry && !knowledge_view_entry.blocked && /* @__PURE__ */ h(FormControl, {
    component: "fieldset",
    fullWidth: true,
    margin: "normal"
  }, /* @__PURE__ */ h(FormLabel, {
    component: "legend"
  }, "Frame"), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(Button, {
    value: can_delete_frame ? "Remove Frame" : "Add Frame",
    onClick: () => {
      const args = {};
      if (can_delete_frame) {
        args.frame_color = void 0;
        args.frame_width = void 0;
        args.frame_height = void 0;
      } else {
        args.frame_color = args.frame_color ?? default_frame_color;
        args.frame_width = args.frame_width ?? (h_step + grid_small_step) * 2;
        args.frame_height = args.frame_height ?? (v_step + grid_small_step) * 2;
      }
      upsert_entry(knowledge_view_id, args);
    }
  })), /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Frame Color"), /* @__PURE__ */ h(ColorPicker, {
    color: knowledge_view_entry.frame_color,
    conditional_on_blur: (frame_color) => {
      upsert_entry(knowledge_view_id, {frame_color});
    }
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
  }))), knowledge_view_id && not_present && /* @__PURE__ */ h("div", null, (knowledge_view_entry?.blocked ? "Deleted from" : "Not present in") + " this knowledge view", composed_knowledge_view_entry && !composed_knowledge_view_entry.blocked && " but is present in a foundational knowledge view", /* @__PURE__ */ h("br", null), editing && /* @__PURE__ */ h(Button, {
    value: (knowledge_view_entry?.blocked ? "Re-add" : "Add") + " to current knowledge view",
    extra_class_names: "left",
    onClick: () => upsert_entry(knowledge_view_id, {blocked: void 0, passthrough: void 0})
  })), editing && knowledge_view_entry && !knowledge_view_entry.passthrough && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete from knowledge view",
    tooltip_text: "Delete from current knowledge view (" + knowledge_view_title + ")",
    on_delete: () => {
      props.bulk_remove_from_knowledge_view({
        wcomponent_ids: [wcomponent_id],
        remove_type: "passthrough"
      });
    }
  })), editing && knowledge_view_entry && !knowledge_view_entry.blocked && !knowledge_view_entry.passthrough && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h(ConfirmatoryDeleteButton, {
    button_text: "Delete and Block from knowledge view",
    tooltip_text: "Delete and Block from showing in current knowledge view (" + knowledge_view_title + ")",
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
      upsert_entry(knowledge_view_id2, {blocked: void 0, passthrough: void 0});
    }
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentPresenceInOtherKVs, {
    wcomponent_id
  })), /* @__PURE__ */ h("p", null, /* @__PURE__ */ h(WComponentBackReferences, {
    wcomponent_id
  })));
}
export const WComponentKnowledgeViewForm = connector(_WComponentKnowledgeViewForm);
