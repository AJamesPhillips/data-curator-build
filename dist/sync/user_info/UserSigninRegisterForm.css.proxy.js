// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".error_form_input_empty {\n  font-size: 11px;\n  color: #ac0000;\n  transition: font-size 0.1s linear;\n}\n\n.error_form_input_empty.inactive {\n  font-size: 0px;\n  user-select: none;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}