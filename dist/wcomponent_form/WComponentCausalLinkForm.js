import {h} from "../../snowpack/pkg/preact.js";
import {EditableNumber} from "../form/EditableNumber.js";
import {VAPsType} from "../wcomponent/interfaces/VAPsType.js";
import {wcomponent_is_statev2} from "../wcomponent/interfaces/SpecialisedObjects.js";
import {get_wcomponent_VAPs_represent} from "../wcomponent/get_wcomponent_VAPs_represent.js";
import {Button} from "../sharedf/Button.js";
export function WComponentCausalLinkForm(props) {
  const {
    wcomponent,
    from_wcomponent,
    editing,
    upsert_wcomponent
  } = props;
  const from_statev2 = wcomponent_is_statev2(from_wcomponent);
  const VAPs_represent_number = get_wcomponent_VAPs_represent(from_wcomponent) === VAPsType.number;
  const show_primary_effect = editing || wcomponent.effect_when_true !== void 0;
  const show_effect_when_false = !VAPs_represent_number && editing ? from_wcomponent === void 0 || from_statev2 : from_statev2 && wcomponent.effect_when_false !== void 0;
  return /* @__PURE__ */ h(BasicCausalLinkForm, {
    show_primary_effect,
    show_effect_when_false,
    VAPs_represent_number,
    effect_when_true: wcomponent.effect_when_true,
    effect_when_false: wcomponent.effect_when_false,
    editing,
    change_effect: upsert_wcomponent
  });
}
export function BasicCausalLinkForm(props) {
  const {
    show_primary_effect,
    show_effect_when_false,
    VAPs_represent_number,
    effect_when_true,
    effect_when_false,
    editing,
    change_effect
  } = props;
  const primary_effect_description = VAPs_represent_number ? "Effect" : "Effect when true";
  return /* @__PURE__ */ h("p", {
    style: {display: "flex", flex: "1"}
  }, show_primary_effect && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, primary_effect_description), "   ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "...",
    value: effect_when_true,
    allow_undefined: true,
    conditional_on_blur: (effect_when_true2) => change_effect({effect_when_true: effect_when_true2, effect_when_false})
  })), show_effect_when_false && /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Effect when false"), "   ", /* @__PURE__ */ h(EditableNumber, {
    placeholder: "...",
    value: effect_when_false,
    allow_undefined: true,
    conditional_on_blur: (effect_when_false2) => change_effect({effect_when_false: effect_when_false2, effect_when_true})
  })), show_effect_when_false && /* @__PURE__ */ h("div", {
    style: {flexGrow: 2, margin: "auto"}
  }, /* @__PURE__ */ h(Button, {
    value: "Invert",
    disabled: !editing,
    onClick: () => {
      change_effect({
        effect_when_true: effect_when_false,
        effect_when_false: effect_when_true
      });
    }
  })));
}
