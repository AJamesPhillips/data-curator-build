// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".prioritisable_action {\n  display: flex;\n  margin: 10px;\n}\n.prioritisable_action .controls {\n  overflow: hidden;\n  opacity: 0.1;\n  transition: opacity 0.25s linear;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.prioritisable_action:hover .controls {\n  opacity: initial;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}