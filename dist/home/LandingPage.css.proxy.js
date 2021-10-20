// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "@keyframes bounce_pointer {\n  0% {\n    margin-right: 2em;\n  }\n  50% {\n    margin-right: 0;\n  }\n  100% {\n    margin-right: 2em;\n  }\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}