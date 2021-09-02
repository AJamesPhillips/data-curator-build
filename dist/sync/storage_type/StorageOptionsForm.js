import {h} from "../../../snowpack/pkg/preact.js";
import {useState} from "../../../snowpack/pkg/preact/hooks.js";
import {ButtonGroup} from "../../../snowpack/pkg/@material-ui/core.js";
import "../common.css.proxy.js";
import "./StorageOptionsForm.css.proxy.js";
import {CONTACT_EMAIL_ADDRESS_TAG} from "../../constants.js";
import {ConfirmatoryButton} from "../../form/ConfirmatoryButton.js";
import {WarningTriangle} from "../../sharedf/WarningTriangle.js";
import {get_storage_type_name} from "./get_storage_type_name.js";
import {StorageOption} from "./StorageOption.js";
import {Button} from "../../sharedf/Button.js";
import {change_storage_type} from "../../state/sync/utils/change_storage_type.js";
export function StorageOptionsForm(props) {
  const {storage_type: initial_storage_type} = props;
  const [show_advanced, set_show_advanced] = useState(initial_storage_type === "local_server");
  const [new_storage_type, set_new_storage_type] = useState(initial_storage_type);
  const [copy_data, set_copy_data] = useState(false);
  const copy_from = copy_data && is_initial_storage_type_defined(initial_storage_type) ? initial_storage_type : false;
  const valid_storage_type = new_storage_type !== void 0;
  const changed_storage_type = initial_storage_type !== new_storage_type;
  const changed_storage_type_from_defined = is_initial_storage_type_defined(initial_storage_type) && changed_storage_type;
  const show_warning = changed_storage_type_from_defined && !copy_data;
  const show_danger_warning = changed_storage_type_from_defined && copy_data;
  const show_single_confirm_button = valid_storage_type && !copy_data;
  const show_double_confirm_button = valid_storage_type && copy_data;
  const initial_storage_name = get_storage_type_name(initial_storage_type);
  const new_storage_name = get_storage_type_name(new_storage_type);
  return /* @__PURE__ */ h("div", {
    style: {margin: 10}
  }, /* @__PURE__ */ h(StorageOption, {
    name: get_storage_type_name("local_storage"),
    description: /* @__PURE__ */ h("div", null, "The data is stored in your web browser. It never leaves your web browser. It is not available in other web browsers, or on other computers. If you work in an incognito window your data will be lost. If you clear your cache & cookies your data will be lost. We recommend using this for temporary demos, or if you are going to periodically save it to ", /* @__PURE__ */ h("a", {
      href: "https://solidproject.org/"
    }, "Solid"), ", a local server (advanced options) ", /* @__PURE__ */ h("s", null, "or if you are going to export to a file and reimport it after every use"), " [feature not supported yet]."),
    selected: new_storage_type === "local_storage",
    on_click: () => set_new_storage_type("local_storage")
  }), /* @__PURE__ */ h(StorageOption, {
    name: get_storage_type_name("solid"),
    description: /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("a", {
      href: "https://solidproject.org/"
    }, "Solid"), " is a data storage platform which puts you back in control of your data.  Once you retake ownership of your own data it enables you to use your data with any other application and do useful things; something the big tech companies don't let you do. Sign up for a free account here:   ", /* @__PURE__ */ h("a", {
      href: "https://solidcommunity.net/",
      target: "_blank"
    }, "solidcommunity.net"), "  or here:   ", /* @__PURE__ */ h("a", {
      href: "https://signup.pod.inrupt.com/",
      target: "_blank"
    }, "inrupt.com")),
    selected: new_storage_type === "solid",
    on_click: () => set_new_storage_type("solid")
  }), /* @__PURE__ */ h("div", {
    className: "section advanced_options_title",
    onClick: () => set_show_advanced(!show_advanced)
  }, /* @__PURE__ */ h("span", {
    style: {fontSize: 10}
  }, show_advanced ? "▼" : "▶"), " ", show_advanced ? "Hide" : "Show", " advanced options"), show_advanced && /* @__PURE__ */ h(StorageOption, {
    name: get_storage_type_name("local_server"),
    description: /* @__PURE__ */ h("div", null, "You will need to be running your local Data Curator server at localhost:4000 to use this option successfully. If you choose this option we assume you know what you are doing and have a copy of the code base. If not, please contact ", CONTACT_EMAIL_ADDRESS_TAG),
    selected: new_storage_type === "local_server",
    on_click: () => set_new_storage_type("local_server")
  }), (show_warning || show_danger_warning) && /* @__PURE__ */ h("div", {
    className: `section ${show_warning ? "warning" : "danger"}`
  }, /* @__PURE__ */ h(WarningTriangle, {
    message: "",
    backgroundColor: show_warning ? "" : "red"
  }), "  Swapping to a new data store (", new_storage_name, ") will leave behind your current data (in ", initial_storage_name, "). To copy your current data (", initial_storage_name, ") to the new storage location (", new_storage_name, ") please check this box  ", /* @__PURE__ */ h("input", {
    type: "checkbox",
    checked: copy_data,
    onClick: (e) => {
      e.stopImmediatePropagation();
      set_copy_data(!copy_data);
    }
  }), " ", show_danger_warning && /* @__PURE__ */ h("div", null, "DANGER: you will overwrite the current data in '", new_storage_name, "' with the data in '", initial_storage_name, "'.")), /* @__PURE__ */ h(ButtonGroup, {
    size: "small",
    color: "primary",
    variant: "contained",
    fullWidth: true,
    disableElevation: true
  }, show_single_confirm_button && /* @__PURE__ */ h(Button, {
    value: "Confirm",
    disabled: !changed_storage_type,
    onClick: (e) => {
      e.stopImmediatePropagation();
      new_storage_type && change_storage_type({new_storage_type, copy_from});
      props.on_close();
    }
  }), show_double_confirm_button && /* @__PURE__ */ h(ConfirmatoryButton, {
    button_text: "Confirm",
    disabled: !changed_storage_type,
    on_click: () => {
      new_storage_type && change_storage_type({new_storage_type, copy_from});
      props.on_close();
    }
  }), valid_storage_type && /* @__PURE__ */ h(Button, {
    value: "Cancel",
    onClick: (e) => {
      e.stopImmediatePropagation();
      props.on_close();
    }
  })));
}
function is_initial_storage_type_defined(initial_storage_type) {
  return initial_storage_type !== void 0;
}
