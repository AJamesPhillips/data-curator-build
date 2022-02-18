// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".description_label {\n  font-size: 11px;\n  color: grey;\n}\n\n/* Styles markdown quotes */\nblockquote p {\n  border-left: thin solid #aaa;\n  padding-left: 4px;\n}\n\n.app_header {\n  margin-right: 0px;\n  width: 100%;\n  max-width: 100%;\n  min-width: 0px;\n  position: fixed;\n}\n\n@media screen and (max-width: 600px) {\n  .app_header {\n    max-height: 70px;\n    overflow-y: auto;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}