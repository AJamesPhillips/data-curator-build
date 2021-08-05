// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.datetimes\n{\n    display: flex;\n    /* width: 70%; */\n    flex-direction: column;\n}\n.datetimes .datetime_section\n{\n    display: flex;\n    padding: 2px 0;\n}\n.datetimes .datetime_section .datetime_title\n{\n    width: 55px;\n}\n.datetimes .datetime_section .datetime_value\n{\n    width: 200px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}