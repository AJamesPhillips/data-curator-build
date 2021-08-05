// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.statement_with_probability\n{\n    border: thin solid #bbb;\n    border-radius: 3px;\n    padding: 2px 4px;\n    display: inline-flex;\n}\n\n.statement_with_probability .statement\n{\n    margin: 5px;\n    padding: 5px;\n    max-width: 300px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}