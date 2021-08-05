// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.delete_button .large\n{\n    background-color: pink;\n    border-radius: 3px;\n    border: thin solid darkred;\n    color: darkred;\n    cursor: pointer;\n    padding: 2px 7px;\n}\n\n.delete_button .disabled\n{\n    cursor: initial;\n    background-color: #ececec;\n    border-color: #cdcdcd;\n    color: #adadad;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}