// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".add_new_action_button button {\n  min-width: 0px;\n  width: 35px;\n  background-color: #eee;\n  float: right;\n}\n.add_new_action_button button:hover {\n  background-color: #aaa;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}