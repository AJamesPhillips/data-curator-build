// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".advanced_options_title {\n  transition: background-color 200ms linear;\n  cursor: pointer;\n  background-color: white;\n  border: none;\n}\n\n.advanced_options_title:hover {\n  background-color: #fafafa;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}