// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".priorities_list_view_content {\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  overflow-y: scroll;\n  /* margin-bottom: 100px; -- does not work as it overlaps the content */\n}\n\n.priorities_list_view_content .goals {\n  flex: 1;\n  padding: 40px;\n  border-right: thin solid #aaa;\n}\n\n.priorities_list_view_content .prioritisations {\n  flex: 1;\n  padding: 20px;\n}\n\n.prioritisations_header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.priorities_list_view_content .goals > div, .prioritisations_list > div {\n  margin-bottom: 20px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}