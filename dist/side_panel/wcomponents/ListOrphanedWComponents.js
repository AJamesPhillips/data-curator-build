import {Button, ButtonGroup} from "../../../snowpack/pkg/@material-ui/core.js";
import {h} from "../../../snowpack/pkg/preact.js";
import {connect} from "../../../snowpack/pkg/react-redux.js";
import {ACTIONS} from "../../state/actions.js";
import {useMemo, useState} from "../../../snowpack/pkg/preact/hooks.js";
import {get_store} from "../../state/store.js";
import {RichMarkDown} from "../../sharedf/RichMarkDown.js";
import {SortDirection, sort_list} from "../../shared/utils/sort.js";
const map_state = (state) => ({});
const map_dispatch = {
  change_route: ACTIONS.routing.change_route
};
const connector = connect(map_state, map_dispatch);
function _ListOrphanedWComponents(props) {
  const [orphaned_wcomponents, set_orphaned_wcomponents] = useState([]);
  const find_components = useMemo(() => {
    return () => {
      const store = get_store();
      const state = store.getState();
      const {wcomponents_by_id, knowledge_views_by_id} = state.specialised_objects;
      const all_wcomponent_ids_in_knowledge_views = new Set();
      Object.values(knowledge_views_by_id).forEach((kv) => {
        Object.entries(kv.wc_id_map).filter(([id, entry]) => !entry.blocked && !entry.passthrough).forEach(([id, entry]) => all_wcomponent_ids_in_knowledge_views.add(id));
      });
      const orphaned_wcomponents2 = Object.values(wcomponents_by_id).filter((wc) => !wc.deleted_at && !all_wcomponent_ids_in_knowledge_views.has(wc.id));
      const sorted_orphaned_wcomponents = sort_list(orphaned_wcomponents2, (wc) => (wc.modified_at || wc.created_at).getTime(), SortDirection.descending);
      set_orphaned_wcomponents(sorted_orphaned_wcomponents);
    };
  }, []);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h3", null, "List Orphaned Components"), /* @__PURE__ */ h("span", {
    className: "description_label"
  }, "Show all components in this base which are not part of a knowledge view in this base."), /* @__PURE__ */ h(ButtonGroup, {
    fullWidth: true,
    color: "primary",
    variant: "contained",
    orientation: "vertical"
  }, /* @__PURE__ */ h(Button, {
    onClick: () => find_components()
  }, "Find components")), /* @__PURE__ */ h("table", null, /* @__PURE__ */ h("tbody", {
    style: {cursor: "pointer"}
  }, orphaned_wcomponents.map((wc) => /* @__PURE__ */ h("tr", {
    onClick: () => props.change_route({item_id: wc.id})
  }, /* @__PURE__ */ h("td", null, wc.type), /* @__PURE__ */ h("td", null, /* @__PURE__ */ h(RichMarkDown, {
    text: wc.title
  })))))));
}
export const ListOrphanedWComponents = connector(_ListOrphanedWComponents);
