// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".base_option {\n  cursor: pointer;\n}\n.base_option:hover .edit_title {\n  opacity: 0.1;\n}\n.base_option td {\n  min-width: 100px;\n  text-align: center;\n}\n.base_option td.narrow {\n  min-width: 30px;\n}\n.base_option td.edit_title {\n  transition: opacity 0.25s ease-in-out;\n  opacity: 0;\n  margin-left: 3px;\n  float: right;\n}\n.base_option td.edit_title:hover {\n  opacity: 1;\n}\n\n.base_option.selected {\n  border: thin solid #290;\n  background-color: #efd;\n}\n\n.base_option:hover {\n  border: thin solid #2f0;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}