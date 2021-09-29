// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.summary_container\n{\n    flex-direction: column;\n    width: 100%;\n}\n\n.summary_row\n{\n    display: inline-flex;\n    flex-direction: row;\n}\n\n.summary_row > div {\n    /* flex: 2; */\n    margin: 3px;\n}\n\n.summary_container .datetimes {\n    flex: 3;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}