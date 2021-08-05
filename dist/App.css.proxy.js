// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".app {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n}\n.app > * {\n  flex-grow: 0;\n  flex-shrink: 0;\n  flex-basis: auto;\n}\n.app main {\n  flex-grow: 1;\n  flex-shrink: 1;\n  overflow: auto;\n  display: flex;\n  flex-direction: row;\n}\n.app main > * {\n  flex-grow: 0;\n  flex-shrink: 0;\n  flex-basis: auto;\n  overflow: auto;\n}\n.app main > *#app_content {\n  flex-basis: 70%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n}\n.app main > *#side_panel {\n  flex-grow: 1;\n  flex-shrink: 1;\n  border-left: 1px rgba(0, 0, 0, 0.23) solid;\n}\n\n.description_label {\n  font-size: 11px;\n  color: grey;\n}\n\n/* Styles markdown quotes */\nblockquote p {\n  border-left: thin solid #aaa;\n  padding-left: 4px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}