// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".description_label {\n  font-size: 11px;\n  color: grey;\n}\n\n/* Styles markdown quotes */\nblockquote p {\n  border-left: thin solid #aaa;\n  padding-left: 4px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}