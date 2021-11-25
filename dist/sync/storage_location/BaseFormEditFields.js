import {h} from "../../../snowpack/pkg/preact.js";
import {useEffect, useState} from "../../../snowpack/pkg/preact/hooks.js";
import "../common.css.proxy.js";
import {modify_base} from "../../supabase/bases.js";
import {pub_sub} from "../../state/pub_sub/pub_sub.js";
import {DisplaySupabasePostgrestError} from "../user_info/DisplaySupabaseErrors.js";
import {SelectKnowledgeView} from "../../knowledge_view/SelectKnowledgeView.js";
export function BaseFormEditFields(props) {
  const {base, on_save_or_exit, user} = props;
  const [modified_base, set_modified_base] = useState(base);
  useEffect(() => set_modified_base(base), [base]);
  const [error_modifying_base, set_error_modifying_base] = useState(void 0);
  const is_owner = base.owner_user_id === user.id;
  const have_pending_edits = JSON.stringify(base) !== JSON.stringify(modified_base);
  const valid_edits = !!modified_base.title;
  function update_title(e, trim_title) {
    let title = e.currentTarget.value;
    if (trim_title)
      title = title.trim();
    set_modified_base({...modified_base, title});
  }
  if (!is_owner)
    return null;
  return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h4", null, "Edit base"), "Title   ", /* @__PURE__ */ h("input", {
    type: "text",
    placeholder: "title",
    value: modified_base.title,
    onChange: (e) => update_title(e, false),
    onBlur: (e) => update_title(e, true)
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Visibility   ", /* @__PURE__ */ h("input", {
    type: "button",
    onClick: () => {
      set_modified_base({...modified_base, public_read: !modified_base.public_read});
    },
    value: modified_base.public_read ? "Make private" : "Publish (make public)"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), "Default view   ", /* @__PURE__ */ h(SelectKnowledgeView, {
    selected_option_id: modified_base.default_knowledge_view_id,
    on_change: (default_knowledge_view_id) => {
      set_modified_base({...modified_base, default_knowledge_view_id});
    },
    force_editable: true
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("div", null, have_pending_edits && valid_edits && /* @__PURE__ */ h("input", {
    type: "button",
    disabled: !have_pending_edits || !valid_edits,
    onClick: async () => {
      const res = await modify_base(modified_base);
      if (res.error)
        return set_error_modifying_base(res.error);
      set_error_modifying_base(void 0);
      pub_sub.user.pub("stale_bases", true);
    },
    value: "Save changes"
  }), "  ", /* @__PURE__ */ h("input", {
    type: "button",
    onClick: on_save_or_exit,
    value: have_pending_edits ? "Cancel" : "Back"
  }), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h(DisplaySupabasePostgrestError, {
    error: error_modifying_base
  })), /* @__PURE__ */ h("br", null), /* @__PURE__ */ h("hr", null));
}
