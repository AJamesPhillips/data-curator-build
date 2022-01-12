// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".priorities_list_view_content {\n  padding: 20px;\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  overflow-y: scroll;\n  /* margin-bottom: 100px; -- does not work as it overlaps the content */\n}\n.priorities_list_view_content .priorities_list {\n  width: 500px;\n}\n.priorities_list_view_content h1 {\n  padding: 10px;\n}\n.priorities_list_view_content .goals, .priorities_list_view_content .prioritisations {\n  flex: 1;\n  padding: 40px;\n}\n.priorities_list_view_content .goals {\n  border-right: thin solid #aaa;\n}\n\n.priorities_list_view_content .goals > div, .prioritisations_list > div {\n  margin-bottom: 20px;\n}\n\n.priorities_list_view_content .side_panel_padding {\n  transition: min-width 0.25s linear;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}