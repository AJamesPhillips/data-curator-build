import {h} from "../../snowpack/pkg/preact.js";
import {
  connection_line_behaviours
} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {sentence_case} from "../shared/utils/sentence_case.js";
export function WComponentConnectionForm(props) {
  const {
    wcomponent,
    editing,
    upsert_wcomponent
  } = props;
  const {line_behaviour: orig_line_behaviour} = wcomponent;
  return /* @__PURE__ */ h("div", null, editing && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Line style behaviour"), "  ", /* @__PURE__ */ h(AutocompleteText, {
    selected_option_id: orig_line_behaviour,
    allow_none: true,
    options,
    on_change: (new_line_behaviour) => {
      upsert_wcomponent({line_behaviour: new_line_behaviour});
    }
  })));
}
const options = connection_line_behaviours.map((id) => ({id, title: sentence_case(id)}));
