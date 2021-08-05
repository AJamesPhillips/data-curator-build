// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.display_options_side_panel .section\n{\n    padding: 5px;\n    background-color: white;\n    border-radius: 3px;\n    border: thin solid #aaa;\n}\n\n.display_options_side_panel .description\n{\n    margin-top: 5px;\n    color: grey;\n    font-size: 14px;\n}\n\n.display_options_side_panel .description i\n{\n    /* white-space: nowrap; */\n    font-weight: 900;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}