import {h} from "../../../snowpack/pkg/preact.js";
import {EditableNumber} from "../../form/EditableNumber.js";
import {VAPsType} from "../../shared/wcomponent/interfaces/generic_value.js";
import {wcomponent_is_statev2} from "../../shared/wcomponent/interfaces/SpecialisedObjects.js";
import {wcomponent_VAPs_represent} from "../../shared/wcomponent/value_and_prediction/utils.js";
export function WComponentCausalLinkForm(props) {
  const {
    wcomponent,
    from_wcomponent,
    editing,
    upsert_wcomponent
  } = props;
  const from_statev2 = wcomponent_is_statev2(from_wcomponent);
  const VAPs_represent_number = wcomponent_VAPs_represent(from_wcomponent) === VAPsType.number;
  const show_primary_effect = editing || wcomponent.effect_when_true !== void 0;
  const primary_effect_description = VAPs_represent_number ? "Effect" : "Effect when true";
  const show_effect_when_false = !VAPs_represent_number && editing ? from_wcomponent === void 0 || from_statev2 : from_statev2 && wcomponent.effect_when_false !== void 0;
  return /* @__PURE__ */ h("div", null, show_primary_effect && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, primary_effect_description), "   ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "...",
    value: wcomponent.effect_when_true,
    allow_undefined: true,
    conditional_on_blur: (effect_when_true) => upsert_wcomponent({effect_when_true})
  })), show_effect_when_false && /* @__PURE__ */ h("p", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Effect when false"), "   ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "...",
    value: wcomponent.effect_when_false,
    allow_undefined: true,
    conditional_on_blur: (effect_when_false) => upsert_wcomponent({effect_when_false})
  })));
}
