import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Button} from "../sharedf/Button.js";
import {ACTIONS} from "../state/actions.js";
import {
  get_current_knowledge_view_from_state
} from "../state/specialised_objects/accessors.js";
import {ButtonSnapXToDatetime} from "./ButtonSnapXToDatetime.js";
const map_state = (state) => {
  const knowledge_view_id = get_current_knowledge_view_from_state(state)?.id;
  return {
    knowledge_view_id
  };
};
const map_dispatch = {
  snap_to_grid_knowledge_view_entries: ACTIONS.specialised_object.snap_to_grid_knowledge_view_entries
};
const connector = connect(map_state, map_dispatch);
function _AlignComponentForm(props) {
  const {wcomponent_id, wcomponent_ids, knowledge_view_id} = props;
  const ids = (wcomponent_id ? [wcomponent_id] : wcomponent_ids) || [];
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "Align"), /* @__PURE__ */ h(Button, {
    disabled: !knowledge_view_id,
    value: "Snap to grid",
    onClick: () => {
      if (!knowledge_view_id)
        return;
      props.snap_to_grid_knowledge_view_entries({wcomponent_ids: ids, knowledge_view_id});
    },
    is_left: true
  }), " ", /* @__PURE__ */ h(ButtonSnapXToDatetime, {
    ...props
  }));
}
export const AlignComponentForm = connector(_AlignComponentForm);
