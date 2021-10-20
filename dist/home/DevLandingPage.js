import {h} from "../../snowpack/pkg/preact.js";
import {Container} from "../../snowpack/pkg/@material-ui/core.js";
export function DevLandingPage() {
  return /* @__PURE__ */ h(Container, {
    maxWidth: "md"
  }, /* @__PURE__ */ h("ul", null, /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/app/"
  }, "app")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/project_dashboard"
  }, "Project dashboard")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/prob_graph"
  }, "Probability graph")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/prob_badge"
  }, "Probability badge")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/statement_probability"
  }, "Statement probability")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/statement_probability_explorer"
  }, "Statement probability explorer")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/sandbox/editable_custom_datetime"
  }, "Sandbox - EditableCustomDateTime")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/sandbox/canvas_nodes"
  }, "Sandbox - WComponentNode")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/sandbox/supabase"
  }, "Sandbox - Supabase")), /* @__PURE__ */ h("li", null, /* @__PURE__ */ h("a", {
    href: "/sandbox"
  }, "Sandbox"))));
}
