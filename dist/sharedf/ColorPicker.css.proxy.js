// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n.color_picker .color_swatch\n{\n    width: 20px;\n    height: 20px;\n    display: inline-block;\n    border: thin solid #777;\n    margin: 0 10px -5px 0;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}