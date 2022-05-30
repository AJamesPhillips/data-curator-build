import {h} from "../../snowpack/pkg/preact.js";
import {KnowledgeViewList} from "./KnowledgeViewList.js";
import {useMemo} from "../../snowpack/pkg/preact/hooks.js";
export function KnowledgeViewListsSet(props) {
  const {priority, normal, hidden, archived, errored} = useMemo(() => {
    const priority2 = [];
    const normal2 = [];
    const hidden2 = [];
    const archived2 = [];
    const errored2 = [];
    props.knowledge_views.forEach((kv) => {
      const entry = props.nested_knowledge_view_ids.map[kv.id];
      if (entry?.sort_type === "errored")
        errored2.push(kv);
      else if (kv.sort_type === "hidden")
        hidden2.push(kv);
      else if (kv.sort_type === "archived")
        archived2.push(kv);
      else if (kv.sort_type === "priority")
        priority2.push(kv);
      else
        normal2.push(kv);
    });
    return {priority: priority2, normal: normal2, hidden: hidden2, archived: archived2, errored: errored2};
  }, [props.knowledge_views]);
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(KnowledgeViewList, {
    ...props,
    knowledge_views: priority,
    sort_type: "priority"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(KnowledgeViewList, {
    ...props,
    knowledge_views: normal,
    sort_type: "normal"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(KnowledgeViewList, {
    ...props,
    knowledge_views: hidden,
    sort_type: "hidden"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(KnowledgeViewList, {
    ...props,
    knowledge_views: archived,
    sort_type: "archived"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(KnowledgeViewList, {
    ...props,
    knowledge_views: errored,
    sort_type: "errored"
  }));
}
