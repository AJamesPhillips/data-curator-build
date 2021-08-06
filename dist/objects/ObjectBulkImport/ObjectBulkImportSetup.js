import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {LinkButton} from "../../sharedf/Link.js";
import {remove_index} from "../../utils/list.js";
import {ObjectBulkImportModel} from "./ObjectBulkImportModel.js";
const airtable_data_sync_settings_key = "airtable_data_sync_settings";
export function ObjectBulkImportSetup() {
  const _settings = get_bulk_import_settings();
  const [settings, _set_settings] = useState(_settings);
  const {auth_key, app, models} = settings;
  function set_settings(new_settings) {
    _set_settings({...settings, ...new_settings});
    save_bulk_import_settings({...settings, ...new_settings});
  }
  function factory_model_change_handlers(index) {
    const on_change = (field) => (value) => {
      const new_models = [...models];
      new_models[index] = {
        ...new_models[index],
        [field]: value
      };
      set_settings({models: new_models});
    };
    return on_change;
  }
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("b", null, "Object Bulk Import"), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h("b", null, "Setup AirTable bulk data import"), /* @__PURE__ */ h("br", null), "All of these fields will be stored securely and only accessible on this page.", /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "AirTable auth key:", /* @__PURE__ */ h("input", {
    type: "password",
    value: auth_key,
    onChange: (e) => set_settings({auth_key: e.currentTarget.value})
  }), /* @__PURE__ */ h("br", null), "AirTable app:", /* @__PURE__ */ h("input", {
    type: "text",
    value: app,
    onChange: (e) => set_settings({app: e.currentTarget.value})
  }), /* @__PURE__ */ h("hr", null), "Models (", models.length, ")", models.map((model, index) => /* @__PURE__ */ h(ObjectBulkImportModel, {
    ...model,
    on_change: factory_model_change_handlers(index),
    delete: () => set_settings({models: remove_index(models, index)})
  })), " ", /* @__PURE__ */ h("input", {
    type: "button",
    value: "Add model",
    onClick: () => set_settings({models: [...models, new_model()]})
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null), /* @__PURE__ */ h(LinkButton, {
    route: "objects",
    sub_route: "objects_bulk_import",
    item_id: void 0,
    args: void 0,
    name: "Finished setup"
  }));
}
function new_model() {
  return {name: "", table_id: "", view_id: "", pattern_id: ""};
}
function save_bulk_import_settings(args) {
  localStorage.setItem(airtable_data_sync_settings_key, JSON.stringify(args));
}
export function get_bulk_import_settings() {
  const airtable_data_sync_settings = localStorage.getItem(airtable_data_sync_settings_key) || "{}";
  const {
    auth_key = "",
    app = "",
    models = []
  } = JSON.parse(airtable_data_sync_settings);
  return {
    auth_key,
    app,
    models
  };
}
