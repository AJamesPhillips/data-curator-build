export const format_wcomponent_id_error = (root_url, id, error) => `✗${format_wcomponent_link(root_url, id, id)} (${error})`;
export const format_wcomponent_url = (root_url, id, knowledge_view_id = "") => `${root_url}#wcomponents/${id}` + (knowledge_view_id ? `&subview_id=${knowledge_view_id}` : "");
export const format_wcomponent_link = (root_url, id, content = "□", knowledge_view_id = "") => `[${content}](${format_wcomponent_url(root_url, id, knowledge_view_id)})`;
