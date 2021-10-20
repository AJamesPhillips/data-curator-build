// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.wcomponent_from_to\n{\n    display: inline-flex;\n}\n\n.wcomponent_from_to input\n{\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}