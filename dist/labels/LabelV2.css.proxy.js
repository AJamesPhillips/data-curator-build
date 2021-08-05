// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n\n.label_v2\n{\n    border: thin solid #aaa;\n    border-radius: 3px;\n    padding: 3px 2px;\n    margin: 2px;\n    font-size: 9px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    /* But is not respected */\n    max-width: 100px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}