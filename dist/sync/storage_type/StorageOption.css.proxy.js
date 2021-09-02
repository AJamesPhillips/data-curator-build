// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".storage_option {\n  cursor: pointer;\n}\n\n.storage_option.selected {\n  border: thin solid #290;\n  background-color: #efd;\n}\n\n.storage_option:hover {\n  border: thin solid #2f0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}