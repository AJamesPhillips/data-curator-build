// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.statement_probability_change\n{\n    padding: 10px;\n    display: inline-flex;\n    flex-direction: row;\n}\n\n.statement_probability_change > div\n{\n    flex: 1 1 auto;\n    padding: 5px;\n    border: thin solid #aaa;\n    width: 120px;\n}\n\n.statement_probability_change .perception, .statement_probability_change .explanation\n{\n    width: 300px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}