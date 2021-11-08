import {h} from "../../snowpack/pkg/preact.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
import {connect} from "../../snowpack/pkg/react-redux.js";
import {MultiAutocompleteText} from "../form/Autocomplete/MultiAutocompleteText.js";
import {EditableCheckbox} from "../form/EditableCheckbox.js";
import {LabelsEditor} from "../labels/LabelsEditor.js";
import {ACTIONS} from "../state/actions.js";
import {wcomponent_type_to_text} from "../wcomponent_derived/wcomponent_type_to_text.js";
const map_state = (state) => {
  const {
    wc_label_ids,
    wc_types
  } = state.derived.current_composed_knowledge_view?.available_filter_options || {};
  return {
    wc_label_ids,
    wc_types,
    apply_filter: state.filter_context.apply_filter,
    filters: state.filter_context.filters
  };
};
const map_dispatch = {
  set_apply_filter: ACTIONS.filter_context.set_apply_filter,
  set_filters: ACTIONS.filter_context.set_filters
};
const connector = connect(map_state, map_dispatch);
function _FiltersSidePanel(props) {
  const {wc_label_ids, wc_types} = props;
  const wcomponent_type_options = useMemo(() => {
    return (wc_types || []).map((type) => ({id: type, title: wcomponent_type_to_text(type)}));
  }, [wc_types]);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "Filters"), /* @__PURE__ */ h("p", null, "Enabled: ", /* @__PURE__ */ h(EditableCheckbox, {
    value: props.apply_filter,
    on_change: () => props.set_apply_filter(!props.apply_filter)
  })), /* @__PURE__ */ h("p", null, "Exclude by label:", /* @__PURE__ */ h(LabelsEditor, {
    allowed_label_ids: wc_label_ids,
    label_ids: props.filters.exclude_by_label_ids,
    on_change: (exclude_by_label_ids) => {
      props.set_filters({filters: {...props.filters, exclude_by_label_ids}});
    },
    force_editable: true
  })), /* @__PURE__ */ h("p", null, "Filter (include) by label:", /* @__PURE__ */ h(LabelsEditor, {
    allowed_label_ids: wc_label_ids,
    label_ids: props.filters.include_by_label_ids,
    on_change: (include_by_label_ids) => {
      props.set_filters({filters: {...props.filters, include_by_label_ids}});
    },
    force_editable: true
  })), /* @__PURE__ */ h("p", null, "Exclude by component type:", /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "",
    selected_option_ids: props.filters.exclude_by_component_types,
    options: wcomponent_type_options,
    allow_none: true,
    on_change: (exclude_by_component_types) => {
      props.set_filters({filters: {...props.filters, exclude_by_component_types}});
    },
    force_editable: true
  })), /* @__PURE__ */ h("p", null, "Filter (include) by component type:", /* @__PURE__ */ h(MultiAutocompleteText, {
    placeholder: "",
    selected_option_ids: props.filters.include_by_component_types,
    options: wcomponent_type_options,
    allow_none: true,
    on_change: (include_by_component_types) => {
      props.set_filters({filters: {...props.filters, include_by_component_types}});
    },
    force_editable: true
  })));
}
export const FiltersSidePanel = connector(_FiltersSidePanel);
