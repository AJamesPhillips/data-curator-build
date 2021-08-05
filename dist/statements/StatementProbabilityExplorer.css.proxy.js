// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.statement_probability_explorer\n{\n    text-align: center;\n}\n\n.statement_probability_explorer .statement\n{\n    font-size: 20px;\n    padding: 20px;\n    margin: 20px;\n    border: thin solid #aaa;\n    display: inline-block;\n    width: 720px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}