// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".action_list_view_content {\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  overflow-y: scroll;\n  /* margin-bottom: 100px; -- does not work as it overlaps the content */\n}\n\n.action_list_view_content .icebox, .action_list_view_content .todo, .action_list_view_content .in_progress, .action_list_view_content .done_or_rejected {\n  flex: 1;\n  padding: 20px;\n}\n.action_list_view_content .icebox, .action_list_view_content .todo, .action_list_view_content .in_progress {\n  border-right: thin solid #aaa;\n}\n\n.prioritisations_header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}