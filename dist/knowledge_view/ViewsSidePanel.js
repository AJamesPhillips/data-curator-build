import {h} from "../../_snowpack/pkg/preact.js";
import {TopLevelKnowledgeViewListsSet} from "./TopLevelKnowledgeViewListsSet.js";
import {Box} from "../../_snowpack/pkg/@material-ui/core.js";
import {KnowledgeViewForm} from "./KnowledgeViewForm.js";
export function ViewsSidePanel(props) {
  return /* @__PURE__ */ h(Box, {
    p: 1,
    pt: 5,
    class: "views_side_panel"
  }, /* @__PURE__ */ h(KnowledgeViewForm, null), /* @__PURE__ */ h(TopLevelKnowledgeViewListsSet, null));
}
