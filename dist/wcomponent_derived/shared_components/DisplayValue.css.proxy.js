// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.value\n{\n    border: thin solid rgba(0, 0, 0, 0);\n    border-radius: 2px;\n    padding: 0 3px;\n}\n\n\n.value.assumption\n{\n    border: thin solid rgb(238, 152, 81);\n    background-color: rgba(238, 152, 81, 0.2);\n}\n\n.value.multiple, .value.uncertain\n{\n    /* text-shadow:\n     3px 2px 3px rgba(81, 203, 238, 0.7),\n    -3px -2px 3px rgba(81, 203, 238, 0.7),\n     6px -3px 6px rgba(81, 203, 238, 0.7),\n    -6px 3px 6px rgba(81, 203, 238, 0.7); */\n    border: thin solid rgb(81, 203, 238);\n    background-color: rgba(81, 203, 238, 0.2);\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}