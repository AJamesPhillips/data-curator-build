// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".datetimes {\n  display: flex;\n  /* width: 70%; */\n  flex-direction: column;\n  white-space: nowrap;\n}\n\n.datetimes .datetime_section {\n  display: flex;\n  padding: 2px 0;\n}\n\n.datetimes .datetime_section .datetime_title {\n  width: 55px;\n}\n\n.datetimes .datetime_section .datetime_value {\n  width: 200px;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}