// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".datetime_lines_container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  pointer-events: none;\n}\n\n.datetime_container {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  pointer-events: none;\n  user-select: none;\n}\n.datetime_container .datetime_line {\n  height: 100%;\n  border-left: 1px rgba(100, 100, 100, 0.5) dashed;\n}\n.datetime_container .rotater {\n  white-space: nowrap;\n  transform: translate(0%, 700%) rotate(-90deg);\n  transform-origin: left top;\n  display: inline-block;\n}\n.datetime_container .rotater .date_label {\n  display: inline-block;\n  vertical-align: top;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}