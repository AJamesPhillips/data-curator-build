import Accordion from "../../snowpack/pkg/@material-ui/core/Accordion.js";
import AccordionDetails from "../../snowpack/pkg/@material-ui/core/AccordionDetails.js";
import AccordionSummary from "../../snowpack/pkg/@material-ui/core/AccordionSummary.js";
import Box from "../../snowpack/pkg/@material-ui/core/Box.js";
import Button from "../../snowpack/pkg/@material-ui/core/Button.js";
import yellow from "../../snowpack/pkg/@material-ui/core/colors/yellow.js";
import FormControl from "../../snowpack/pkg/@material-ui/core/FormControl.js";
import FormControlLabel from "../../snowpack/pkg/@material-ui/core/FormControlLabel.js";
import FormLabel from "../../snowpack/pkg/@material-ui/core/FormLabel.js";
import Radio from "../../snowpack/pkg/@material-ui/core/Radio.js";
import RadioGroup from "../../snowpack/pkg/@material-ui/core/RadioGroup.js";
import Typography from "../../snowpack/pkg/@material-ui/core/Typography.js";
import ExpandMoreIcon from "../../snowpack/pkg/@material-ui/icons/ExpandMore.js";
import RefreshIcon from "../../snowpack/pkg/@material-ui/icons/Refresh.js";
import WarningIcon from "../../snowpack/pkg/@material-ui/icons/Warning.js";
import {h} from "../../snowpack/pkg/preact.js";
import {useState} from "../../snowpack/pkg/preact/hooks.js";
import {AutocompleteText} from "../form/Autocomplete/AutocompleteText.js";
import {Modal} from "../modal/Modal.js";
export function SearchWindow(props) {
  const [search_fields, set_search_fields] = useState("all");
  const [search_type, set_search_type] = useState("best");
  const [search_type_used, set_search_type_used] = useState(void 0);
  const [is_accordion_open, set_is_accordion_open] = useState(false);
  const warning_icon_basic_search = /* @__PURE__ */ h(WarningIcon, {
    titleAccess: "You might be getting sub optimal search results!",
    style: {color: yellow[600]}
  });
  const is_default_search = () => search_type == "best" && search_fields == "all";
  return /* @__PURE__ */ h(Modal, {
    on_close: () => props.on_blur && props.on_blur(),
    title: props.search_window_title,
    child: /* @__PURE__ */ h(Box, {
      p: 5
    }, /* @__PURE__ */ h(Accordion, {
      onChange: (e, expanded) => {
        set_is_accordion_open(expanded);
      }
    }, /* @__PURE__ */ h(AccordionSummary, {
      expandIcon: !is_default_search() && !is_accordion_open ? warning_icon_basic_search : /* @__PURE__ */ h(ExpandMoreIcon, null)
    }, /* @__PURE__ */ h(Typography, {
      component: "h2"
    }, is_accordion_open ? "Hide " : "Show ", "Advanced Search Options")), /* @__PURE__ */ h(AccordionDetails, null, /* @__PURE__ */ h(Box, {
      width: 1
    }, /* @__PURE__ */ h(Box, {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "stretch"
    }, /* @__PURE__ */ h(Box, {
      mr: 10,
      flexGrow: 1,
      flexShrink: 0
    }, /* @__PURE__ */ h(FormControl, {
      component: "fieldset",
      fullWidth: true
    }, /* @__PURE__ */ h(FormLabel, {
      component: "legend"
    }, "Search Type: "), /* @__PURE__ */ h(RadioGroup, {
      name: "search_type",
      value: search_type,
      onChange: (e) => set_search_type(e.target.value)
    }, /* @__PURE__ */ h(FormControlLabel, {
      value: "exact",
      control: /* @__PURE__ */ h(Radio, null),
      label: "Exact"
    }), /* @__PURE__ */ h(FormControlLabel, {
      value: "fuzzy",
      control: /* @__PURE__ */ h(Radio, null),
      label: "Fuzzy"
    }), /* @__PURE__ */ h(FormControlLabel, {
      value: "best",
      control: /* @__PURE__ */ h(Radio, null),
      label: "Best"
    })))), /* @__PURE__ */ h(Box, {
      mr: 10,
      flexGrow: 1,
      flexShrink: 0
    }, /* @__PURE__ */ h(FormControl, {
      component: "fieldset",
      fullWidth: true
    }, /* @__PURE__ */ h(FormLabel, {
      component: "legend"
    }, "Search Over: "), /* @__PURE__ */ h(RadioGroup, {
      name: "search_fields",
      value: search_fields,
      onChange: (e) => set_search_fields(e.target.value)
    }, /* @__PURE__ */ h(FormControlLabel, {
      value: "all",
      control: /* @__PURE__ */ h(Radio, null),
      label: "All"
    }), /* @__PURE__ */ h(FormControlLabel, {
      value: "title",
      control: /* @__PURE__ */ h(Radio, null),
      label: "Title Only"
    })))), /* @__PURE__ */ h(Box, {
      flexGrow: 1,
      flexShrink: 0,
      alignSelf: "flex-end",
      textAlign: "right"
    }, !is_default_search() && /* @__PURE__ */ h(Button, {
      variant: "contained",
      color: "primary",
      onClick: () => {
        set_search_type("best");
        set_search_fields("all");
      },
      endIcon: /* @__PURE__ */ h(RefreshIcon, null)
    }, "Reset Search Options"))), /* @__PURE__ */ h(Box, {
      style: {opacity: search_type_used ? 0.7 : 0}
    }, "Used: ", search_type_used)))), /* @__PURE__ */ h(AutocompleteText, {
      placeholder: props.placeholder,
      selected_option_id: props.selected_option_id,
      initial_search_term: props.initial_search_term,
      options: props.options,
      allow_none: props.allow_none,
      on_change: (option_id) => {
        props.on_change(option_id);
        props.on_blur && props.on_blur();
      },
      on_mouse_over_option: props.on_mouse_over_option,
      on_mouse_leave_option: props.on_mouse_leave_option,
      extra_styles: props.extra_styles,
      start_expanded: true,
      retain_invalid_search_term_on_blur: true,
      search_fields,
      search_type,
      set_search_type_used,
      force_editable: true,
      threshold_minimum_score: -1e3
    }))
  });
}
