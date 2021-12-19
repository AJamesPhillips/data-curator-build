import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {wcomponent_statev2_subtype_options} from "../wcomponent_form/type_options.js";
import {TableDisplayMultiDimensionalData} from "./TableDisplayMultiDimensionalData.js";
export function MultidimensionalDataForm(props) {
  const [title, set_title] = useState("");
  const [date, set_date] = useState(void 0);
  const [data_type, set_data_type] = useState("number");
  const [parsed_data, set_parsed_data] = useState([]);
  return /* @__PURE__ */ h("div", null, "Title ", /* @__PURE__ */ h("input", {
    type: "text",
    value: title,
    style: {width: 250},
    onChange: (e) => set_title(e.currentTarget.value)
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Type   ", /* @__PURE__ */ h(AutocompleteText, {
    force_editable: true,
    selected_option_id: data_type,
    options: wcomponent_statev2_subtype_options,
    allow_none: false,
    on_change: (data_type2) => data_type2 && set_data_type(data_type2)
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", {
    style: {display: "inline-flex"}
  }, "Date (Optional)   ", /* @__PURE__ */ h("input", {
    type: "date",
    value: date?.toISOString(),
    onChange: (e) => {
      set_date(e.currentTarget.valueAsDate || void 0);
    }
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Input ", /* @__PURE__ */ h("textarea", {
    value: "",
    rows: 1,
    onChange: (e) => {
      const value = e.currentTarget.value;
      set_parsed_data(value.split("\n").map((row) => row.split("	")));
    }
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("input", {
    type: "button",
    value: "Add",
    onChange: (e) => {
      const multidimensional_state = {
        id: Math.random().toString(),
        base_id: -1,
        type: "multidimensional_state",
        title,
        description: "",
        created_at: new Date()
      };
      const multidimensional_state_data = {
        id: multidimensional_state.id,
        schema_version: 1,
        author_id: "abc",
        data_type,
        schema_description: "",
        schema: {dimensions: []},
        dimension_data: {},
        data: []
      };
      props.add_multidimensional_state(multidimensional_state);
      props.add_multidimensional_state_data(multidimensional_state_data);
    }
  }), /* @__PURE__ */ h("br", null), "Parsed value:", /* @__PURE__ */ h(TableDisplayMultiDimensionalData, {
    data: parsed_data
  }));
}
