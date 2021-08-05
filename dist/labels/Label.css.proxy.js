// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.label\n{\n    border-radius: 3px;\n    border: thin solid #777;\n    padding: 0px 5px 2px 5px;\n    margin: 0 2px;\n    display: inline-block;\n}\n\n.label.small\n{\n    font-size: 10px;\n}\n\n.label.pattern\n{\n    background-color: #DDF;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}