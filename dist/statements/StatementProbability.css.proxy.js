// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.statement_probability\n{\n    display: inline-flex;\n    flex-direction: column;\n}\n\n.statement_probability > div\n{\n    border: thin solid black;\n}\n.statement_probability > div > div > div\n{\n    margin: 5px;\n    padding: 5px;\n}\n\n.statement_probability .top_row\n{\n    display: flex;\n    flex-direction: row;\n}\n\n.statement_probability .bottom_row\n{\n    /* text-align: center; */\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}