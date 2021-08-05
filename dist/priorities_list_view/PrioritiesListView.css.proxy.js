// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.priorities_list_view_content\n{\n    padding: 20px;\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n}\n\n.priorities_list_view_content .goals\n{\n    flex: 1;\n    margin: 20px;\n    border-right: thin solid #aaa;\n}\n\n.priorities_list_view_content .prioritisations\n{\n    flex: 1;\n    padding: 20px;\n}\n\n.prioritisations_header\n{\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}