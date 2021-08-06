import {h} from "../../snowpack/pkg/preact.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {Canvas} from "../canvas/Canvas.js";
import {MainArea} from "../layout/MainArea.js";
import {get_current_composed_knowledge_view_from_state} from "../state/specialised_objects/accessors.js";
const map_state = (state) => {
  const kv = get_current_composed_knowledge_view_from_state(state);
  const prioritisations = kv?.prioritisations || [];
  return {
    prioritisations
  };
};
const connector = connect(map_state);
const get_svg_children = (props) => {
  return [];
};
const get_children = (props) => {
  const elements = /* @__PURE__ */ h("div", null);
  return elements;
};
function _PrioritiesView(props) {
  const elements = get_children(props);
  return /* @__PURE__ */ h(MainArea, {
    main_content: /* @__PURE__ */ h(Canvas, {
      svg_children: get_svg_children(props),
      svg_upper_children: []
    }, elements)
  });
}
export const PrioritiesView = connector(_PrioritiesView);
